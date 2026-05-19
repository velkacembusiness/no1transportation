import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function ActivityEdit({ activity }) {
    const { data, setData, put, processing, errors } = useForm({
        title: activity.title || '',
        description: activity.description || '',
        is_active: activity.is_active ?? true,
    });

    function handleSubmit(e) {
        e.preventDefault();
        put(route('admin.activities.update', activity.id));
    }

    return (
        <AdminLayout title="Edit Activity">
            <Head title="Edit Activity | Admin" />
            <div className="max-w-2xl">
                <div className="flex items-center gap-4 mb-6">
                    <Link href={route('admin.activities.index')}><Button variant="outline" size="sm"><i className="fas fa-arrow-left mr-2" />Back</Button></Link>
                    <h2 className="text-xl font-semibold">Edit: {activity.title}</h2>
                </div>
                <Card><CardContent className="pt-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label>Title *</Label>
                            <Input value={data.title} onChange={e => setData('title', e.target.value)} />
                            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Textarea value={data.description} onChange={e => setData('description', e.target.value)} rows={3} />
                            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                        </div>
                        <div className="flex items-center gap-3">
                            <input type="checkbox" id="is_active" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)} className="w-4 h-4 rounded" />
                            <Label htmlFor="is_active">Active</Label>
                        </div>
                        <div className="flex gap-3 pt-2">
                            <Button type="submit" disabled={processing} className="bg-brand-dark text-brand-green hover:bg-brand-gray">{processing ? 'Updating...' : 'Update Activity'}</Button>
                            <Link href={route('admin.activities.index')}><Button variant="outline">Cancel</Button></Link>
                        </div>
                    </form>
                </CardContent></Card>
            </div>
        </AdminLayout>
    );
}