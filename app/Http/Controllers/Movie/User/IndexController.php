<?php

namespace App\Http\Controllers\Movie\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use Auth;
use DB;

class IndexController extends Controller
{
    public function Index(){


        return view('movie.user.index');
    }
}
