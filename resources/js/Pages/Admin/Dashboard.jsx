import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

function StatCard({ label, value, sub, href, accent = false }) {
    const inner = (
        <div className={`rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow ${accent ? 'bg-brand-dark' : 'bg-white'} flex flex-col gap-2`}>
            <p className={`text-3xl font-extrabold ${accent ? 'text-brand-green' : 'text-gray-900'}`}>{value}</p>
            <p className={`text-sm font-semibold ${accent ? 'text-gray-300' : 'text-gray-600'}`}>{label}</p>
            {sub && <p className={`text-xs ${accent ? 'text-brand-green/70' : 'text-gray-400'}`}>{sub}</p>}
            <div className={`h-0.5 rounded-full mt-2 ${accent ? 'bg-brand-green/40' : 'bg-brand-green'}`} />
        </div>
    );
    return href ? <Link href={href}>{inner}</Link> : inner;
}

export default function Dashboard({ stats = {}, recentAppointments = [] }) {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <AdminLayout title="Dashboard">
            <Head title="Dashboard | Admin" />

            <div className="space-y-6">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-900">Dashboard</h1>
                        <p className="text-sm text-gray-400 mt-0.5">{today}</p>
                    </div>
                    <Link
                        href={route('admin.appointments.index')}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-brand-dark text-brand-green rounded-full text-sm font-semibold hover:bg-brand-gray transition-colors"
                    >
                        <i className="fas fa-calendar-check text-xs" />
                        View all appointments
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                        { label: 'Services',   key: 'services',   href: 'admin.services.index' },
                        { label: 'Activities', key: 'activities', href: 'admin.activities.index' },
                        { label: 'FAQs',       key: 'faqs',       href: 'admin.faqs.index' },
                        { label: 'Payers',     key: 'payers',     href: 'admin.payers.index' },
                    ].map(({ label, key, href }) => (
                        <StatCard key={key} label={label} value={stats[key] ?? 0} href={route(href)} />
                    ))}
                </div>

                {/* Recent Appointments */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                        <h2 className="font-bold text-gray-900 flex items-center gap-2">
                            <i className="fas fa-clock-rotate-left text-brand-green text-sm" />
                            Recent Appointments
                        </h2>
                        <Link href={route('admin.appointments.index')} className="text-xs font-semibold text-gray-400 hover:text-brand-dark transition-colors">
                            View all →
                        </Link>
                    </div>

                    {recentAppointments.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-50 text-left">
                                        <th className="py-3 px-6 font-semibold text-gray-500 text-xs uppercase tracking-wide">Patient</th>
                                        <th className="py-3 px-4 font-semibold text-gray-500 text-xs uppercase tracking-wide">Date</th>
                                        <th className="py-3 px-4 font-semibold text-gray-500 text-xs uppercase tracking-wide">Time</th>
                                        <th className="py-3 px-4 font-semibold text-gray-500 text-xs uppercase tracking-wide">Service</th>
                                        <th className="py-3 px-4 font-semibold text-gray-500 text-xs uppercase tracking-wide">Phone</th>
                                        <th className="py-3 px-4 font-semibold text-gray-500 text-xs uppercase tracking-wide"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {recentAppointments.map((apt) => (
                                        <tr key={apt.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="py-3 px-6 font-medium text-gray-900">{apt.patient_name}</td>
                                            <td className="py-3 px-4 text-gray-600">{apt.date_of_ride}</td>
                                            <td className="py-3 px-4 text-gray-600">{apt.time_of_ride}</td>
                                            <td className="py-3 px-4">
                                                {apt.type_of_service ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-green/20 text-brand-dark">
                                                        {apt.type_of_service}
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-400">—</span>
                                                )}
                                            </td>
                                            <td className="py-3 px-4 text-gray-600">{apt.phone_number}</td>
                                            <td className="py-3 px-4">
                                                <Link
                                                    href={route('admin.appointments.show', apt.id)}
                                                    className="text-xs font-semibold text-brand-dark hover:text-brand-green transition-colors"
                                                >
                                                    View →
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="py-16 text-center">
                            <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                <i className="fas fa-calendar-xmark text-gray-400 text-xl" />
                            </div>
                            <p className="text-gray-500 font-medium">No appointments yet</p>
                            <p className="text-gray-400 text-sm mt-1">Bookings will appear here once submitted.</p>
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div>
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Quick Actions</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            { href: 'admin.services.create',    label: 'Add Service',   icon: 'fa-car-medical' },
                            { href: 'admin.activities.create',  label: 'Add Activity',  icon: 'fa-list-plus' },
                            { href: 'admin.faqs.create',        label: 'Add FAQ',       icon: 'fa-circle-plus' },
                        ].map(({ href, label, icon }) => (
                            <Link key={href} href={route(href)}
                                className="flex items-center gap-3 px-5 py-4 bg-brand-dark text-brand-green rounded-2xl font-semibold text-sm hover:bg-brand-gray transition-colors"
                            >
                                <i className={`fas ${icon}`} />
                                {label}
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </AdminLayout>
    );
}