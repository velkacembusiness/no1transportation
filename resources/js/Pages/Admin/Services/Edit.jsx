import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import RichTextEditor from '@/Components/RichTextEditor';

export default function ServiceEdit({ service }) {
    const { data, setData, post, processing, errors } = useForm({
        _method:     'PUT',
        name:        service.name        || '',
        description: service.description || '',
        is_active:   service.is_active   ?? true,
        image:       null,
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('admin.services.update', service.slug), { forceFormData: true });
    }

    return (
        <AdminLayout title="Edit Service">
            <Head title="Edit Service | Admin" />

            <div className="max-w-7xl">
                <div className="flex items-center gap-4 mb-6">
                    <Link href={route('admin.services.index')}>
                        <Button variant="outline" size="sm"><i className="fas fa-arrow-left mr-2" />Back</Button>
                    </Link>
                    <h2 className="text-xl font-semibold">Edit: {service.name}</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">

                    {/* Basic fields */}
                    <Card>
                        <CardHeader><CardTitle>Service Information</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label>Service Name *</Label>
                                    <Input value={data.name} onChange={e => setData('name', e.target.value)} />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>
                                <div className="flex items-center gap-3 pt-6">
                                    <input
                                        type="checkbox"
                                        id="is_active"
                                        checked={data.is_active}
                                        onChange={e => setData('is_active', e.target.checked)}
                                        className="w-4 h-4 rounded accent-brand-dark"
                                    />
                                    <Label htmlFor="is_active">Active</Label>
                                </div>
                            </div>

                            <div>
                                <Label>Image (leave empty to keep current)</Label>
                                {service.image && (
                                    <div className="mb-2 flex items-center gap-3">
                                        <img src={`/storage/${service.image}`} alt="Current" className="h-20 w-20 object-cover rounded-lg border" />
                                        <p className="text-xs text-gray-400">Current image</p>
                                    </div>
                                )}
                                <Input type="file" accept="image/*" onChange={e => setData('image', e.target.files[0])} />
                                {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Description — Editor + Live Preview */}
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
                                    value={data.description}
                                    onChange={val => setData('description', val)}
                                />
                                {errors.description && <p className="text-red-500 text-xs mt-2">{errors.description}</p>}
                            </CardContent>
                        </Card>

                        {/* Live Preview */}
                        <Card className="sticky top-24">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <i className="fas fa-eye text-brand-green" />
                                    Aperçu (rendu Frontend)
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                                    <div className="bg-brand-dark px-6 py-4 flex items-center gap-3">
                                        <div className="w-8 h-0.5 bg-brand-green" />
                                        <span className="text-white font-bold text-sm">{data.name || 'Service'}</span>
                                    </div>
                                    <div className="bg-white px-6 py-6 min-h-[240px]">
                                        {data.description ? (
                                            <div
                                                className="prose prose-gray max-w-none text-gray-600 leading-relaxed"
                                                dangerouslySetInnerHTML={{ __html: data.description }}
                                            />
                                        ) : (
                                            <p className="text-gray-300 italic text-sm">Commencez à écrire pour voir l'aperçu…</p>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Submit */}
                    <div className="flex gap-3">
                        <Button type="submit" disabled={processing} className="bg-brand-dark text-brand-green hover:bg-brand-gray">
                            {processing ? 'Updating…' : 'Update Service'}
                        </Button>
                        <Link href={route('admin.services.index')}>
                            <Button variant="outline">Cancel</Button>
                        </Link>
                    </div>

                </form>
            </div>
        </AdminLayout>
    );
}