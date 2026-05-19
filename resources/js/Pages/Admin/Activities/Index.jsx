import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function ActivitiesIndex({ activities }) {
    const { data } = activities;

    function handleDelete(id) {
        if (confirm('Delete this activity?')) {
            router.delete(route('admin.activities.destroy', id));
        }
    }

    return (
        <AdminLayout title="Activities">
            <Head title="Activities | Admin" />
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Activities (Types of Service)</CardTitle>
                        <Link href={route('admin.activities.create')}>
                            <Button size="sm" className="bg-brand-dark text-brand-green hover:bg-brand-gray"><i className="fas fa-plus mr-2" />Add Activity</Button>
                        </Link>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-gray-50">
                                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Title</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Description</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.map((activity) => (
                                    <tr key={activity.id} className="border-b hover:bg-gray-50">
                                        <td className="py-3 px-4 font-medium">{activity.title}</td>
                                        <td className="py-3 px-4 text-gray-500 max-w-xs truncate">{activity.description || '—'}</td>
                                        <td className="py-3 px-4">
                                            <Badge variant={activity.is_active ? 'default' : 'secondary'}>{activity.is_active ? 'Active' : 'Inactive'}</Badge>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex gap-2">
                                                <Link href={route('admin.activities.edit', activity.id)}>
                                                    <Button variant="outline" size="sm">Edit</Button>
                                                </Link>
                                                <Button variant="destructive" size="sm" onClick={() => handleDelete(activity.id)}>Delete</Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {(!data || data.length === 0) && (
                                    <tr><td colSpan={4} className="py-8 text-center text-gray-500">No activities yet.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}