import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const tabs = [
    { key: 'info', label: 'Basic Info' },
    { key: 'social', label: 'Social Media' },
    { key: 'content', label: 'Content' },
];

export default function AboutEdit({ about }) {
    const [activeTab, setActiveTab] = useState('info');

    const { data, setData, put, processing, errors } = useForm({
        company: about?.company || '',
        email: about?.email || '',
        phone: about?.phone || '',
        fax: about?.fax || '',
        cell: about?.cell || '',
        address: about?.address || '',
        maps: about?.maps || '',
        linkedin: about?.linkedin || '',
        instagram: about?.instagram || '',
        twitter: about?.twitter || '',
        facebook: about?.facebook || '',
        link_video: about?.link_video || '',
        content: about?.content || '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(route('admin.about.update'));
    }

    return (
        <AdminLayout title="Company Information">
            <Head title="About | Admin" />

            <div className="max-w-4xl">
                <h2 className="text-xl font-semibold mb-6">Company Information</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Tab buttons */}
                    <div className="flex border-b border-gray-200">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() => setActiveTab(tab.key)}
                                className={`px-5 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                                    activeTab === tab.key
                                        ? 'border-brand-dark text-brand-dark'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
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
                                    { key: 'facebook', label: 'Facebook URL', icon: 'fa-facebook' },
                                    { key: 'instagram', label: 'Instagram URL', icon: 'fa-instagram' },
                                    { key: 'twitter', label: 'Twitter URL', icon: 'fa-twitter' },
                                    { key: 'linkedin', label: 'LinkedIn URL', icon: 'fa-linkedin' },
                                    { key: 'link_video', label: 'Video Link (YouTube etc.)', icon: 'fa-video' },
                                ].map(({ key, label, icon }) => (
                                    <div key={key}>
                                        <Label><i className={`fab ${icon} mr-2 text-gray-400`} />{label}</Label>
                                        <Input value={data[key]} onChange={e => setData(key, e.target.value)} placeholder="https://..." />
                                        {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    )}

                    {/* Tab: Content */}
                    {activeTab === 'content' && (
                        <Card>
                            <CardHeader><CardTitle>About Content</CardTitle></CardHeader>
                            <CardContent>
                                <Label>Content (HTML supported)</Label>
                                <Textarea
                                    value={data.content}
                                    onChange={e => setData('content', e.target.value)}
                                    rows={12}
                                    placeholder="Enter company description/about content..."
                                    className="font-mono text-sm mt-1"
                                />
                                {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
                            </CardContent>
                        </Card>
                    )}

                    <div className="flex gap-3">
                        <Button type="submit" disabled={processing} className="bg-brand-dark text-brand-green hover:bg-brand-gray">
                            {processing ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}