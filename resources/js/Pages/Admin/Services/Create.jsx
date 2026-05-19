import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function ServiceCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        is_active: true,
        image: null,
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('admin.services.store'), { forceFormData: true });
    }

    return (
        <AdminLayout title="Add Service">
            <Head title="Add Service | Admin" />

            <div className="max-w-2xl">
                <div className="flex items-center gap-4 mb-6">
                    <Link href={route('admin.services.index')}>
                        <Button variant="outline" size="sm"><i className="fas fa-arrow-left mr-2" />Back</Button>
                    </Link>
                    <h2 className="text-xl font-semibold">Add Service</h2>
                </div>

                <Card>
                    <CardContent className="pt-6">
                        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                            <div>
                                <Label>Service Name *</Label>
                                <Input value={data.name} onChange={e => setData('name', e.target.value)} placeholder="Service name" />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <Label>Description</Label>
                                <Textarea value={data.description} onChange={e => setData('description', e.target.value)} placeholder="Service description" rows={4} />
                                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                            </div>

                            <div>
                                <Label>Image</Label>
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
                                    {processing ? 'Creating...' : 'Create Service'}
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