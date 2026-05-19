import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

function Row({ label, value }) {
    return (
        <div className="flex flex-col sm:flex-row sm:gap-4 py-3 border-b last:border-0">
            <dt className="text-sm font-semibold text-gray-500 sm:w-48 flex-shrink-0">{label}</dt>
            <dd className="text-sm text-gray-800 mt-1 sm:mt-0">{value || '—'}</dd>
        </div>
    );
}

export default function AppointmentShow({ appointment }) {
    return (
        <AdminLayout title="Appointment Details">
            <Head title={`Appointment #${appointment.id} | Admin`} />

            <div className="max-w-3xl space-y-6">
                <div className="flex items-center gap-4">
                    <Link href={route('admin.appointments.index')}>
                        <Button variant="outline" size="sm">
                            <i className="fas fa-arrow-left mr-2" /> Back
                        </Button>
                    </Link>
                    <h2 className="text-xl font-semibold text-gray-800">Appointment #{appointment.id}</h2>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Patient Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <dl>
                            <Row label="Patient Name" value={appointment.patient_name} />
                            <Row label="Email Address" value={appointment.email_address} />
                            <Row label="Phone Number" value={appointment.phone_number} />
                            <Row label="Patient Weight" value={appointment.patient_weight && `${appointment.patient_weight} lbs`} />
                        </dl>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Ride Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <dl>
                            <Row label="Date of Ride" value={appointment.date_of_ride} />
                            <Row label="Pick Up Time" value={appointment.time_of_ride} />
                            <Row label="Appointment Time" value={appointment.appointment_time} />
                            <Row label="Return Time" value={appointment.return_time} />
                            <Row label="Pick Up Location" value={appointment.pick_up_location} />
                            <Row label="Drop Off Location" value={appointment.drop_off_location} />
                            <Row label="Type of Service" value={appointment.type_of_service} />
                            <Row label="Rider Payer" value={appointment.rider_payer} />
                            <Row label="Special Instructions" value={appointment.special_instructions} />
                        </dl>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Booking Reference</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <dl>
                            <Row label="UUID" value={appointment.uuid} />
                            <Row label="Created At" value={appointment.created_at} />
                        </dl>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}