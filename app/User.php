<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable {
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function permissions() {
        return $this->hasMany('App\Permission');
    }

    public static function userWithRole($user_id) {
        return DB::table('users as u')
            ->select('u.*', 'r.role', 'p.slug')
            ->join('roles as r', 'u.user_role', '=', 'r.id')
            ->join('permissions as p', 'u.id', '=', 'p.user_id')
            ->where('u.id', '=', "{$user_id}")
            ->get()
            ->toArray();
    }

    public function offer() {
        return $this->hasMany('App\Offer');
    }

}
