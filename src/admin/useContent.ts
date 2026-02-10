
import { useState, useEffect } from 'react';
import defaultContent from '../../public/content/site-data.json';
import { SectionDef, ADMIN_SCHEMA } from './schema';

export type SiteContent = typeof defaultContent;

export function useContent() {
    const [content, setContent] = useState<SiteContent>(defaultContent);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch initial content
        fetch('/content/site-data.json')
            .then(res => res.json())
            .then(data => {
                setContent(prev => ({ ...prev, ...data }));
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load content:", err);
                setLoading(false);
            });
    }, []);

    const updateSection = (sectionId: keyof SiteContent, data: any) => {
        setContent(prev => ({
            ...prev,
            [sectionId]: data
        }));
    };

    const saveContent = async (token: string) => {
        setSaving(true);
        setError(null);

        try {
            const response = await fetch('/.netlify/functions/save-content', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(content)
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || 'Failed to save');
            }

            setSaving(false);
            alert('Content saved successfully! Changes will be live in a few minutes.');
        } catch (err: any) {
            console.error(err);
            setError(err.message);
            setSaving(false);
        }
    };

    return {
        content,
        loading,
        saving,
        error,
        updateSection,
        saveContent
    };
}
