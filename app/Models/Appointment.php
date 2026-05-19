<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
//    protected $fillable = ['ticket','patient_name','email_address','patient_weight','phone_number','date_of_ride','time_of_ride','appointment_time','return_time','pick_up_location','drop_off_location','type_of_service','special_instructions','rider_payer'];
    protected $guarded = [];

    protected $casts = [
        'date_of_ride' => 'date:Y-m-d'
    ];

    protected function dateOfRide(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) =>  Carbon::parse($value)->format('m/d/Y'),
            set: fn (string $value) => Carbon::parse($value)->format('Y-m-d'),
        );
    }
}
