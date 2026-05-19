import { Head, Link, useForm } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

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

export default function Contact({ abouts }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        full_name: '',
        email_address: '',
        phone_number: '',
        message: '',
        'g-recaptcha-response': '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('contact.store'), { onSuccess: () => reset() });
    }

    return (
        <PublicLayout abouts={abouts}>
            <Head title="Contact Us | NO Transportation LLC" />
            <BreadcrumbBanner title="Contact Us" current="Contact" />

            {/* Contact Form */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <div className="hidden lg:flex justify-center">
                            <img src="/images/contact.png" alt="Contact Us" className="max-w-full h-auto rounded-2xl shadow-lg" />
                        </div>

                        <div>
                            <div className="inline-block w-12 h-1 bg-brand-green mb-4" />
                            <h2 className="text-2xl font-bold text-brand-dark mb-2">Have questions or need a ride?</h2>
                            <p className="text-gray-500 italic mb-6">Fill out the form below and our team will get back to you shortly.</p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <Label>Full Name *</Label>
                                    <Input value={data.full_name} onChange={e => setData('full_name', e.target.value)} placeholder="Full Name" className="focus:border-brand-green focus:ring-brand-green" />
                                    {errors.full_name && <p className="text-red-500 text-xs mt-1">{errors.full_name}</p>}
                                </div>
                                <div>
                                    <Label>Email Address *</Label>
                                    <Input type="email" value={data.email_address} onChange={e => setData('email_address', e.target.value)} placeholder="Enter email" />
                                    {errors.email_address && <p className="text-red-500 text-xs mt-1">{errors.email_address}</p>}
                                </div>
                                <div>
                                    <Label>Phone Number *</Label>
                                    <Input value={data.phone_number} onChange={e => setData('phone_number', e.target.value)} placeholder="Phone Number" />
                                    {errors.phone_number && <p className="text-red-500 text-xs mt-1">{errors.phone_number}</p>}
                                </div>
                                <div>
                                    <Label>Your Message *</Label>
                                    <Textarea value={data.message} onChange={e => setData('message', e.target.value)} placeholder="Your message...?" rows={8} />
                                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                                </div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-3 bg-brand-dark text-brand-green rounded-full font-bold hover:bg-brand-gray transition-all disabled:opacity-50"
                                >
                                    {processing ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { icon: 'fa-location-dot', label: 'Company Address', value: abouts?.address },
                            { icon: 'fa-envelope', label: 'E-mail', value: abouts?.email },
                            { icon: 'fa-phone-alt', label: 'Phone Numbers', value: abouts?.phone },
                        ].map((item, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-sm border-b-4 border-brand-green hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-brand-dark rounded-xl flex items-center justify-center mx-auto mb-3">
                                    <i className={`fas ${item.icon} text-brand-green text-xl`} />
                                </div>
                                <h5 className="font-bold text-brand-dark mb-2">{item.label}</h5>
                                <p className="text-gray-600 text-sm">{item.value || '—'}</p>
                            </div>
                        ))}
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
                            <p className="text-lg text-gray-300 mb-6">We offer dependable, on-time transportation with a focus on quality service.</p>
                            <Link href={route('booking')} className="inline-block px-8 py-3 border-2 border-brand-green text-brand-green rounded-full font-bold hover:bg-brand-green hover:text-brand-dark transition-colors">Book a Ride</Link>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}