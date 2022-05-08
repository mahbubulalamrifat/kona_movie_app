<?php

namespace App\Http\Controllers\Movie\User\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class IndexController extends Controller
{
    //login
    public function login(Request $request){
            
        // Validations
        $this->validate($request,[
            'email' => 'required|string',
            'password' => 'required|string|max:20',
        ]);

        if(Auth::atteempt(['email' => $request->email, 'password' => $request->password])){
            return response()->json(['msg'=>'You are logged in'],200);
        }else{
            return response()->json(['msg'=>'Invalid Credential'],422);
        }

        // $user = User::where('email', $request->email)->first();

        // if(!Hash::check($password, $user->password)){
        //     return response()->json([
        //         'msg' => 'Invalid Credential !!'
        //     ], 422);
        // }else{
        //     return response()->json($response, 200);
        // }



        

    }



    //registration
    public function register(Request $request){
            
        // Validations

        $this->validate($request,[
            'email' => 'required|email|unique:users',
            'password' => 'required|string|max:20',
            'username' => 'required|string|max:20',
        ]);

        $data = new user();

        $data->email      = $request->email;
        $data->password   = Hash::make($request->password);
        $data->name       = $request->username;
        $success           = $data->save();

        if($success){
            return response()->json(['msg'=>'Registered Successfully &#128513;', 'icon'=>'success'], 200);
        }else{
            return response()->json([
                'msg' => 'Something Went Wrong !!'
            ], 422);
        }

    }
}
