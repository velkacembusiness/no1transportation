<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Service;
use App\Models\Activity;
use App\Models\Faq;
use App\Models\Payer;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'appointments' => Appointment::count(),
            'services' => Service::count(),
            'activities' => Activity::count(),
            'faqs' => Faq::count(),
            'payers' => Payer::count(),
        ];

        $recentAppointments = Appointment::latest()->take(5)->get();

        return Inertia::render('Admin/Dashboard', compact('stats', 'recentAppointments'));
    }
}