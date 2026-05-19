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
        $contact = $request->validate([
            'full_name' => 'required',
            'phone_number' => 'required',
            'email_address' => ['required', 'email', 'indisposable', new ValidEmailDns()],
            'message' => 'required|min:5',
            'g-recaptcha-response' => [new ReCaptcha()],
        ]);

        Mail::to('contact@mnatransportation.com')->queue(new ContactForm($contact));

        return redirect()->route('home')->with('success', '✅ We have received your message and will respond as soon as possible!');
    }
}