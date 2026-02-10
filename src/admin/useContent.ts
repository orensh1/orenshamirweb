
import { useState, useEffect } from 'react';
import { SiteContent, defaultContent } from '../content/siteContent';

export function useContent() {
    const [content, setContent] = useState<SiteContent>(defaultContent);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('/content/site-data.json')
            .then(res => res.json())
            .then(data => {
                setContent(prev => ({ ...prev, ...data }));
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load content", err);
                setError("Failed to load content");
                setLoading(false);
            });
    }, []);

    const updateSection = (sectionId: keyof SiteContent, data: any) => {
        setContent(prev => ({
            ...prev,
            [sectionId]: data
        }));
    };

    const saveContent = async (password: string) => {
        setSaving(true);
        setError(null);
        try {
            const res = await fetch('/.netlify/functions/save-content', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${password}`
                },
                body: JSON.stringify({
                    content,
                    message: `Update content via Admin UI (${new Date().toLocaleString()})`
                })
            });

            if (!res.ok) {
                throw new Error(await res.text());
            }

            return true;
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to save");
            return false;
        } finally {
            setSaving(false);
        }
    };

    return { content, loading, saving, error, updateSection, saveContent };
}
