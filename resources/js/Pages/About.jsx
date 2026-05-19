import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

const safetyItems = [
    'CPR/First Aid',
    'PASS (Passenger Assistance Safety and Sensitivity)',
    'Defensive Driving',
    'HIPAA Privacy and Security',
    'Cultural Competency',
    'Drivers Code of Conduct and ADA (Americans with Disabilities Act)',
];

function BreadcrumbBanner({ title, current }) {
    return (
        <section className="bg-brand-dark text-white py-12 relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-green" />
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{title}</h1>
                        <p className="text-gray-400 text-sm">Reliable & compassionate medical transportation solutions</p>
                    </div>
                    <nav className="flex items-center gap-2 text-sm text-gray-400">
                        <Link href={route('home')} className="hover:text-brand-green transition-colors">Home</Link>
                        <span className="text-brand-green">/</span>
                        <span className="text-brand-green font-medium">{current}</span>
                    </nav>
                </div>
            </div>
        </section>
    );
}

export default function About({ abouts }) {
    return (
        <PublicLayout abouts={abouts}>
            <Head title="About Us | NO Transportation LLC" />

            <BreadcrumbBanner title="About MNA Transportation LLC" current="About Us" />

            {/* About Content */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-block w-12 h-1 bg-brand-green mb-4" />
                            <h2 className="text-3xl font-bold text-brand-dark mb-6">About Us</h2>
                            {abouts?.content ? (
                                <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: abouts.content }} />
                            ) : (
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    NO Transportation LLC is your trusted partner in Non-Emergency Medical Transportation (NEMT). We provide reliable and compassionate transport services for individuals who require assistance getting to and from medical appointments, therapy sessions, and other essential destinations.
                                </p>
                            )}
                            <Link href={route('contact')} className="inline-block px-8 py-3 bg-brand-dark text-brand-green rounded-full font-bold hover:bg-brand-gray transition-all">
                                Contact Us
                            </Link>
                        </div>
                        <div className="flex justify-center">
                            <img src="/images/details-3.png" alt="About NO Transportation" className="max-w-full h-auto rounded-2xl shadow-lg" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Quote section */}
            <section className="py-16 bg-brand-dark text-white text-center relative overflow-hidden">
                <div className="h-1 bg-brand-green absolute top-0 left-0 right-0" />
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-brand-green text-5xl font-black mb-4">"</div>
                    <p className="text-xl text-gray-300 leading-relaxed mb-8">
                        We offer dependable, on-time transportation with a focus on quality service. Our friendly and experienced staff, from dispatch to drivers, is dedicated to meeting your needs.
                    </p>
                    <Link href={route('booking')} className="inline-block px-8 py-3 border-2 border-brand-green text-brand-green rounded-full font-bold hover:bg-brand-green hover:text-brand-dark transition-all">
                        Book Now
                    </Link>
                </div>
            </section>

            {/* Safety Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="flex justify-center">
                            <img src="/images/ambulatory.png" alt="Safety First" className="max-w-full h-auto rounded-2xl shadow-lg" />
                        </div>
                        <div>
                            <div className="inline-block w-12 h-1 bg-brand-green mb-4" />
                            <h2 className="text-3xl font-bold text-brand-dark mb-6">
                                <span className="text-brand-dark">Safety</span> is always our priority
                            </h2>
                            <p className="text-gray-600 mb-6">Our vehicles are regularly inspected and operated by skilled professionals who have completed comprehensive training programs, including:</p>
                            <ul className="space-y-3">
                                {safetyItems.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="w-6 h-6 bg-brand-green rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <i className="fas fa-check text-brand-dark text-xs" />
                                        </div>
                                        <span className="text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-brand-dark text-white relative overflow-hidden">
                <div className="h-1 bg-brand-green absolute top-0 left-0 right-0" />
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
                        <div className="p-8 border border-gray-700 rounded-2xl hover:border-brand-green transition-colors">
                            <p className="text-lg text-gray-300 mb-6">All of our transportation services are for non-emergency situations only.</p>
                            <Link href={route('booking')} className="inline-block px-8 py-3 bg-brand-green text-brand-dark rounded-full font-bold hover:bg-brand-green-dark transition-colors">Book Now</Link>
                        </div>
                        <div className="p-8 border border-gray-700 rounded-2xl hover:border-brand-green transition-colors">
                            <p className="text-lg text-gray-300 mb-6">If you have any questions regarding our services, please do not hesitate to contact us.</p>
                            <Link href={route('contact')} className="inline-block px-8 py-3 border-2 border-brand-green text-brand-green rounded-full font-bold hover:bg-brand-green hover:text-brand-dark transition-colors">Contact Us</Link>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}