import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Pikaday from 'pikaday';
import 'pikaday/css/pikaday.css';

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

const selClass =
    'w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 outline-none transition focus:bg-white focus:border-brand-dark focus:ring-2 focus:ring-brand-dark/10 cursor-pointer';

function DateInput({ value, onChange }) {
    const inputRef = useRef(null);
    const pkRef    = useRef(null);

    const toISO = d =>
        `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

    useEffect(() => {
        pkRef.current = new Pikaday({
            field: inputRef.current,
            toString: date =>
                `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`,
            parse: str => {
                const [m, d, y] = str.split('/');
                return new Date(+y, +m - 1, +d);
            },
            minDate: new Date(Date.now() + 86400000),
            onSelect: date => onChange(toISO(date)),
        });
        if (value) pkRef.current.setDate(new Date(value + 'T00:00:00'), true);
        return () => pkRef.current?.destroy();
    }, []);

    useEffect(() => {
        if (!pkRef.current) return;
        if (value) pkRef.current.setDate(new Date(value + 'T00:00:00'), true);
        else pkRef.current.clear();
    }, [value]);

    return (
        <div className="relative">
            <input
                ref={inputRef}
                readOnly
                placeholder="MM/DD/YYYY"
                className={fieldClass + ' pr-10 cursor-pointer'}
            />
            <i className="fas fa-calendar-alt absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
        </div>
    );
}

function TimeInput({ value, onChange, placeholder = 'Select time' }) {
    const inputRef = useRef(null);
    const fpRef    = useRef(null);

    useEffect(() => {
        fpRef.current = flatpickr(inputRef.current, {
            enableTime:  true,
            noCalendar:  true,
            dateFormat:  'h:i K',
            time_24hr:   false,
            defaultDate: value || undefined,
            onChange: ([date]) => {
                const h      = date.getHours();
                const m      = date.getMinutes();
                const period = h >= 12 ? 'PM' : 'AM';
                const hour   = h % 12 || 12;
                onChange(`${String(hour).padStart(2, '0')}:${String(m).padStart(2, '0')} ${period}`);
            },
        });
        return () => fpRef.current?.destroy();
    }, []);

    useEffect(() => {
        if (fpRef.current && value) {
            fpRef.current.setDate(value, false);
        }
    }, [value]);

    return (
        <div className="relative">
            <input
                ref={inputRef}
                readOnly
                placeholder={placeholder}
                className={fieldClass + ' pr-10 cursor-pointer'}
            />
            <i className="fas fa-clock absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none" />
        </div>
    );
}

function formatPhone(value) {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    if (digits.length < 4) return digits;
    if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function Booking({ abouts, activities = [], payers = [], captchaQuestion: initialQuestion }) {
    const [captchaQuestion, setCaptchaQuestion] = useState(initialQuestion);
    const [refreshing, setRefreshing] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        patient_name:         '',
        email_address:        '',
        phone_number:         '',
        patient_weight:       '',
        date_of_ride:         '',
        time_of_ride:         '08:00 AM',
        appointment_time:     '10:00 AM',
        return_time:          '12:00 PM',
        pick_up_location:     '',
        drop_off_location:    '',
        type_of_service:      '',
        payer_ride:           '',
        special_instructions: '',
        confirmation:         false,
        captcha_answer:       '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('booking.store'), { onSuccess: () => reset() });
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
            <Head title="Book an Appointment | NO Transportation LLC" />
            <BreadcrumbBanner title="Book an Appointment" current="Booking" />

            {/* Booking Form */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                        {/* Left — illustration */}
                        <div className="hidden lg:flex justify-center">
                            <img src="/images/contact.png" alt="Book a ride" className="max-w-full h-auto rounded-2xl" />
                        </div>

                        {/* Right — form */}
                        <div>
                            <div className="inline-block w-12 h-1 bg-brand-green mb-4" />
                            <h2 className="text-2xl font-bold text-brand-dark mb-2">Need a ride?</h2>
                            <p className="text-gray-500 text-sm italic mb-6">Use the form below to book your transportation with us.</p>

                            {errors.times && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center gap-2">
                                    <i className="fas fa-circle-exclamation" /> {errors.times}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">

                                {/* Patient Name + Email */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Field label="Patient Name *" error={errors.patient_name}>
                                        <input
                                            type="text"
                                            value={data.patient_name}
                                            onChange={e => setData('patient_name', e.target.value)}
                                            placeholder="Full name"
                                            className={fieldClass}
                                        />
                                    </Field>
                                    <Field label="Email Address *" error={errors.email_address}>
                                        <input
                                            type="email"
                                            value={data.email_address}
                                            onChange={e => setData('email_address', e.target.value)}
                                            placeholder="example@gmail.com"
                                            className={fieldClass}
                                        />
                                    </Field>
                                </div>

                                {/* Phone + Weight */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <Field label="Phone Number *" error={errors.phone_number}>
                                        <input
                                            type="tel"
                                            value={data.phone_number}
                                            onChange={e => setData('phone_number', formatPhone(e.target.value))}
                                            placeholder="(555) 555-5555"
                                            className={fieldClass}
                                        />
                                    </Field>
                                    <Field label="Patient Weight (lbs) *" error={errors.patient_weight}>
                                        <input
                                            type="number"
                                            value={data.patient_weight}
                                            onChange={e => setData('patient_weight', e.target.value)}
                                            placeholder="e.g. 150"
                                            className={fieldClass}
                                        />
                                    </Field>
                                </div>

                                {/* Date of Ride + Pick Up Time */}
                                <div className="grid grid-cols-2 gap-4">
                                    <Field label="Date of Ride *" error={errors.date_of_ride}>
                                        <DateInput
                                            value={data.date_of_ride}
                                            onChange={iso => setData('date_of_ride', iso)}
                                        />
                                    </Field>
                                    <Field label="Pick Up Time *" error={errors.time_of_ride}>
                                        <TimeInput
                                            value={data.time_of_ride}
                                            onChange={v => setData('time_of_ride', v)}
                                        />
                                    </Field>
                                </div>

                                {/* Appointment Time + Return Time */}
                                <div className="grid grid-cols-2 gap-4">
                                    <Field label="Appointment Time *" error={errors.appointment_time}>
                                        <TimeInput
                                            value={data.appointment_time}
                                            onChange={v => setData('appointment_time', v)}
                                        />
                                    </Field>
                                    <Field label="Return Time *" error={errors.return_time}>
                                        <TimeInput
                                            value={data.return_time}
                                            onChange={v => setData('return_time', v)}
                                        />
                                    </Field>
                                </div>

                                {/* Pick Up Location */}
                                <Field label="Pick Up Location *" error={errors.pick_up_location}>
                                    <input
                                        type="text"
                                        value={data.pick_up_location}
                                        onChange={e => setData('pick_up_location', e.target.value)}
                                        placeholder="Street address"
                                        className={fieldClass}
                                    />
                                </Field>

                                {/* Drop Off Location */}
                                <Field label="Drop Off Location *" error={errors.drop_off_location}>
                                    <input
                                        type="text"
                                        value={data.drop_off_location}
                                        onChange={e => setData('drop_off_location', e.target.value)}
                                        placeholder="Street address"
                                        className={fieldClass}
                                    />
                                </Field>

                                {/* Type of Service */}
                                <Field label="Type of Service *" error={errors.type_of_service}>
                                    <select
                                        value={data.type_of_service}
                                        onChange={e => setData('type_of_service', e.target.value)}
                                        className={selClass}
                                    >
                                        <option value="">Select type of service</option>
                                        {activities.map(a => (
                                            <option key={a.id} value={a.id}>{a.description || a.title}</option>
                                        ))}
                                    </select>
                                </Field>

                                {/* Payer */}
                                <Field label="Who is covering the cost of the ride? *" error={errors.payer_ride}>
                                    <select
                                        value={data.payer_ride}
                                        onChange={e => setData('payer_ride', e.target.value)}
                                        className={selClass}
                                    >
                                        <option value="">Select payer</option>
                                        {payers.map(p => (
                                            <option key={p.id} value={p.id}>{p.rider_payer}</option>
                                        ))}
                                    </select>
                                </Field>

                                {/* Special Instructions */}
                                <Field label="Special Instructions" error={errors.special_instructions}>
                                    <textarea
                                        value={data.special_instructions}
                                        onChange={e => setData('special_instructions', e.target.value)}
                                        placeholder="Optional notes for the driver..."
                                        rows={4}
                                        className={fieldClass + ' resize-y'}
                                    />
                                </Field>

                                {/* Confirmation checkbox */}
                                <div className="space-y-1">
                                    <div className="flex items-start gap-3">
                                        <input
                                            type="checkbox"
                                            id="confirmation"
                                            checked={data.confirmation}
                                            onChange={e => setData('confirmation', e.target.checked)}
                                            className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-brand-dark"
                                        />
                                        <label htmlFor="confirmation" className="text-sm text-gray-600 leading-relaxed">
                                            I agree and certify that the provided information is correct and that I am authorized to arrange this ride for the patient.
                                        </label>
                                    </div>
                                    {errors.confirmation && (
                                        <p className="text-red-500 text-xs flex items-center gap-1">
                                            <i className="fas fa-circle-exclamation" /> {errors.confirmation}
                                        </p>
                                    )}
                                </div>

                                {/* Math CAPTCHA */}
                                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 space-y-3">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1.5">
                                        <i className="fas fa-shield-halved text-brand-green" />
                                        Security Check
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="flex-shrink-0 bg-brand-dark text-brand-green font-bold text-sm px-4 py-2.5 rounded-lg tracking-wider">
                                            {captchaQuestion} = ?
                                        </div>
                                        <input
                                            type="number"
                                            value={data.captcha_answer}
                                            onChange={e => setData('captcha_answer', e.target.value)}
                                            placeholder="Answer"
                                            className="w-24 bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-center font-semibold outline-none focus:border-brand-dark focus:ring-2 focus:ring-brand-dark/10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                        />
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
                                                Submitting…
                                            </span>
                                        ) : 'Submit Booking'}
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

            {/* Safety */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="flex justify-center">
                            <img src="/images/ambulatory.png" alt="Safety" className="max-w-full h-auto rounded-2xl shadow-lg" />
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