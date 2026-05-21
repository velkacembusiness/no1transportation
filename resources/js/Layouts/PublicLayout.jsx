import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

function Header({ abouts }) {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { url } = usePage();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: route('home'), label: 'Home', name: 'home' },
        { href: route('about'), label: 'About Us', name: 'about' },
        { href: route('services'), label: 'Services', name: 'services' },
        { href: route('contact'), label: 'Contact', name: 'contact' },
    ];

    const isActive = (name) => url === route(name, [], false);

    return (
        <>
            {/* Top bar - brand dark */}
            <div className="bg-brand-dark text-white text-sm py-2">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <span>
                        Welcome to <span className="text-brand-green font-semibold">NO 1 Transportation LLC</span>
                        {abouts?.phone && (
                            <> &nbsp;|&nbsp; Call:{' '}
                                <a href={`tel:${abouts.phone}`} className="text-brand-green hover:underline">{abouts.phone}</a>
                            </>
                        )}
                    </span>
                    <div className="flex gap-4">
                        {abouts?.facebook && <a href={abouts.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-brand-green transition-colors"><i className="fab fa-facebook text-lg" /></a>}
                        {abouts?.twitter && <a href={abouts.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-brand-green transition-colors"><i className="fab fa-twitter text-lg" /></a>}
                        {abouts?.instagram && <a href={abouts.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-brand-green transition-colors"><i className="fab fa-instagram text-lg" /></a>}
                        {abouts?.linkedin && <a href={abouts.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-brand-green transition-colors"><i className="fab fa-linkedin text-lg" /></a>}
                    </div>
                </div>
            </div>

            {/* Navbar - white with dark text */}
            <nav className={`sticky top-0 z-50 bg-white transition-shadow ${scrolled ? 'shadow-lg' : 'shadow-sm'}`}>
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        <Link href={route('home')}>
                            <img src="/images/logo.png" alt="NO Transportation" className="h-12 w-auto" />
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                                        isActive(link.name)
                                            ? 'text-brand-dark bg-brand-green'
                                            : 'text-gray-700 hover:text-brand-dark hover:bg-brand-green-light'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Link
                                href={route('booking')}
                                className="ml-4 px-6 py-2 rounded-full bg-brand-dark text-brand-green font-bold text-sm hover:bg-brand-gray transition-all border-2 border-brand-dark"
                            >
                                Book Now
                            </Link>
                        </div>

                        {/* Mobile toggle */}
                        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 rounded-md text-gray-700">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen
                                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                }
                            </svg>
                        </button>
                    </div>

                    {/* Mobile menu */}
                    {isOpen && (
                        <div className="md:hidden pb-4 border-t">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-green-light hover:text-brand-dark"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Link
                                href={route('booking')}
                                className="block mx-4 mt-2 px-4 py-2 text-center rounded-full bg-brand-dark text-brand-green font-bold text-sm"
                                onClick={() => setIsOpen(false)}
                            >
                                Book Now
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
}

function Footer({ abouts }) {
    return (
        <footer className="bg-brand-dark text-gray-300 pt-12 pb-6">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-8">
                    {/* About */}
                    <div>
                        <Link href={route('home')} className="inline-block mb-4">
                            <img src="/images/logo.png" alt="NO Transportation" className="h-12 w-auto brightness-0 invert" />
                        </Link>
                        <p className="text-sm leading-relaxed text-gray-400">
                            Your Trusted Partner in Non-Emergency Medical Transportation (NEMT). We provide reliable and compassionate transport services for individuals who require assistance getting to medical appointments and other essential destinations.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h5 className="text-brand-green font-bold mb-4">Quick Links</h5>
                        <nav className="flex flex-col gap-2 text-sm">
                            <Link href={route('about')} className="text-gray-400 hover:text-brand-green transition-colors">About Us</Link>
                            <Link href={route('services')} className="text-gray-400 hover:text-brand-green transition-colors">Services</Link>
                            <Link href={route('booking')} className="text-gray-400 hover:text-brand-green transition-colors">Book Now</Link>
                            <Link href={route('contact')} className="text-gray-400 hover:text-brand-green transition-colors">Contact</Link>
                        </nav>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h5 className="text-brand-green font-bold mb-4">Contact Information</h5>
                        <div className="flex flex-col gap-3 text-sm">
                            {abouts?.address && (
                                <div className="flex gap-3">
                                    <i className="fas fa-location-dot text-brand-green mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-400">{abouts.address}</span>
                                </div>
                            )}
                            {abouts?.phone && (
                                <div className="flex gap-3 items-center">
                                    <i className="fas fa-phone text-brand-green flex-shrink-0" />
                                    <span className="text-gray-400">{abouts.phone}</span>
                                </div>
                            )}
                            {abouts?.email && (
                                <div className="flex gap-3 items-center">
                                    <i className="fas fa-envelope text-brand-green flex-shrink-0" />
                                    <a href={`mailto:${abouts.email}`} className="text-gray-400 hover:text-brand-green transition-colors">{abouts.email}</a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Hours */}
                    <div>
                        <h5 className="text-brand-green font-bold mb-4">Daily Operating Hours</h5>
                        <div className="flex gap-3 text-sm">
                            <i className="far fa-clock text-brand-green mt-0.5 flex-shrink-0" />
                            <div className="text-gray-400">
                                <p>Open Daily: 5:00 AM – 5:00 PM</p>
                                <p className="text-gray-500 mt-1">After-Hours Service Available</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider with brand green */}
                <div className="border-t border-gray-800 pt-6 text-center">
                    <div className="flex justify-center gap-5 mb-4">
                        {abouts?.facebook && <a href={abouts.facebook} target="_blank" rel="noopener noreferrer" className="text-xl text-gray-400 hover:text-brand-green transition-colors"><i className="fab fa-facebook" /></a>}
                        {abouts?.twitter && <a href={abouts.twitter} target="_blank" rel="noopener noreferrer" className="text-xl text-gray-400 hover:text-brand-green transition-colors"><i className="fab fa-twitter" /></a>}
                        {abouts?.instagram && <a href={abouts.instagram} target="_blank" rel="noopener noreferrer" className="text-xl text-gray-400 hover:text-brand-green transition-colors"><i className="fab fa-instagram" /></a>}
                        {abouts?.linkedin && <a href={abouts.linkedin} target="_blank" rel="noopener noreferrer" className="text-xl text-gray-400 hover:text-brand-green transition-colors"><i className="fab fa-linkedin" /></a>}
                    </div>
                    <p className="text-sm text-gray-500">© {new Date().getFullYear()} NO Transportation LLC. All Rights Reserved.</p>
                    <p className="text-xs text-gray-600 mt-2">Designed & Developed by MagiSoft Algeria</p>
                </div>
            </div>
        </footer>
    );
}

export default function PublicLayout({ children, abouts }) {
    const { props } = usePage();
    const flash = props.flash || {};

    useEffect(() => {
        if (flash.success) toast.success(flash.success);
        if (flash.error) toast.error(flash.error);
    }, [flash.success, flash.error]);

    const pageAbouts = abouts || props.abouts;

    return (
        <div className="min-h-screen flex flex-col font-sans">
            <Header abouts={pageAbouts} />
            <main className="flex-1">{children}</main>
            <Footer abouts={pageAbouts} />
            <Toaster position="bottom-center" richColors />
        </div>
    );
}
