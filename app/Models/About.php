<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class About extends Model
{
    protected $fillable = [
        'company',
        'linkedin',
        'instagram',
        'twitter',
        'facebook',
        'link_video',
        'content',
        'address',
        'maps',
        'email',
        'phone',
        'fax',
        'cell',
    ];
}
