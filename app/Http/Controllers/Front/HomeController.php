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

        // Generate a new math captcha each time the page loads
        [$question, $answer] = self::generateCaptcha();
        session(['captcha_answer' => $answer]);

        return Inertia::render('Contact', [
            'abouts'          => $abouts,
            'captchaQuestion' => $question,
        ]);
    }

    public static function generateCaptcha(): array
    {
        $a = rand(2, 12);
        $b = rand(2, 12);
        return ["{$a} + {$b}", $a + $b];
    }

    public function booking()
    {
        $abouts = About::first();
        $activities = Activity::whereIsActive(true)->get();
        $payers = Payer::all();

        [$question, $answer] = self::generateCaptcha();
        session(['captcha_answer' => $answer]);

        return Inertia::render('Booking', [
            'abouts'          => $abouts,
            'activities'      => $activities,
            'payers'          => $payers,
            'captchaQuestion' => $question,
        ]);
    }
}