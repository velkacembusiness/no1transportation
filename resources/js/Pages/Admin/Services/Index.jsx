import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function ServicesIndex({ services }) {
    const { data, links } = services;

    function handleDelete(id) {
        if (confirm('Delete this service?')) {
            router.delete(route('admin.services.destroy', id));
        }
    }

    return (
        <AdminLayout title="Services">
            <Head title="Services | Admin" />

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Services</CardTitle>
                        <Link href={route('admin.services.create')}>
                            <Button size="sm" className="bg-brand-dark text-brand-green hover:bg-brand-gray">
                                <i className="fas fa-plus mr-2" /> Add Service
                            </Button>
                        </Link>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-gray-50">
                                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Name</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Slug</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.map((service) => (
                                    <tr key={service.id} className="border-b hover:bg-gray-50">
                                        <td className="py-3 px-4 font-medium">{service.name}</td>
                                        <td className="py-3 px-4 text-gray-500 font-mono text-xs">{service.slug}</td>
                                        <td className="py-3 px-4">
                                            <Badge variant={service.is_active ? 'default' : 'secondary'}>
                                                {service.is_active ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex gap-2">
                                                <Link href={route('admin.services.edit', service.id)}>
                                                    <Button variant="outline" size="sm">Edit</Button>
                                                </Link>
                                                <Button variant="destructive" size="sm" onClick={() => handleDelete(service.id)}>
                                                    Delete
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {(!data || data.length === 0) && (
                                    <tr><td colSpan={4} className="py-8 text-center text-gray-500">No services yet.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {links && links.length > 3 && (
                        <div className="flex justify-center gap-2 mt-6">
                            {links.map((link, i) => (
                                <Link key={i} href={link.url || '#'}
                                    className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${link.active ? 'bg-brand-dark text-brand-green' : link.url ? 'border hover:bg-gray-50' : 'border text-gray-300 cursor-not-allowed'}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </AdminLayout>
    );
}