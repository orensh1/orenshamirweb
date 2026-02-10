import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent, defaultContent } from './siteContent';

interface SiteContentContextType {
    content: SiteContent;
    isLoading: boolean;
}

const SiteContentContext = createContext<SiteContentContextType>({
    content: defaultContent,
    isLoading: true,
});

export const useSiteContent = () => useContext(SiteContentContext);

export const SiteContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [content, setContent] = useState<SiteContent>(defaultContent);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/content/site-data.json')
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data: Partial<SiteContent>) => {
                setContent(deepMerge(defaultContent, data));
            })
            .catch((err) => {
                console.warn('Failed to fetch site content, using defaults:', err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <SiteContentContext.Provider value={{ content, isLoading }}>
            {children}
        </SiteContentContext.Provider>
    );
};

// Deep merge utility: merges source into target, keeping target's structure
function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
    const result = { ...target };
    for (const key in source) {
        if (
            source[key] &&
            typeof source[key] === 'object' &&
            !Array.isArray(source[key]) &&
            target[key] &&
            typeof target[key] === 'object' &&
            !Array.isArray(target[key])
        ) {
            (result as any)[key] = deepMerge(target[key], source[key] as any);
        } else if (source[key] !== undefined) {
            (result as any)[key] = source[key];
        }
    }
    return result;
}

export default SiteContentContext;
