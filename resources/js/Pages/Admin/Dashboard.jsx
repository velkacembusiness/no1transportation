import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const statCards = [
    { key: 'appointments', label: 'Appointments', icon: 'fa-calendar-check', link: 'admin.appointments.index' },
    { key: 'services', label: 'Services', icon: 'fa-car-medical', link: 'admin.services.index' },
    { key: 'activities', label: 'Activities', icon: 'fa-list', link: 'admin.activities.index' },
    { key: 'faqs', label: 'FAQs', icon: 'fa-circle-question', link: 'admin.faqs.index' },
    { key: 'payers', label: 'Payers', icon: 'fa-wallet', link: 'admin.payers.index' },
];

export default function Dashboard({ stats = {}, recentAppointments = [] }) {
    return (
        <AdminLayout title="Dashboard">
            <Head title="Dashboard | Admin" />

            <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {statCards.map((card) => (
                        <Link key={card.key} href={route(card.link)}>
                            <Card className="hover:shadow-md transition-shadow cursor-pointer border-b-4 border-b-brand-green">
                                <CardContent className="p-5">
                                    <div className="inline-flex p-3 rounded-xl bg-brand-dark mb-3">
                                        <i className={`fas ${card.icon} text-brand-green text-xl`} />
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">{stats[card.key] ?? 0}</p>
                                    <p className="text-sm text-gray-500">{card.label}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* Recent Appointments */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Recent Appointments</CardTitle>
                            <Link href={route('admin.appointments.index')} className="text-sm text-brand-gray font-medium hover:text-brand-dark transition-colors">View all →</Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {recentAppointments.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b bg-gray-50">
                                            <th className="text-left py-2 px-3 font-semibold text-gray-600">Patient</th>
                                            <th className="text-left py-2 px-3 font-semibold text-gray-600">Date</th>
                                            <th className="text-left py-2 px-3 font-semibold text-gray-600">Service</th>
                                            <th className="text-left py-2 px-3 font-semibold text-gray-600">Phone</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentAppointments.map((apt) => (
                                            <tr key={apt.id} className="border-b hover:bg-gray-50">
                                                <td className="py-2 px-3">{apt.patient_name}</td>
                                                <td className="py-2 px-3">{apt.date_of_ride}</td>
                                                <td className="py-2 px-3">
                                                    <Badge variant="outline">{apt.type_of_service || '—'}</Badge>
                                                </td>
                                                <td className="py-2 px-3">{apt.phone_number}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-8">No appointments yet.</p>
                        )}
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { href: 'admin.services.create', label: 'Add Service', icon: 'fa-plus' },
                        { href: 'admin.activities.create', label: 'Add Activity', icon: 'fa-plus' },
                        { href: 'admin.faqs.create', label: 'Add FAQ', icon: 'fa-plus' },
                    ].map((action) => (
                        <Link key={action.href} href={route(action.href)}>
                            <Card className="bg-brand-dark text-brand-green hover:opacity-90 transition-opacity cursor-pointer">
                                <CardContent className="p-5 flex items-center gap-3">
                                    <i className={`fas ${action.icon}`} />
                                    <span className="font-medium">{action.label}</span>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}