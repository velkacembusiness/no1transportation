<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->nullable();
            $table->string('patient_name');
            $table->string('email_address');
            $table->double('patient_weight');
            $table->string('phone_number');
            $table->date('date_of_ride');
            $table->time('time_of_ride');
            $table->time('appointment_time');
            $table->time('return_time');
            $table->string('pick_up_location');
            $table->string('drop_off_location');
            $table->string('type_of_service');
            $table->text('special_instructions')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
