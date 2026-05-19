<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\About;
use App\Models\Activity;
use App\Models\Faq;
use App\Models\Payer;
use App\Models\Service;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $services = Service::whereIsActive(true)->inRandomOrder()->take(4)->get();
        $faqs = Faq::whereIsActive(true)->get();
        $abouts = About::first();

        return Inertia::render('Home', compact('services', 'faqs', 'abouts'));
    }

    public function about()
    {
        $abouts = About::first();

        return Inertia::render('About', compact('abouts'));
    }

    public function services()
    {
        $services = Service::whereIsActive(true)->paginate(6);
        $abouts = About::first();

        return Inertia::render('Services', [
            'services' => $services,
            'abouts' => $abouts,
        ]);
    }

    public function showService(Service $service)
    {
        $abouts = About::first();
        $otherServices = Service::whereIsActive(true)->where('id', '!=', $service->id)->get();

        return Inertia::render('ServiceDetail', compact('service', 'otherServices', 'abouts'));
    }

    public function contact()
    {
        $abouts = About::first();

        return Inertia::render('Contact', compact('abouts'));
    }

    public function booking()
    {
        $abouts = About::first();
        $activities = Activity::whereIsActive(true)->get();
        $payers = Payer::all();

        return Inertia::render('Booking', compact('abouts', 'activities', 'payers'));
    }
}