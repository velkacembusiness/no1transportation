<?php

namespace App\Http\Controllers;

use App\Mail\ContactForm;
use App\Rules\ReCaptcha;
use App\Rules\ValidEmailDns;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(Request $request)
    {
//        dd($request);
        $contact = $request->validate([
            'full_name'             => 'required|string|max:100',
            'phone_number'          => ['required', 'regex:/^\(\d{3}\) \d{3}-\d{4}$/'],
            'email_address'         => ['required', 'email', 'indisposable', new ValidEmailDns()],
            'message'               => 'required|min:5|max:2000',
//            'g-recaptcha-response'  => [new ReCaptcha()],
        ], [
            'phone_number.required' => 'The phone number is required.',
            'phone_number.regex'    => 'Please enter a valid phone number in the format (555) 555-5555.',
        ]);

        Mail::to('contact@no1transportation.com')->queue(new ContactForm($contact));

        return redirect()->route('contact')->with('success', 'Your message has been sent successfully! We will get back to you within 24 hours.');
    }
}
