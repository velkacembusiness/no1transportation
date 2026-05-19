<?php

namespace App\Http\Controllers;

use App\Mail\BookingForm;
use App\Mail\BookingPatientForm;
use App\Models\Activity;
use App\Models\Appointment;
use App\Models\Payer;
use App\Rules\ReCaptcha;
use App\Rules\ValidEmailDns;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rule;
use Spatie\GoogleCalendar\Event;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'date_of_ride' => ['required', Rule::date()->afterToday()],
            'patient_name' => 'required',
            'email_address' => ['required', 'email', 'indisposable', new ValidEmailDns()],
            'patient_weight' => 'required|numeric',
            'phone_number' => 'required',
            'time_of_ride' => 'required',
            'appointment_time' => 'required',
            'return_time' => 'required',
            'pick_up_location' => 'required',
            'drop_off_location' => 'required',
            'type_of_service' => ['required', 'exists:activities,id'],
            'payer_ride' => ['required', 'exists:payers,id'],
            'special_instructions' => 'nullable',
            'confirmation' => 'accepted',
            'g-recaptcha-response' => [new ReCaptcha()],
        ]);

        $time_of_ride = Carbon::createFromFormat('h:i A', $request->time_of_ride);
        $appointment_time = Carbon::createFromFormat('h:i A', $request->appointment_time);
        $return_time = Carbon::createFromFormat('h:i A', $request->return_time);

        if (! ($time_of_ride < $appointment_time && $appointment_time < $return_time)) {
            return back()->withErrors(['times' => 'The times must be ordered: Time of ride < Appointment time < Return time.'])->withInput();
        }

        $name = $request->patient_name.' MT'.now();

        $type_of_service = Activity::find($request->type_of_service)?->title;
        $rider_payer = Payer::find($request->payer_ride)?->rider_payer;

        $appointment = Appointment::create([
            'uuid' => $name,
            'patient_name' => $request->patient_name,
            'email_address' => $request->email_address,
            'patient_weight' => $request->patient_weight,
            'phone_number' => $request->phone_number,
            'date_of_ride' => $request->date_of_ride,
            'time_of_ride' => date('H:i:s', strtotime($request->time_of_ride)),
            'appointment_time' => date('H:i:s', strtotime($request->appointment_time)),
            'return_time' => date('H:i:s', strtotime($request->return_time)),
            'pick_up_location' => $request->pick_up_location,
            'drop_off_location' => $request->drop_off_location,
            'type_of_service' => $type_of_service,
            'special_instructions' => $request->special_instructions,
            'rider_payer' => $rider_payer,
        ]);

        $startTime = Carbon::parse($request->date_of_ride.' '.$appointment->time_of_ride, 'America/New_York');
        $endTime = (clone $startTime)->addHour();

        $contact = [
            'uuid' => $name,
            'patient_name' => $request->patient_name,
            'email_address' => $request->email_address,
            'patient_weight' => $request->patient_weight,
            'phone_number' => $request->phone_number,
            'date_of_ride' => $request->date_of_ride,
            'time_of_ride' => date('h:i A', strtotime($appointment->time_of_ride)),
            'appointment_time' => date('h:i A', strtotime($appointment->appointment_time)),
            'return_time' => date('h:i A', strtotime($appointment->return_time)),
            'pick_up_location' => $request->pick_up_location,
            'drop_off_location' => $request->drop_off_location,
            'type_of_service' => $type_of_service,
            'rider_payer' => $rider_payer,
            'special_instructions' => $request->special_instructions,
        ];

        Event::create([
            'name' => $name,
            'description' => "Patient email: {$appointment->email_address}\nPatient weight: {$appointment->patient_weight}\nPhone: {$appointment->phone_number}\nPick up time: {$contact['time_of_ride']}\nAppointment time: {$contact['appointment_time']}\nReturn time: {$contact['return_time']}\nPick up: {$appointment->pick_up_location}\nDrop off: {$appointment->drop_off_location}\nService: {$appointment->type_of_service}\nPayer: {$appointment->rider_payer}\nNotes: {$appointment->special_instructions}",
            'startDateTime' => $startTime,
            'endDateTime' => $endTime,
        ]);

        Mail::to('contact@mnatransportation.com')->queue(new BookingForm($contact));
        Mail::to($appointment->email_address)->queue(new BookingPatientForm($contact));

        return redirect()->route('home')->with('success', '✅ Your Appointment was booked successfully! We have sent your booking information to your email address.');
    }
}