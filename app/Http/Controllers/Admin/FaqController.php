<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FaqController extends Controller
{
    public function index()
    {
        $faqs = Faq::latest()->paginate(15);

        return Inertia::render('Admin/Faqs/Index', compact('faqs'));
    }

    public function create()
    {
        return Inertia::render('Admin/Faqs/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'question' => 'required',
            'answer' => 'required',
            'is_active' => 'boolean',
        ]);

        Faq::create($data);

        return redirect()->route('admin.faqs.index')->with('success', 'FAQ created successfully.');
    }

    public function edit(Faq $faq)
    {
        return Inertia::render('Admin/Faqs/Edit', compact('faq'));
    }

    public function update(Request $request, Faq $faq)
    {
        $data = $request->validate([
            'question' => 'required',
            'answer' => 'required',
            'is_active' => 'boolean',
        ]);

        $faq->update($data);

        return redirect()->route('admin.faqs.index')->with('success', 'FAQ updated successfully.');
    }

    public function destroy(Faq $faq)
    {
        $faq->delete();

        return back()->with('success', 'FAQ deleted.');
    }
}