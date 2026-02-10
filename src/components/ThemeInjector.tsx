import React, { useEffect } from 'react';
import { useSiteContent } from '../content/SiteContentContext';

const ThemeInjector: React.FC = () => {
    const { content } = useSiteContent();
    const appearance = content.appearance;

    useEffect(() => {
        if (!appearance) return;

        const root = document.documentElement;

        // Colors
        if (appearance.primaryColor) {
            root.style.setProperty('--color-primary', appearance.primaryColor);
        }
        if (appearance.accentColor) {
            root.style.setProperty('--color-accent', appearance.accentColor);
        }

        // Fonts
        if (appearance.fontHeading) {
            root.style.setProperty('--font-heading', appearance.fontHeading);
        }
        if (appearance.fontBody) {
            root.style.setProperty('--font-body', appearance.fontBody);
        }

    }, [appearance]);

    // We can also inject font imports here if needed, but for now assuming Google Fonts are loaded in index.html
    return null;
};

export default ThemeInjector;
