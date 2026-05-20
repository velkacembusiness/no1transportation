<?php

use App\Http\Controllers\Admin\AboutController;
use App\Http\Controllers\Admin\ActivityController;
use App\Http\Controllers\Admin\AppointmentController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\FaqController;
use App\Http\Controllers\Admin\PayerController;
use App\Http\Controllers\Admin\ServiceController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\Front\HomeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

// ─── Public Front-end ─────────────────────────────────────────────────────────
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/about-us', [HomeController::class, 'about'])->name('about');
Route::get('/our-services', [HomeController::class, 'services'])->name('services');
Route::get('/service/{service:slug}', [HomeController::class, 'showService'])->name('service.show');
Route::get('/contact', [HomeController::class, 'contact'])->name('contact');
Route::get('/book-appointment', [HomeController::class, 'booking'])->name('booking');

// ─── Form Submissions ──────────────────────────────────────────────────────────
Route::post('/booking', [BookingController::class, 'store'])->name('booking.store');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
Route::get('/captcha/refresh', [ContactController::class, 'refreshCaptcha'])->name('captcha.refresh');

// ─── Auth (Breeze) ─────────────────────────────────────────────────────────────
require __DIR__.'/auth.php';


// ─── Admin Panel (protected by auth) ──────────────────────────────────────────
Route::prefix('admin')->name('admin.')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('appointments', AppointmentController::class)->only(['index', 'show', 'destroy']);
    Route::resource('services', ServiceController::class);
    Route::resource('activities', ActivityController::class);
    Route::resource('faqs', FaqController::class);
    Route::resource('payers', PayerController::class);

    Route::get('about', [AboutController::class, 'edit'])->name('about.edit');
    Route::put('about', [AboutController::class, 'update'])->name('about.update');
});

// ─── Profile (Breeze) ──────────────────────────────────────────────────────────
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});