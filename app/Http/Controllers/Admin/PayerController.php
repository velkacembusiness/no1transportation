<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PayerController extends Controller
{
    public function index()
    {
        $payers = Payer::latest()->paginate(15);

        return Inertia::render('Admin/Payers/Index', compact('payers'));
    }

    public function create()
    {
        return Inertia::render('Admin/Payers/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'rider_payer' => 'required',
        ]);

        Payer::create($data);

        return redirect()->route('admin.payers.index')->with('success', 'Payer created successfully.');
    }

    public function edit(Payer $payer)
    {
        return Inertia::render('Admin/Payers/Edit', compact('payer'));
    }

    public function update(Request $request, Payer $payer)
    {
        $data = $request->validate([
            'rider_payer' => 'required',
        ]);

        $payer->update($data);

        return redirect()->route('admin.payers.index')->with('success', 'Payer updated successfully.');
    }

    public function destroy(Payer $payer)
    {
        $payer->delete();

        return back()->with('success', 'Payer deleted.');
    }
}