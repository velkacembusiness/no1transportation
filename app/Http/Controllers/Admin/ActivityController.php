<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActivityController extends Controller
{
    public function index()
    {
        $activities = Activity::latest()->paginate(15);

        return Inertia::render('Admin/Activities/Index', compact('activities'));
    }

    public function create()
    {
        return Inertia::render('Admin/Activities/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|unique:activities,title',
            'description' => 'nullable',
            'is_active' => 'boolean',
        ]);

        Activity::create($data);

        return redirect()->route('admin.activities.index')->with('success', 'Activity created successfully.');
    }

    public function edit(Activity $activity)
    {
        return Inertia::render('Admin/Activities/Edit', compact('activity'));
    }

    public function update(Request $request, Activity $activity)
    {
        $data = $request->validate([
            'title' => 'required|unique:activities,title,'.$activity->id,
            'description' => 'nullable',
            'is_active' => 'boolean',
        ]);

        $activity->update($data);

        return redirect()->route('admin.activities.index')->with('success', 'Activity updated successfully.');
    }

    public function destroy(Activity $activity)
    {
        $activity->delete();

        return back()->with('success', 'Activity deleted.');
    }
}