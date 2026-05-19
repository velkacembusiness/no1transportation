<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    public function index()
    {
        $appointments = Appointment::latest()->paginate(15);

        return Inertia::render('Admin/Appointments/Index', compact('appointments'));
    }

    public function show(Appointment $appointment)
    {
        return Inertia::render('Admin/Appointments/Show', compact('appointment'));
    }

    public function destroy(Appointment $appointment)
    {
        $appointment->delete();

        return back()->with('success', 'Appointment deleted.');
    }
}