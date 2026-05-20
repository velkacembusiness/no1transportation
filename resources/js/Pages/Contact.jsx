import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';

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

function Field({ label, error, children }) {
    return (
        <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            {children}
            {error && (
                <p className="text-red-500 text-xs flex items-center gap-1">
                    <i className="fas fa-circle-exclamation" /> {error}
                </p>
            )}
        </div>
    );
}

const fieldClass =
    'w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:bg-white focus:border-brand-dark focus:ring-2 focus:ring-brand-dark/10';

function formatPhone(value) {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    if (digits.length < 4)  return digits;
    if (digits.length < 7)  return `(${digits.slice(0,3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
}

export default function Contact({ abouts, captchaQuestion: initialQuestion }) {
    const [captchaQuestion, setCaptchaQuestion] = useState(initialQuestion);
    const [refreshing, setRefreshing] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        full_name:      '',
        email_address:  '',
        phone_number:   '',
        message:        '',
        captcha_answer: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('contact.store'), { onSuccess: () => reset() });
    }

    async function refreshCaptcha() {
        setRefreshing(true);
        setData('captcha_answer', '');
        try {
            const res  = await fetch(route('captcha.refresh'));
            const json = await res.json();
            setCaptchaQuestion(json.question);
        } finally {
            setRefreshing(false);
        }
    }

    return (
        <PublicLayout abouts={abouts}>
            <Head title="Contact Us | NO Transportation LLC" />
            <BreadcrumbBanner title="Contact Us" current="Contact" />

            {/* Contact Form */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto">

                        {/* Header */}
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Contact Our Team</h2>
                            <p className="text-gray-500 text-sm">
                                For inquiries, scheduling, or general information, please fill out the form below. A member of our team will respond within 24 hours.
                            </p>
                        </div>

                        {/* Form card */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
                            <form onSubmit={handleSubmit} className="space-y-5">

                                {/* Full Name */}
                                <Field label="Full Name" error={errors.full_name}>
                                    <input
                                        type="text"
                                        value={data.full_name}
                                        onChange={e => setData('full_name', e.target.value)}
                                        placeholder="Full Name"
                                        className={fieldClass}
                                    />
                                </Field>

                                {/* Email + Phone */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Field label="Email Address" error={errors.email_address}>
                                        <input
                                            type="email"
                                            value={data.email_address}
                                            onChange={e => setData('email_address', e.target.value)}
                                            placeholder="example@gmail.com"
                                            className={fieldClass}
                                        />
                                    </Field>
                                    <Field label="Phone Number" error={errors.phone_number}>
                                        <input
                                            type="tel"
                                            value={data.phone_number}
                                            onChange={e => setData('phone_number', formatPhone(e.target.value))}
                                            placeholder="(555) 555-5555"
                                            className={fieldClass}
                                        />
                                    </Field>
                                </div>

                                {/* Message */}
                                <Field label="Message" error={errors.message}>
                                    <textarea
                                        value={data.message}
                                        onChange={e => setData('message', e.target.value)}
                                        placeholder="Your message...?"
                                        rows={7}
                                        className={fieldClass + ' resize-y'}
                                    />
                                </Field>

                                {/* Math CAPTCHA */}
                                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 space-y-3">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1.5">
                                        <i className="fas fa-shield-halved text-brand-green" />
                                        Security Check
                                    </p>
                                    <div className="flex items-center gap-3">
                                        {/* Question badge */}
                                        <div className="flex-shrink-0 bg-brand-dark text-brand-green font-bold text-sm px-4 py-2.5 rounded-lg tracking-wider">
                                            {captchaQuestion} = ?
                                        </div>
                                        {/* Answer input */}
                                        <input
                                            type="number"
                                            value={data.captcha_answer}
                                            onChange={e => setData('captcha_answer', e.target.value)}
                                            placeholder="Answer"
                                            className="w-24 bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-center font-semibold outline-none focus:border-brand-dark focus:ring-2 focus:ring-brand-dark/10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
                                        {/* Refresh button */}
                                        <button
                                            type="button"
                                            onClick={refreshCaptcha}
                                            disabled={refreshing}
                                            title="Get a new question"
                                            className="p-2.5 rounded-lg border border-gray-200 bg-white text-gray-400 hover:text-brand-dark hover:border-brand-dark transition-colors disabled:opacity-50"
                                        >
                                            <i className={`fas fa-arrows-rotate text-sm ${refreshing ? 'animate-spin' : ''}`} />
                                        </button>
                                    </div>
                                    {errors.captcha_answer && (
                                        <p className="text-red-500 text-xs flex items-center gap-1">
                                            <i className="fas fa-circle-exclamation" /> {errors.captcha_answer}
                                        </p>
                                    )}
                                </div>

                                {/* Submit */}
                                <div className="pt-1">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-8 py-3 bg-brand-green text-brand-dark rounded-full font-bold text-sm hover:bg-brand-green-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {processing ? (
                                            <span className="flex items-center gap-2">
                                                <i className="fas fa-circle-notch fa-spin" />
                                                Sending…
                                            </span>
                                        ) : 'Submit form'}
                                    </button>
                                </div>
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
                            { icon: 'fa-envelope',     label: 'E-mail',          value: abouts?.email },
                            { icon: 'fa-phone-alt',    label: 'Phone Numbers',   value: abouts?.phone },
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