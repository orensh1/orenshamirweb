// ============================================
// SITE CONTENT CONFIGURATION
// All editable text, links, and settings
// ============================================

export interface NavLink {
    name: string;
    href: string;
}

export interface FeatureCard {
    iconName: 'Smartphone' | 'Zap' | 'Layout';
    title: string;
    description: string;
    colorClass: string;
}

export interface ProcessStep {
    iconName: 'MessageCircle' | 'Code2' | 'Rocket';
    title: string;
    description: string;
    color: string;
    bg: string;
}

export interface FAQItem {
    question: string;
    answer: string;
}

export interface SiteContent {
    hero: {
        badgeText: string;
        headlineLine1: string;
        headlineLine2: string;
        subtitle: string;
        highlightWord: string;
        ctaText: string;
        waveColors: string[];
    };
    navbar: {
        logoText: string;
        logoImage?: string; // New: Optional logo image
        links: NavLink[];
        ctaText: string;
    };
    appearance?: { // New: Global appearance settings
        primaryColor: string;
        accentColor: string;
        fontHeading: string;
        fontBody: string;
    };
    about: {
        headingLine1: string;
        headingName: string;
        paragraphs: string[];
        features: FeatureCard[];
        imageAlt: string;
        imageCaption: string;
        imageSubCaption: string;
        marqueeText: string;
    };
    process: {
        titleBase: string;
        titleHighlight: string;
        steps: ProcessStep[];
    };
    faq: {
        titleBase: string;
        titleHighlight: string;
        items: FAQItem[];
    };
    contact: {
        headingLine1: string;
        headingHighlight: string;
        subtitle: string;
        email: string;
        phone: string;
        phoneDisplay: string;
        whatsappNumber: string;
        whatsappTitle: string;
        whatsappSubtitle: string;
        whatsappButtonText: string;
        instagramUrl: string;
        copyrightText: string;
        creditsText: string;
    };
    whatsapp: {
        phoneNumber: string;
        tooltipText: string;
    };
}

import homepageData from './homepage.json';

// Type assertion to ensure homepageData matches SiteContent structure.
// We cast through unknown to be safe if the JSON structure is slightly different (e.g. missing optional fields),
// but since we just generated it, it should match.
export const defaultContent: SiteContent = homepageData as unknown as SiteContent;
