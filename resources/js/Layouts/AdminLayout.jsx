import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

const navItems = [
    { href: 'admin.dashboard', label: 'Dashboard', icon: 'fa-gauge' },
    { href: 'admin.appointments.index', label: 'Appointments', icon: 'fa-calendar-check' },
    { href: 'admin.services.index', label: 'Services', icon: 'fa-car-medical' },
    { href: 'admin.activities.index', label: 'Activities', icon: 'fa-list' },
    { href: 'admin.faqs.index', label: 'FAQs', icon: 'fa-circle-question' },
    { href: 'admin.payers.index', label: 'Payers', icon: 'fa-wallet' },
    { href: 'admin.about.edit', label: 'About', icon: 'fa-info-circle' },
];

export default function AdminLayout({ children, title }) {
    const { props, url } = usePage();
    const flash = props.flash || {};
    const auth = props.auth || {};
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (flash.success) toast.success(flash.success);
        if (flash.error) toast.error(flash.error);
    }, [flash.success, flash.error]);

    const isActive = (routeName) => {
        try { return url.startsWith(route(routeName, [], false)); }
        catch { return false; }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:block`}>
                <div className="flex items-center gap-3 p-5 border-b border-gray-700">
                    <img src="/images/logo.png" alt="Logo" className="h-10 w-auto" />
                    <div>
                        <p className="font-bold text-sm">NO Transportation</p>
                        <p className="text-xs text-gray-400">Admin Panel</p>
                    </div>
                </div>

                <nav className="p-4 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={route(item.href)}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                isActive(item.href)
                                    ? 'bg-brand-green text-brand-dark'
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                            }`}
                            onClick={() => setSidebarOpen(false)}
                        >
                            <i className={`fas ${item.icon} w-4`} />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
                    <Link href={route('home')} className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors">
                        <i className="fas fa-arrow-left" />
                        Back to Website
                    </Link>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Main content */}
            <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
                {/* Top bar */}
                <header className="bg-white border-b shadow-sm sticky top-0 z-30">
                    <div className="flex items-center justify-between h-16 px-6">
                        <div className="flex items-center gap-4">
                            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100">
                                <i className="fas fa-bars" />
                            </button>
                            {title && <h1 className="text-lg font-semibold text-gray-800">{title}</h1>}
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600 hidden md:block">{auth.user?.name}</span>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="text-sm text-gray-500 hover:text-red-600 transition-colors flex items-center gap-1"
                            >
                                <i className="fas fa-sign-out-alt" />
                                <span className="hidden md:inline">Logout</span>
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>

            <Toaster position="bottom-right" richColors />
        </div>
    );
}