<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Service;
use App\Models\Activity;
use App\Models\Faq;
use App\Models\Payer;
use Carbon\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $today     = Carbon::today();
        $thisMonth = Carbon::now()->startOfMonth();

        $stats = [
            'appointments'   => Appointment::count(),
            'today'          => Appointment::whereDate('date_of_ride', $today)->count(),
            'upcoming'       => Appointment::whereDate('date_of_ride', '>', $today)->count(),
            'this_month'     => Appointment::whereDate('date_of_ride', '>=', $thisMonth)->count(),
            'services'       => Service::count(),
            'activities'     => Activity::count(),
            'faqs'           => Faq::count(),
            'payers'         => Payer::count(),
        ];

        $recentAppointments = Appointment::latest()->take(8)->get([
            'id', 'patient_name', 'date_of_ride', 'time_of_ride',
            'type_of_service', 'phone_number', 'pick_up_location',
        ]);

        return Inertia::render('Admin/Dashboard', compact('stats', 'recentAppointments'));
    }
}