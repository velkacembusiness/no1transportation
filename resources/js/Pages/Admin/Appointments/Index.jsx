import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function AppointmentsIndex({ appointments }) {
    const { data, links } = appointments;

    function handleDelete(id) {
        if (confirm('Are you sure you want to delete this appointment?')) {
            router.delete(route('admin.appointments.destroy', id));
        }
    }

    return (
        <AdminLayout title="Appointments">
            <Head title="Appointments | Admin" />

            <Card>
                <CardHeader>
                    <CardTitle>All Appointments ({appointments.total ?? data?.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-gray-50">
                                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Patient</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Email</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Date of Ride</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Service</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Payer</th>
                                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.map((apt) => (
                                    <tr key={apt.id} className="border-b hover:bg-gray-50">
                                        <td className="py-3 px-4 font-medium">{apt.patient_name}</td>
                                        <td className="py-3 px-4 text-gray-500">{apt.email_address}</td>
                                        <td className="py-3 px-4">{apt.date_of_ride}</td>
                                        <td className="py-3 px-4">
                                            <Badge variant="outline">{apt.type_of_service || '—'}</Badge>
                                        </td>
                                        <td className="py-3 px-4 text-gray-500">{apt.rider_payer || '—'}</td>
                                        <td className="py-3 px-4">
                                            <div className="flex gap-2">
                                                <Link href={route('admin.appointments.show', apt.id)}>
                                                    <Button variant="outline" size="sm">View</Button>
                                                </Link>
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(apt.id)}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {(!data || data.length === 0) && (
                                    <tr>
                                        <td colSpan={6} className="py-8 text-center text-gray-500">No appointments yet.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {links && links.length > 3 && (
                        <div className="flex justify-center gap-2 mt-6">
                            {links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                                        link.active ? 'bg-brand-dark text-brand-green' : link.url ? 'border hover:bg-gray-50' : 'border text-gray-300 cursor-not-allowed'
                                    }`}
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