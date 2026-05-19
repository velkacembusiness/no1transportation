import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import RichTextEditor from '@/Components/RichTextEditor';

const tabs = [
    { key: 'info', label: 'Basic Info', icon: 'fa-building' },
    { key: 'social', label: 'Social Media', icon: 'fa-share-nodes' },
    { key: 'content', label: 'Content', icon: 'fa-pen-to-square' },
];

export default function AboutEdit({ about }) {
    const [activeTab, setActiveTab] = useState('info');

    const { data, setData, put, processing, errors } = useForm({
        company:    about?.company    || '',
        email:      about?.email      || '',
        phone:      about?.phone      || '',
        fax:        about?.fax        || '',
        cell:       about?.cell       || '',
        address:    about?.address    || '',
        maps:       about?.maps       || '',
        linkedin:   about?.linkedin   || '',
        instagram:  about?.instagram  || '',
        twitter:    about?.twitter    || '',
        facebook:   about?.facebook   || '',
        link_video: about?.link_video || '',
        content:    about?.content    || '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(route('admin.about.update'));
    }

    return (
        <AdminLayout title="Company Information">
            <Head title="About | Admin" />

            <div className="max-w-7xl">
                <h2 className="text-xl font-semibold mb-6">Company Information</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Tab buttons */}
                    <div className="flex border-b border-gray-200">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() => setActiveTab(tab.key)}
                                className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                                    activeTab === tab.key
                                        ? 'border-brand-dark text-brand-dark'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                <i className={`fas ${tab.icon} text-xs`} />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab: Basic Info */}
                    {activeTab === 'info' && (
                        <Card>
                            <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label>Company Name *</Label>
                                        <Input value={data.company} onChange={e => setData('company', e.target.value)} />
                                        {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
                                    </div>
                                    <div>
                                        <Label>Email *</Label>
                                        <Input type="email" value={data.email} onChange={e => setData('email', e.target.value)} />
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                    </div>
                                    <div>
                                        <Label>Phone *</Label>
                                        <Input value={data.phone} onChange={e => setData('phone', e.target.value)} />
                                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                    </div>
                                    <div>
                                        <Label>Fax</Label>
                                        <Input value={data.fax} onChange={e => setData('fax', e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Cell</Label>
                                        <Input value={data.cell} onChange={e => setData('cell', e.target.value)} />
                                    </div>
                                </div>
                                <div>
                                    <Label>Address *</Label>
                                    <Input value={data.address} onChange={e => setData('address', e.target.value)} />
                                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                                </div>
                                <div>
                                    <Label>Google Maps URL</Label>
                                    <Input value={data.maps} onChange={e => setData('maps', e.target.value)} placeholder="https://maps.google.com/..." />
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Tab: Social Media */}
                    {activeTab === 'social' && (
                        <Card>
                            <CardHeader><CardTitle>Social Media Links</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                {[
                                    { key: 'facebook',   label: 'Facebook',  icon: 'fa-facebook',  prefix: 'fab' },
                                    { key: 'instagram',  label: 'Instagram', icon: 'fa-instagram', prefix: 'fab' },
                                    { key: 'twitter',    label: 'Twitter / X', icon: 'fa-twitter', prefix: 'fab' },
                                    { key: 'linkedin',   label: 'LinkedIn',  icon: 'fa-linkedin',  prefix: 'fab' },
                                    { key: 'link_video', label: 'Vidéo (YouTube…)', icon: 'fa-video', prefix: 'fas' },
                                ].map(({ key, label, icon, prefix }) => (
                                    <div key={key}>
                                        <Label>
                                            <i className={`${prefix} ${icon} mr-2 text-gray-400`} />
                                            {label}
                                        </Label>
                                        <Input value={data[key]} onChange={e => setData(key, e.target.value)} placeholder="https://..." />
                                        {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    )}

                    {/* Tab: Content — editor + live preview */}
                    {activeTab === 'content' && (
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
                            {/* Editor */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <i className="fas fa-pen-to-square text-brand-green" />
                                        Éditeur
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <RichTextEditor
                                        value={data.content}
                                        onChange={(val) => setData('content', val)}
                                    />
                                    {errors.content && <p className="text-red-500 text-xs mt-2">{errors.content}</p>}
                                </CardContent>
                            </Card>

                            {/* Live preview */}
                            <Card className="sticky top-24">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <i className="fas fa-eye text-brand-green" />
                                        Aperçu (rendu Frontend)
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                                        {/* Simulated page header */}
                                        <div className="bg-brand-dark px-6 py-4 flex items-center gap-3">
                                            <div className="w-8 h-0.5 bg-brand-green" />
                                            <span className="text-white font-bold text-sm">About Us</span>
                                        </div>
                                        {/* Content rendered with site styles */}
                                        <div className="bg-white px-6 py-6 min-h-[240px]">
                                            {data.content ? (
                                                <div
                                                    className="prose prose-gray max-w-none text-gray-600 leading-relaxed"
                                                    dangerouslySetInnerHTML={{ __html: data.content }}
                                                />
                                            ) : (
                                                <p className="text-gray-300 italic text-sm">Commencez à écrire pour voir l'aperçu…</p>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    <div>
                        <Button type="submit" disabled={processing} className="bg-brand-dark text-brand-green hover:bg-brand-gray">
                            {processing ? 'Enregistrement…' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}