import { Head, Link, useForm } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';

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

export default function Booking({ abouts, activities = [], payers = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        patient_name: '',
        email_address: '',
        phone_number: '',
        patient_weight: '',
        date_of_ride: '',
        time_of_ride: '',
        appointment_time: '',
        return_time: '',
        pick_up_location: '',
        drop_off_location: '',
        type_of_service: '',
        payer_ride: '',
        special_instructions: '',
        confirmation: false,
        'g-recaptcha-response': '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('booking.store'));
    }

    return (
        <PublicLayout abouts={abouts}>
            <Head title="Book an Appointment | NO Transportation LLC" />
            <BreadcrumbBanner title="Book an Appointment" current="Booking" />

            {/* Booking Form */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        <div className="hidden lg:flex justify-center">
                            <img src="/images/contact.png" alt="Book a ride" className="max-w-full h-auto rounded-2xl shadow-lg" />
                        </div>

                        <div>
                            <div className="inline-block w-12 h-1 bg-brand-green mb-4" />
                            <h2 className="text-2xl font-bold text-brand-dark mb-2">Need a ride?</h2>
                            <p className="text-gray-500 italic mb-6">Use the form below to book your transportation with us.</p>

                            {errors.times && (
                                <Alert variant="destructive" className="mb-4">
                                    <AlertDescription>{errors.times}</AlertDescription>
                                </Alert>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label>Patient Name *</Label>
                                        <Input value={data.patient_name} onChange={e => setData('patient_name', e.target.value)} placeholder="Enter Name" />
                                        {errors.patient_name && <p className="text-red-500 text-xs mt-1">{errors.patient_name}</p>}
                                    </div>
                                    <div>
                                        <Label>Email Address *</Label>
                                        <Input type="email" value={data.email_address} onChange={e => setData('email_address', e.target.value)} placeholder="Enter email" />
                                        {errors.email_address && <p className="text-red-500 text-xs mt-1">{errors.email_address}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label>Phone Number *</Label>
                                        <Input value={data.phone_number} onChange={e => setData('phone_number', e.target.value)} placeholder="(000) 000-0000" />
                                        {errors.phone_number && <p className="text-red-500 text-xs mt-1">{errors.phone_number}</p>}
                                    </div>
                                    <div>
                                        <Label>Patient Weight (lbs) *</Label>
                                        <Input type="number" value={data.patient_weight} onChange={e => setData('patient_weight', e.target.value)} placeholder="Patient weight" />
                                        {errors.patient_weight && <p className="text-red-500 text-xs mt-1">{errors.patient_weight}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label>Date of Ride *</Label>
                                        <Input type="date" value={data.date_of_ride} onChange={e => setData('date_of_ride', e.target.value)} min={new Date(Date.now() + 86400000).toISOString().split('T')[0]} />
                                        {errors.date_of_ride && <p className="text-red-500 text-xs mt-1">{errors.date_of_ride}</p>}
                                    </div>
                                    <div>
                                        <Label>Pick Up Time *</Label>
                                        <Input type="time" value={data.time_of_ride} onChange={e => setData('time_of_ride', e.target.value)} />
                                        {errors.time_of_ride && <p className="text-red-500 text-xs mt-1">{errors.time_of_ride}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label>Appointment Time *</Label>
                                        <Input type="time" value={data.appointment_time} onChange={e => setData('appointment_time', e.target.value)} />
                                        {errors.appointment_time && <p className="text-red-500 text-xs mt-1">{errors.appointment_time}</p>}
                                    </div>
                                    <div>
                                        <Label>Return Time *</Label>
                                        <Input type="time" value={data.return_time} onChange={e => setData('return_time', e.target.value)} />
                                        {errors.return_time && <p className="text-red-500 text-xs mt-1">{errors.return_time}</p>}
                                    </div>
                                </div>

                                <div>
                                    <Label>Pick Up Location *</Label>
                                    <Input value={data.pick_up_location} onChange={e => setData('pick_up_location', e.target.value)} placeholder="Pick up location" />
                                    {errors.pick_up_location && <p className="text-red-500 text-xs mt-1">{errors.pick_up_location}</p>}
                                </div>

                                <div>
                                    <Label>Drop Off Location *</Label>
                                    <Input value={data.drop_off_location} onChange={e => setData('drop_off_location', e.target.value)} placeholder="Drop off location" />
                                    {errors.drop_off_location && <p className="text-red-500 text-xs mt-1">{errors.drop_off_location}</p>}
                                </div>

                                <div>
                                    <Label>Type of Service *</Label>
                                    <select value={data.type_of_service} onChange={e => setData('type_of_service', e.target.value)} className="w-full h-10 px-3 py-2 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring">
                                        <option value="">Select type of service</option>
                                        {activities.map(a => <option key={a.id} value={a.id}>{a.description || a.title}</option>)}
                                    </select>
                                    {errors.type_of_service && <p className="text-red-500 text-xs mt-1">{errors.type_of_service}</p>}
                                </div>

                                <div>
                                    <Label>Who is covering the cost of the ride? *</Label>
                                    <select value={data.payer_ride} onChange={e => setData('payer_ride', e.target.value)} className="w-full h-10 px-3 py-2 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring">
                                        <option value="">Select payer</option>
                                        {payers.map(p => <option key={p.id} value={p.id}>{p.rider_payer}</option>)}
                                    </select>
                                    {errors.payer_ride && <p className="text-red-500 text-xs mt-1">{errors.payer_ride}</p>}
                                </div>

                                <div>
                                    <Label>Special Instructions</Label>
                                    <Textarea value={data.special_instructions} onChange={e => setData('special_instructions', e.target.value)} placeholder="Special instructions (optional)" rows={4} />
                                </div>

                                <div className="flex items-start gap-3">
                                    <input type="checkbox" id="confirmation" checked={data.confirmation} onChange={e => setData('confirmation', e.target.checked)} className="mt-1 w-4 h-4 rounded border-gray-300 accent-brand-dark" required />
                                    <label htmlFor="confirmation" className="text-sm text-gray-600">
                                        I agree and certify that the provided information is correct and that I am authorized to arrange this ride for the patient.
                                    </label>
                                </div>
                                {errors.confirmation && <p className="text-red-500 text-xs">{errors.confirmation}</p>}

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full py-3 bg-brand-dark text-brand-green rounded-full font-bold hover:bg-brand-gray transition-all disabled:opacity-50"
                                >
                                    {processing ? 'Submitting...' : 'Submit Booking'}
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