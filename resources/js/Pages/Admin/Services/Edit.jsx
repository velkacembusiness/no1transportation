import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function ServiceEdit({ service }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        name: service.name || '',
        description: service.description || '',
        is_active: service.is_active ?? true,
        image: null,
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('admin.services.update', service.id), { forceFormData: true });
    }

    return (
        <AdminLayout title="Edit Service">
            <Head title="Edit Service | Admin" />

            <div className="max-w-2xl">
                <div className="flex items-center gap-4 mb-6">
                    <Link href={route('admin.services.index')}>
                        <Button variant="outline" size="sm"><i className="fas fa-arrow-left mr-2" />Back</Button>
                    </Link>
                    <h2 className="text-xl font-semibold">Edit: {service.name}</h2>
                </div>

                <Card>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                            <div>
                                <Label>Service Name *</Label>
                                <Input value={data.name} onChange={e => setData('name', e.target.value)} />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <Label>Description</Label>
                                <Textarea value={data.description} onChange={e => setData('description', e.target.value)} rows={4} />
                                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                            </div>

                            <div>
                                <Label>Image (leave empty to keep current)</Label>
                                {service.image && (
                                    <div className="mb-2">
                                        <img src={`/storage/${service.image}`} alt="Current" className="h-20 w-20 object-cover rounded-lg" />
                                        <p className="text-xs text-gray-400 mt-1">Current image</p>
                                    </div>
                                )}
                                <Input type="file" accept="image/*" onChange={e => setData('image', e.target.files[0])} />
                                {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                            </div>

                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={data.is_active}
                                    onChange={e => setData('is_active', e.target.checked)}
                                    className="w-4 h-4 rounded"
                                />
                                <Label htmlFor="is_active">Active</Label>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <Button type="submit" disabled={processing} className="bg-brand-dark text-brand-green hover:bg-brand-gray">
                                    {processing ? 'Updating...' : 'Update Service'}
                                </Button>
                                <Link href={route('admin.services.index')}>
                                    <Button variant="outline">Cancel</Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}