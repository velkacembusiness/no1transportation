<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Front\HomeController;
use App\Mail\ContactForm;
use App\Rules\ValidEmailDns;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $contact = $request->validate([
            'full_name'      => 'required|string|max:100',
            'phone_number'   => ['required', 'regex:/^\(\d{3}\) \d{3}-\d{4}$/'],
            'email_address'  => ['required', 'email', 'indisposable', new ValidEmailDns()],
            'message'        => 'required|min:5|max:2000',
            'captcha_answer' => ['required', 'integer'],
        ], [
            'phone_number.required'   => 'The phone number is required.',
            'phone_number.regex'      => 'Please enter a valid phone number in the format (555) 555-5555.',
            'captcha_answer.required' => 'Please answer the security question.',
        ]);

        // Validate against session
        if ((int) $request->input('captcha_answer') !== (int) session('captcha_answer')) {
            // Regenerate captcha so user gets a new question
            [$question, $answer] = HomeController::generateCaptcha();
            session(['captcha_answer' => $answer]);

            return back()
                ->withErrors(['captcha_answer' => 'Incorrect answer. A new question has been generated.'])
                ->withInput();
        }

        session()->forget('captcha_answer');

        Mail::to('contact@no1transportation.com')->queue(new ContactForm($contact));

        return redirect()->route('contact')->with('success', 'Your message has been sent successfully! We will get back to you within 24 hours.');
    }

    public function refreshCaptcha()
    {
        [$question, $answer] = HomeController::generateCaptcha();
        session(['captcha_answer' => $answer]);

        return response()->json(['question' => $question]);
    }
}