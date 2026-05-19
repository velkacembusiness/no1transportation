import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';

function useReveal() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return [ref, visible];
}

function RevealSection({ children, className = '' }) {
    const [ref, visible] = useReveal();
    return (
        <div ref={ref} className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
            {children}
        </div>
    );
}

const servicesList = [
    { icon: 'fa-truck-medical', label: 'Ambulatory Transportation' },
    { icon: 'fa-wheelchair', label: 'Wheelchair Transportation' },
    { icon: 'fa-bed', label: 'Stretcher Transportation' },
    { icon: 'fa-stairs', label: 'Stairlift Services' },
    { icon: 'fa-calendar-check', label: "Doctor's Appointment Transportation" },
    { icon: 'fa-car', label: 'Limo Service' },
];

function FAQItem({ faq, defaultOpen }) {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
                onClick={() => setOpen(!open)}
                className="w-full px-6 py-4 text-left flex justify-between items-center font-semibold text-gray-800 hover:bg-brand-green-light transition-colors"
            >
                {faq.question}
                <i className={`fas fa-chevron-${open ? 'up' : 'down'} text-brand-green-dark transition-transform`} />
            </button>
            {open && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-gray-600">
                    <p className="whitespace-pre-line">{faq.answer}</p>
                </div>
            )}
        </div>
    );
}

export default function Home({ abouts, faqs = [] }) {
    return (
        <PublicLayout abouts={abouts}>
            <Head title="Home | NO Transportation LLC" />

            {/* Hero - dark background with lime accent */}
            <section className="relative bg-brand-dark text-white py-20 overflow-hidden">
                {/* Decorative lime stripe */}
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-16 bg-brand-green opacity-10 pointer-events-none" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green opacity-5 rounded-full blur-3xl pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-brand-green text-brand-dark px-4 py-1.5 rounded-full text-sm font-bold mb-6">
                                <i className="fas fa-shield-heart" />
                                Non-Emergency Medical Transportation
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
                                <span className="text-brand-green">NO Transportation</span>
                                <br />
                                <span className="text-white">LLC</span>
                            </h1>
                            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                                Welcome to <strong className="text-brand-green">NO Transportation LLC</strong> – Your Trusted Partner in Non-Emergency Medical Transportation (NEMT).
                                We deliver safe, reliable, and compassionate transportation for individuals who need assistance traveling to and from medical appointments.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href={route('booking')} className="px-8 py-3 bg-brand-green text-brand-dark rounded-full font-bold hover:bg-brand-green-dark transition-all shadow-lg">
                                    Book a Ride
                                </Link>
                                <Link href={route('contact')} className="px-8 py-3 border-2 border-brand-green text-brand-green rounded-full font-bold hover:bg-brand-green hover:text-brand-dark transition-all">
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <img src="/images/Ambulance.gif" alt="Medical Transportation" className="max-w-full h-auto rounded-2xl" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Brand stripe */}
            <div className="h-2 bg-brand-green" />

            {/* Introduction */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <RevealSection className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold text-brand-dark mb-6">
                            <span className="relative">
                                <span className="relative z-10">Safety</span>
                                <span className="absolute bottom-0 left-0 right-0 h-3 bg-brand-green opacity-40 -z-0" />
                            </span>
                            {' '}is at the heart of everything we do
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            We deliver timely and efficient transportation services with a strong commitment to excellence. Our highly trained, friendly, and professional team—from dispatch to drivers—ensures outstanding customer care. All our vehicles are clean, well-maintained, smoke-free, and designed to provide a safe, comfortable, and hazard-free environment.
                        </p>
                    </RevealSection>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <RevealSection>
                            <div className="inline-block w-12 h-1 bg-brand-green mb-4" />
                            <h2 className="text-3xl font-bold text-brand-dark mb-4">
                                Services that we offer
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                <strong className="text-brand-dark">NO Transportation LLC</strong> provides specialized transport services designed for the safety and comfort of your patients, offering everything from standard car rides to tailored transportation solutions.
                            </p>
                        </RevealSection>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {servicesList.map((service, i) => (
                                <RevealSection key={i}>
                                    <div className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-brand-green-light transition-colors group">
                                        <div className="w-16 h-16 bg-brand-dark rounded-xl flex items-center justify-center mb-3 group-hover:bg-brand-green transition-colors">
                                            <i className={`fas ${service.icon} text-brand-green text-2xl group-hover:text-brand-dark transition-colors`} />
                                        </div>
                                        <p className="font-semibold text-gray-800 text-sm">{service.label}</p>
                                    </div>
                                </RevealSection>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            {faqs.length > 0 && (
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <RevealSection className="text-center mb-10">
                            <div className="inline-block w-12 h-1 bg-brand-green mb-4" />
                            <h2 className="text-3xl font-bold text-brand-dark mb-3">Frequently Asked Questions</h2>
                            <p className="text-gray-500">Here are some of our FAQs. Feel free to contact us if you need more information.</p>
                        </RevealSection>

                        <div className="max-w-3xl mx-auto space-y-3">
                            {faqs.map((faq, i) => (
                                <FAQItem key={faq.id} faq={faq} defaultOpen={i === 0} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA - brand dark with lime accent */}
            <section className="py-16 bg-brand-dark text-white relative overflow-hidden">
                {/* Lime accent bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-green" />

                <div className="container mx-auto px-4">
                    <RevealSection>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="text-center p-8 rounded-2xl border border-gray-700 hover:border-brand-green transition-colors">
                                <div className="w-12 h-12 bg-brand-green rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-calendar-check text-brand-dark text-xl" />
                                </div>
                                <p className="text-lg mb-6 text-gray-300">All of our transportation services are for non-emergency situations only.</p>
                                <Link href={route('booking')} className="px-8 py-3 bg-brand-green text-brand-dark rounded-full font-bold hover:bg-brand-green-dark transition-colors">
                                    Book Now
                                </Link>
                            </div>
                            <div className="text-center p-8 rounded-2xl border border-gray-700 hover:border-brand-green transition-colors">
                                <div className="w-12 h-12 bg-brand-green rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <i className="fas fa-phone text-brand-dark text-xl" />
                                </div>
                                <p className="text-lg mb-6 text-gray-300">If you have any questions regarding our services, please do not hesitate to contact us.</p>
                                <Link href={route('contact')} className="px-8 py-3 border-2 border-brand-green text-brand-green rounded-full font-bold hover:bg-brand-green hover:text-brand-dark transition-colors">
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </RevealSection>
                </div>
            </section>
        </PublicLayout>
    );
}