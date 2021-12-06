<?php

use App\Http\Controllers\ApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/login', [ApiController::class, 'login'])->name('api.login');
Route::post('/register',[ApiController::class, 'register']);

// Route::get('/retrieve/{id}',[ApiController::class, 'retrieveData']);

// Route::get('getlist/{id}', [ApiController::class,'retrieveCategory']);
// Route::post('/createlist/{id}', [ApiController::class,'newCategory']);
// Route::put('/deletelist/{id}', [ApiController::class,'deleteCategory']);

// Route::get('/gettask/{id}',[ApiController::class, 'retrieveTask']);
// Route::post('/newTask/{id}', [ApiController::class,'newTask']);
// Route::put('/completedtask/{id}',[ApiController::class, 'completeTask']);
// Route::put('/incompletetask/{id}',[ApiController::class, 'incompleteTask']);
// Route::put('/deletetask/{id}',[ApiController::class, 'deleteTask']);
Route::put('/edittask/{id}',[ApiController::class, 'editTask']);

Route::group([
    'middleware' => 'auth.jwt',
], function(){
    // Route::post('/dashboard', [ApiController::class, 'dashboard']);
    // Route::post('/users', [ApiController::class, 'users']);
    Route::post('/dashboard', [ApiController::class, 'dashboard']);
    Route::post('/logout', [ApiController::class, 'logout']);

    Route::get('/retrieve/{id}',[ApiController::class, 'retrieveData']);

    Route::get('getlist/{id}', [ApiController::class,'retrieveCategory']);
    Route::post('/createlist/{id}', [ApiController::class,'newCategory']);
    Route::put('/deletelist/{id}', [ApiController::class,'deleteCategory']);

    Route::get('/gettask/{id}',[ApiController::class, 'retrieveTask']);
    Route::post('/newTask/{id}', [ApiController::class,'newTask']);
    Route::put('/deletetask/{id}',[ApiController::class, 'deleteTask']);
    Route::put('/completedtask/{id}',[ApiController::class, 'completeTask']);
    Route::put('/incompletetask/{id}',[ApiController::class, 'incompleteTask']);
});