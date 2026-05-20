import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Card, CardContent } from '@/components/ui/card';

export default function ServiceDetail({ abouts, service, otherServices = [] }) {
    return (
        <PublicLayout abouts={abouts}>
            <Head title={`${service.name} | NO Transportation LLC`} />

            {/* Breadcrumb Banner */}
            <section className="bg-brand-dark text-white py-12 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-green" />
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">{service.name}</h1>
                            <p className="text-gray-400 text-sm">Reliable & compassionate medical transportation solutions</p>
                        </div>
                        <nav className="flex items-center gap-2 text-sm text-gray-400">
                            <Link href={route('home')} className="hover:text-brand-green transition-colors">Home</Link>
                            <span className="text-brand-green">/</span>
                            <Link href={route('services')} className="hover:text-brand-green transition-colors">Services</Link>
                            <span className="text-brand-green">/</span>
                            <span className="text-brand-green font-medium">{service.name}</span>
                        </nav>
                    </div>
                </div>
            </section>

            {/* Service Detail */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2">
                            {service.image && (
                                <div className="overflow-hidden rounded-2xl shadow-md mb-6">
                                    <img
                                        src={`/storage/${service.image}`}
                                        alt={service.name}
                                        className="w-full h-80 object-cover"
                                    />
                                </div>
                            )}
                            <div className="inline-block w-12 h-1 bg-brand-green mb-4" />
                            <h2 className="text-3xl font-bold text-brand-dark mb-6">{service.name}</h2>
                            {service.description ? (
                                <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: service.description }} />
                            ) : (
                                <p className="text-gray-600">No description available for this service.</p>
                            )}

                            <div className="mt-8">
                                <Link href={route('booking')} className="px-8 py-3 bg-brand-dark text-brand-green rounded-full font-bold hover:bg-brand-gray transition-all">
                                    Book This Service
                                </Link>
                            </div>
                        </div>

                        {/* Sidebar - Other services */}
                        <div>
                            <div className="inline-block w-8 h-1 bg-brand-green mb-4" />
                            <h3 className="text-xl font-bold text-brand-dark mb-6">Other Services</h3>
                            <div className="space-y-3">
                                {otherServices.map((s) => (
                                    <Card key={s.id} className="hover:shadow-md transition-shadow border-l-4 border-l-brand-green">
                                        <CardContent className="p-4">
                                            <Link href={route('service.show', s.slug)} className="font-medium text-gray-800 hover:text-brand-gray transition-colors flex items-center gap-2">
                                                <i className="fas fa-arrow-right text-brand-green text-xs" />
                                                {s.name}
                                            </Link>
                                        </CardContent>
                                    </Card>
                                ))}
                                {otherServices.length === 0 && (
                                    <p className="text-gray-500 text-sm">No other services available.</p>
                                )}
                            </div>
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