
import React from 'react';
import { ADMIN_SCHEMA, SectionDef } from './schema';
import { AdminSection } from './components/AdminSection';
import { AdminInput } from './components/AdminInput';
import { Plus, Trash2 } from 'lucide-react';

interface EditorProps {
    content: any;
    onUpdate: (sectionId: string, data: any) => void;
}

export function Editor({ content, onUpdate }: EditorProps) {
    const [openSection, setOpenSection] = React.useState<string | null>('hero');

    const handleFieldChange = (sectionId: string, key: string, value: any) => {
        const sectionData = { ...content[sectionId], [key]: value };
        onUpdate(sectionId, sectionData);
    };

    const handleListChange = (sectionId: string, listKey: string, index: number, fieldKey: string, value: any) => {
        const list = [...(content[sectionId][listKey] || [])];
        list[index] = { ...list[index], [fieldKey]: value };
        handleFieldChange(sectionId, listKey, list);
    };

    const addListItem = (sectionId: string, listKey: string, template: any) => {
        const list = [...(content[sectionId][listKey] || [])];
        list.push(template);
        handleFieldChange(sectionId, listKey, list);
    };

    const removeListItem = (sectionId: string, listKey: string, index: number) => {
        const list = [...(content[sectionId][listKey] || [])];
        list.splice(index, 1);
        handleFieldChange(sectionId, listKey, list);
    };

    return (
        <div className="space-y-4 pb-20">
            {ADMIN_SCHEMA.map((section) => (
                <AdminSection
                    key={section.id}
                    id={section.id}
                    title={section.label}
                    icon={section.icon}
                    isOpen={openSection === section.id}
                    onToggle={() => setOpenSection(openSection === section.id ? null : section.id)}
                >
                    {section.fields.map((field) => {
                        if (field.type === 'list') {
                            const list = content[section.id]?.[field.key] || [];
                            return (
                                <div key={field.key} className="mb-8">
                                    <label className="block text-sm font-bold uppercase text-slate-300 mb-4 border-b border-white/10 pb-2">
                                        {field.label} ({list.length})
                                    </label>

                                    <div className="space-y-4">
                                        {list.map((item: any, i: number) => (
                                            <div key={i} className="p-4 bg-black/20 rounded-lg border border-white/5 relative group">
                                                <button
                                                    onClick={() => removeListItem(section.id, field.key, i)}
                                                    className="absolute top-2 right-2 p-2 bg-red-500/10 text-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                                                >
                                                    <Trash2 size={16} />
                                                </button>

                                                <div className="grid gap-4">
                                                    {field.subFields?.map(sub => (
                                                        <AdminInput
                                                            key={sub.key}
                                                            label={sub.label}
                                                            type={sub.type as any}
                                                            value={item[sub.key] || ''}
                                                            onChange={(val) => handleListChange(section.id, field.key, i, sub.key, val)}
                                                            className="mb-0"
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => addListItem(section.id, field.key, {})}
                                        className="w-full mt-4 py-3 border-2 border-dashed border-slate-700 rounded-lg text-slate-400 font-bold hover:border-purple-500 hover:text-purple-400 hover:bg-purple-500/10 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Plus size={20} /> Add Item
                                    </button>
                                </div>
                            );
                        }

                        return (
                            <AdminInput
                                key={field.key}
                                label={field.label}
                                type={field.type as any}
                                value={content[section.id]?.[field.key] || ''}
                                onChange={(val) => handleFieldChange(section.id, field.key, val)}
                            />
                        );
                    })}
                </AdminSection>
            ))}
        </div>
    );
}
