import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Card, CardContent } from '@/components/ui/card';

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

const safetyItems = ['CPR/First Aid','PASS (Passenger Assistance Safety and Sensitivity)','Defensive Driving','HIPAA Privacy and Security','Cultural Competency','Drivers Code of Conduct and ADA'];

export default function Services({ abouts, services }) {
    const { data, links } = services;

    return (
        <PublicLayout abouts={abouts}>
            <Head title="Our Services | NO Transportation LLC" />
            <BreadcrumbBanner title="Our Services" current="Services" />

            {/* Services Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    {data && data.length > 0 ? (
                        <>
                            <div className="text-center mb-12">
                                <div className="inline-block w-12 h-1 bg-brand-green mb-4" />
                                <h2 className="text-3xl font-bold text-brand-dark">Transportation Services</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                                {data.map((service) => (
                                    <Card key={service.id} className="overflow-hidden hover:shadow-xl transition-all group border-0 shadow-md">
                                        {service.image && (
                                            <div className="overflow-hidden h-48">
                                                <img
                                                    src={`/storage/${service.image}`}
                                                    alt={service.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                        )}
                                        <CardContent className="p-5">
                                            <div className="w-8 h-1 bg-brand-green mb-3" />
                                            <h3 className="font-bold text-lg mb-2">
                                                <Link href={route('service.show', service.slug)} className="text-brand-dark hover:text-brand-gray transition-colors">
                                                    {service.name}
                                                </Link>
                                            </h3>
                                            {service.description && (
                                                <p className="text-gray-500 text-sm line-clamp-3">{service.description}</p>
                                            )}
                                            <Link href={route('service.show', service.slug)} className="inline-flex items-center gap-1 mt-4 text-sm font-semibold text-brand-dark hover:text-brand-gray transition-colors">
                                                Learn more <i className="fas fa-arrow-right text-xs" />
                                            </Link>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Pagination */}
                            {links && links.length > 3 && (
                                <div className="flex justify-center gap-2">
                                    {links.map((link, i) => (
                                        <Link
                                            key={i}
                                            href={link.url || '#'}
                                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                                link.active
                                                    ? 'bg-brand-dark text-brand-green'
                                                    : link.url
                                                    ? 'border border-gray-300 hover:bg-brand-green-light hover:border-brand-green text-gray-700'
                                                    : 'border border-gray-200 text-gray-300 cursor-not-allowed'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-20">
                            <div className="w-20 h-20 bg-brand-green-light rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-car-medical text-3xl text-brand-dark" />
                            </div>
                            <p className="text-gray-500 text-lg">No services available yet.</p>
                        </div>
                    )}
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
                            <h2 className="text-3xl font-bold text-brand-dark mb-6">Safety is always our priority</h2>
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
                            <p className="text-lg text-gray-300 mb-6">If you have any questions, please do not hesitate to contact us.</p>
                            <Link href={route('contact')} className="inline-block px-8 py-3 border-2 border-brand-green text-brand-green rounded-full font-bold hover:bg-brand-green hover:text-brand-dark transition-colors">Contact Us</Link>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}