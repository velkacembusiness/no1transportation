<?php

namespace Database\Seeders;

use App\Models\About;
use Illuminate\Database\Seeder;

class AboutSeeder extends Seeder
{
    public function run(): void
    {
        if (About::count() === 0) {
            About::create([
                'company'    => 'NO 1 Transportation LLC',
                'email'      => 'admin@no1transportation.com',
                'phone'      => '(000) 000-0000',
                'fax'        => null,
                'cell'       => null,
                'address'    => '123 Main Street, New Orleans, LA 70001',
                'maps'       => null,
                'linkedin'   => null,
                'instagram'  => null,
                'twitter'    => null,
                'facebook'   => null,
                'link_video' => null,
                'content'    => '<p>NO 1 Transportation LLC is your trusted partner in Non-Emergency Medical Transportation (NEMT). We provide reliable and compassionate transport services for individuals who require assistance getting to and from medical appointments, therapy sessions, and other essential destinations.</p>',
            ]);
        }
    }
}