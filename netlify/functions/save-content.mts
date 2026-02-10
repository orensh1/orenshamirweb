
import { Context } from "@netlify/functions";
import { Octokit } from "octokit";

export default async (req: Request, context: Context) => {
    if (req.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405 });
    }

    // 1. Verify Authentication (Netlify Identity)
    // Netlify automatically verifies the Bearer token and populates context.clientContext.user
    const user = context.clientContext?.user;

    if (!user) {
        console.error("Unauthorized access attempt: No valid user context");
        return new Response(JSON.stringify({ message: "Unauthorized. Please login." }), {
            status: 401,
            headers: { "Content-Type": "application/json" }
        });
    }

    console.log(`Content update request from user: ${user.email} (${user.sub})`);

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    // Hardcoded repo details for now, or could use env vars
    const REPO_OWNER = process.env.REPO_OWNER || "orensh1";
    const REPO_NAME = process.env.REPO_NAME || "orenshamirweb";
    const FILE_PATH = "public/content/site-data.json";

    if (!GITHUB_TOKEN) {
        return new Response(JSON.stringify({ message: "Server Error: GITHUB_TOKEN missing" }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }

    try {
        const octokit = new Octokit({
            auth: GITHUB_TOKEN,
        });

        // 2. Get current file SHA (to allow update)
        const { data: currentFile } = await octokit.rest.repos.getContent({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            path: FILE_PATH,
        });

        if (Array.isArray(currentFile) || !currentFile.sha) {
            throw new Error("Invalid file format in repo");
        }

        // 3. Prepare new content
        const newContent = await req.json();
        const contentString = JSON.stringify(newContent, null, 2);
        const contentEncoded = Buffer.from(contentString).toString('base64');

        // 4. Commit to GitHub
        await octokit.rest.repos.createOrUpdateFileContents({
            owner: REPO_OWNER,
            repo: REPO_NAME,
            path: FILE_PATH,
            message: `Content update via Admin Dashboard by ${user.email}`,
            content: contentEncoded,
            sha: currentFile.sha,
            branch: 'main',
            committer: {
                name: "Netlify Admin",
                email: "admin@netlify.app"
            }
        });

        return new Response(JSON.stringify({ message: "Content saved successfully" }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });

    } catch (error: any) {
        console.error("GitHub Error:", error);
        return new Response(JSON.stringify({ message: "Failed to save to GitHub: " + error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
};
