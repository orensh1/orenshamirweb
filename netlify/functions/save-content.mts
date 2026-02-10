import { Context } from "@netlify/functions";
import { Octokit } from "octokit";

export default async (req: Request, context: Context) => {
    // Only allow POST
    if (req.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405 });
    }

    // Security Check (Basic Password)
    const authHeader = req.headers.get("Authorization");
    const expectedAuth = `Bearer ${process.env.ADMIN_PASSWORD || "admin123"}`; // Default for dev, set env var in prod

    // We can also rely on Netlify Identity token if passed, but for simplicity:
    if (authHeader !== expectedAuth) {
        return new Response("Unauthorized", { status: 401 });
    }

    try {
        const { content, message } = await req.json();

        if (!content) {
            return new Response("Missing content", { status: 400 });
        }

        const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
        const REPO_OWNER = process.env.REPO_OWNER || "orensh1"; // Hardcoded backup or env
        const REPO_NAME = process.env.REPO_NAME || "orenshamirweb"; // Hardcoded backup or env
        const FILE_PATH = "public/content/site-data.json";

        if (!GITHUB_TOKEN) {
            return new Response("Server Configuration Error: Missing GITHUB_TOKEN", { status: 500 });
        }

        const octokit = new Octokit({ auth: GITHUB_TOKEN });

        // 1. Get current file SHA (required for update)
        const { data: currentFile } = await octokit.rest.repos.getContent({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            path: FILE_PATH,
        });

        if (Array.isArray(currentFile)) {
            return new Response("Invalid file path (directory)", { status: 500 });
        }

        const sha = currentFile.sha;
        const contentBase64 = Buffer.from(JSON.stringify(content, null, 2)).toString("base64");

        // 2. Commit update
        await octokit.rest.repos.createOrUpdateFileContents({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            path: FILE_PATH,
            message: message || "Update site content via Admin Dashboard",
            content: contentBase64,
            sha: sha,
            branch: "main",
        });

        return new Response(JSON.stringify({ success: true }), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error("GitHub API Error:", error);
        return new Response(JSON.stringify({ error: "Failed to save content", details: error }), { status: 500 });
    }
};
