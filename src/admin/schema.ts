
export interface FieldDef {
    key: string;
    label: string;
    type: 'text' | 'textarea' | 'image' | 'list';
    subFields?: FieldDef[]; // For lists
}

export interface SectionDef {
    id: string;
    label: string;
    icon: string;
    fields: FieldDef[];
}

export const ADMIN_SCHEMA: SectionDef[] = [
    {
        id: 'hero',
        label: 'Hero Section',
        icon: '🏠',
        fields: [
            { key: 'badgeText', label: 'Badge Text', type: 'text' },
            { key: 'headlineLine1', label: 'Headline Line 1', type: 'text' },
            { key: 'headlineLine2', label: 'Headline Line 2 (Gradient)', type: 'text' },
            { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
            { key: 'highlightWord', label: 'Highlight Word (Green)', type: 'text' },
            { key: 'ctaText', label: 'Button Text', type: 'text' },
        ]
    },
    {
        id: 'navbar',
        label: 'Navigation',
        icon: '📌',
        fields: [
            { key: 'logoText', label: 'Logo Text', type: 'text' },
            { key: 'ctaText', label: 'Button Text', type: 'text' },
            {
                key: 'links',
                label: 'Menu Links',
                type: 'list',
                subFields: [
                    { key: 'name', label: 'Link Name', type: 'text' },
                    { key: 'href', label: 'Section ID', type: 'text' }
                ]
            }
        ]
    },
    {
        id: 'about',
        label: 'About Me',
        icon: '👤',
        fields: [
            { key: 'headingLine1', label: 'Heading Line 1', type: 'text' },
            { key: 'headingName', label: 'Heading Name', type: 'text' },
            { key: 'paragraphs', label: 'Paragraphs', type: 'list', subFields: [{ key: 'text', label: 'Paragraph', type: 'textarea' }] }, // simplified list of strings logic needed
            { key: 'imageCaption', label: 'Image Caption', type: 'text' },
            { key: 'imageSubCaption', label: 'Image Sub-Caption', type: 'text' },
            { key: 'marqueeText', label: 'Background Marquee', type: 'text' },
            {
                key: 'features',
                label: 'Features',
                type: 'list',
                subFields: [
                    { key: 'title', label: 'Title', type: 'text' },
                    { key: 'description', label: 'Description', type: 'textarea' },
                    { key: 'iconName', label: 'Icon (Smartphone, Zap, Layout)', type: 'text' }, // Select would be better but keeping simple
                    { key: 'colorClass', label: 'Color (purple, blue, pink)', type: 'text' },
                ]
            }
        ]
    },
    {
        id: 'process',
        label: 'Process',
        icon: '⚡',
        fields: [
            { key: 'titleBase', label: 'Title Base', type: 'text' },
            { key: 'titleHighlight', label: 'Title Highlight', type: 'text' },
            {
                key: 'steps',
                label: 'Steps',
                type: 'list',
                subFields: [
                    { key: 'title', label: 'Title', type: 'text' },
                    { key: 'description', label: 'Description', type: 'textarea' },
                    { key: 'iconName', label: 'Icon (MessageCircle, Code2, Rocket)', type: 'text' },
                ]
            }
        ]
    },
    {
        id: 'faq',
        label: 'FAQ',
        icon: '❓',
        fields: [
            { key: 'titleBase', label: 'Title Base', type: 'text' },
            { key: 'titleHighlight', label: 'Title Highlight', type: 'text' },
            {
                key: 'items',
                label: 'Questions',
                type: 'list',
                subFields: [
                    { key: 'question', label: 'Question', type: 'text' },
                    { key: 'answer', label: 'Answer', type: 'textarea' }
                ]
            }
        ]
    },
    {
        id: 'contact',
        label: 'Contact',
        icon: '📞',
        fields: [
            { key: 'headingLine1', label: 'Heading Base', type: 'text' },
            { key: 'headingHighlight', label: 'Heading Highlight', type: 'text' },
            { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
            { key: 'email', label: 'Email', type: 'text' },
            { key: 'phone', label: 'Phone (Dial)', type: 'text' },
            { key: 'phoneDisplay', label: 'Phone (Display)', type: 'text' },
            { key: 'whatsappNumber', label: 'WhatsApp Number', type: 'text' },
            { key: 'whatsappButtonText', label: 'WhatsApp Button', type: 'text' },
            { key: 'instagramUrl', label: 'Instagram URL', type: 'text' },
            { key: 'copyrightText', label: 'Copyright', type: 'text' },
            { key: 'creditsText', label: 'Credits', type: 'text' },
        ]
    },
    {
        id: 'whatsapp',
        label: 'WhatsApp Float',
        icon: '💬',
        fields: [
            { key: 'phoneNumber', label: 'Phone Number', type: 'text' },
            { key: 'tooltipText', label: 'Tooltip', type: 'text' },
        ]
    }
];
