<?php
namespace App\Http\Controllers\Movie\User\Auth;
use Illuminate\Http\Request; 
use App\Http\Controllers\Controller; 
use Illuminate\Support\Facades\Auth;
use Session;
use App\Models\User; 
use Validator;
use Illuminate\Support\Str;
use Hash;
class IndexController extends Controller 
{
  
    private $apiToken;
    public function __construct()
        {
        $this->apiToken = uniqid(base64_encode(Str::random(40)));
        }
    /** 
     * 
     * @return \Illuminate\Http\Response 
     */ 
    

    public function login(Request $request){

        if(Auth::attempt(['email' => $request->email, 'password' => $request->password])){ 
            $user = Auth::user(); 
            //Setting login response 
            $success['token'] = $this->apiToken;
            $success['name'] =  $user->name;
            return response()->json([
                'status' => 'success',
                'data' => $success,
                'msg'=>'You are logged in'
            ],200); 
        } else { 
            return response()->json([
                'status' => 'error',
                'data' => 'Unauthorized Access',
                'msg'=>'Invalid Credential'
            ],422); 
        }

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



  // logout
    public function logout(){
        Session::flush();
        Auth::logout();

        return response()->json([
            'status' => 'success',
            'msg'=>'Successfully logout'
        ],200); 
    }
}