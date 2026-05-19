<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\About;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function edit()
    {
        $about = About::first() ?? new About();

        return Inertia::render('Admin/About/Edit', compact('about'));
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'company' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
            'fax' => 'nullable',
            'cell' => 'nullable',
            'address' => 'required',
            'maps' => 'nullable',
            'linkedin' => 'nullable|url',
            'instagram' => 'nullable|url',
            'twitter' => 'nullable|url',
            'facebook' => 'nullable|url',
            'link_video' => 'nullable|url',
            'content' => 'required',
        ]);

        $about = About::first();
        if ($about) {
            $about->update($data);
        } else {
            About::create($data);
        }

        return redirect()->route('admin.about.edit')->with('success', 'Company information updated.');
    }
}