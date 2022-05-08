<?php

namespace App\Http\Controllers\Movie\User\Watchlist;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;

use App\Models\Watchlist;

class IndexController extends Controller
{

    // index
    public function index(){
        $data = Watchlist::where('user_id',Auth::user()->id)->get();

        return response()->json($data,200);
    }


    // store
    public function store(Request $request, $id){
        $find = Watchlist::where('user_id', Auth::user()->id)->where('movie_id', $id)->first();
        if($find){
            // Watchlist::where('user_id', Auth::user()->id)->where('movie_id', $id)->delete();
            return response()->json(['msg'=>'Already in Watchlist', 'icon'=>'warning']);
        }else{
            $data     = new Watchlist();
            $data->movie_id = $request->id;
            $data->user_id = Auth::user()->id;
            $success  = $data->save();

            if($success){
                return response()->json(['msg'=>'Added Successfully &#128513;', 'icon'=>'success']);
            }
        }

        

    }

    public function remove(Request $request,$id){
        $data = Watchlist::where('user_id', Auth::user()->id)->where('movie_id', $id)->delete();
        //$success = $data->delete();
        if($data){
            return response()->json(['msg'=>'Remove From Watchlist &#128513;', 'icon'=>'success'], 200);
            
        }
        
    }

}
