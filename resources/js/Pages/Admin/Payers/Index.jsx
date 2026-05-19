import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function PayersIndex({ payers }) {
    const { data } = payers;

    function handleDelete(id) {
        if (confirm('Delete this payer?')) {
            router.delete(route('admin.payers.destroy', id));
        }
    }

    return (
        <AdminLayout title="Payers">
            <Head title="Payers | Admin" />
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Payers (Ride Cost Coverage)</CardTitle>
                        <Link href={route('admin.payers.create')}>
                            <Button size="sm" className="bg-brand-dark text-brand-green hover:bg-brand-gray"><i className="fas fa-plus mr-2" />Add Payer</Button>
                        </Link>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-gray-50">
                                    <th className="text-left py-3 px-4 font-semibold text-gray-600">#</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Rider Payer</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.map((payer, i) => (
                                    <tr key={payer.id} className="border-b hover:bg-gray-50">
                                        <td className="py-3 px-4 text-gray-400">{i + 1}</td>
                                        <td className="py-3 px-4 font-medium">{payer.rider_payer}</td>
                                        <td className="py-3 px-4">
                                            <div className="flex gap-2">
                                                <Link href={route('admin.payers.edit', payer.id)}><Button variant="outline" size="sm">Edit</Button></Link>
                                                <Button variant="destructive" size="sm" onClick={() => handleDelete(payer.id)}>Delete</Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {(!data || data.length === 0) && (
                                    <tr><td colSpan={3} className="py-8 text-center text-gray-500">No payers yet.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}