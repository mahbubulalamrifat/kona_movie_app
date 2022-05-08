<?php

use Illuminate\Support\Facades\Route;



// Auth Route Start
Route::namespace('App\Http\Controllers')->group(function(){

    // // Movie Start
    Route::namespace('Movie')->group(function(){

        // User
        Route::namespace('User')->group(function(){

            Route::namespace('Auth')->prefix('auth')->group(function(){
                Route::post('/login', 'IndexController@login');
                Route::post('/register', 'IndexController@register');
                Route::post('/logout', 'IndexController@logout');
            });

            Route::namespace('Watchlist')->prefix('watchlist')->group(function(){
                Route::get('/index', 'IndexController@index');
                Route::post('/store/{id}', 'IndexController@store');
                Route::delete('/remove/{id}', 'IndexController@remove');
            });


            Route::get('{any?}', 'IndexController@index');
        });
    });
    // // Movie End

});