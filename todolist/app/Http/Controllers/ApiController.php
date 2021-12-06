<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Gate;
use App\Http\Traits\JsonTrait;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\TaskCategory;
use App\Models\TaskList;
use JWTAuth;

use function PHPUnit\Framework\isNull;

class ApiController extends Controller
{
    use JsonTrait;

    public function __construct()
    {
        $this->middleware('auth.jwt', ['except' => [
            'login',
            'register',
            // 'retrieveData',
            // 'newCategory',
            // 'retrieveCategory',
            // 'deleteCategory',
            // 'newTask',
            // 'retrieveTask',
            // 'completeTask',
            // 'incompleteTask',
            // 'deleteTask',
            'editTask',
        ]]);
    }

    public function jsonResponse($data, $message = '', $code = 200)
    {
        return response()->json([
            'status' => ($code != 200) ? false : true,
            'code' => $code,
            'data' => $data,
            'message' => $message
        ], $code);
    }

    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|between:2,100',
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = User::create(array_merge(
            $validator->validated(),
            ['password' => bcrypt($request->password)]
        ));

        return response()->json([
            'message' => 'Congrats! User has successfully been registered',
            'user' => $user
        ], 201);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return $this->jsonResponse(
                $validator->errors(),
                'Invalid Input Parameters',
                422
            );
            // return response()->json([
            //     'message' => 'Please insert registered email and password'
            // ]);
            // response()->json($validator->errors(), 422);
        }

        if (!$token = JWTAuth::attempt($validator->validated())) {
            // return response()->json(['error' => 'Unauthorized'], 401);
            return $this->jsonResponse(
                '',
                'Unauthorised',
                401
            );
        }

        return $this->createNewToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function dashboard()
    {
        return response()->json(auth()->user());
    }
    //retrieve ALL data
    public function retrieveData($id){
        $data = DB::table('task_categories')
        ->join('task_lists', 'task_categories.id','=','task_lists.category_id')
        ->where('task_categories.user_id','=',$id)
        ->get();
        return $data;
    }

    //add new category
    public function newCategory($id, Request $request)
    {
        $category = new TaskCategory;
        $category->user_id = $id;
        $category->task_category = $request->task_category;
        $category->status = 1;
        $category->save();
        return response()->json([
            'message' => "New category has been added"
        ], 201);
    }

    //show category
    public function retrieveCategory($id){
        $category = DB::table('task_categories')
        ->where('user_id','=', $id)
        ->get();
        return $category;
    }

    //delete category and task together
    public function deleteCategory($id, Request $request)
    {
            $task_list_query = TaskList::where('category_id','=',$id)->update(['status'=>0]);

            $category_query = TaskCategory::where('id','=',$id)->update(['status'=>0]);

            return response()->json([
                'message' => "The category has been deleted",
                'delete_query' => $task_list_query, 
                'delete_category' => $category_query,
                // 'categories_status' => 0
            ], 201);
        
    }

    

    //add new task
    public function newTask($id, Request $request)
    {
        $task = new TaskList;
        $task->todo_tasks = $request->todo_tasks;
        $task->category_id = $id;
        $task->status = 1;
        $task->save();
        return response()->json([
            'message' => "New task has been added"
        ], 201);
    }

    //show task
    public function retrieveTask($id){
        $task = DB::table('task_lists')
        ->where('category_id','=',$id)->where('status','=', 1)
        ->get();
        return $task;
    }

    //completed task
    public function completeTask(Request $request, $id)
    {
        if (TaskList::where('id', $id)->exists()) {
            $task = TaskList::find($id);
            $task->todo_tasks = is_null($request->todo_tasks) ? $task->todo_tasks : $request->todo_tasks;
            $task->status = 2;
            $task->save();
            return response()->json([
                "message" => "Task has been completed."
            ], 200);
        } else {
            return response()->json([
                "message" => "Task Not Found."
            ], 404);
        }
    }

    //incomplete task
    public function incompleteTask(Request $request, $id)
    {
        if (TaskList::where('id', $id)->exists()) {
            $task = TaskList::find($id);
            $task->todo_tasks = is_null($request->todo_tasks) ? $task->todo_tasks : $request->todo_tasks;
            $task->status = 1;
            $task->save();
            return response()->json([
                "message" => "Undo task complete."
            ], 200);
        } else {
            return response()->json([
                "message" => "Task Not Found."
            ], 404);
        }
    }

    //deletetask
    public function deleteTask(Request $request, $id)
    {
        if (TaskList::where('id', $id)->exists()) {
            $task = TaskList::find($id);
            $task->todo_tasks = is_null($request->todo_tasks) ? $task->todo_tasks : $request->todo_tasks;
            $task->status = 0;
            $task->save();
            return response()->json([
                "message" => "Task has been removed."
            ], 200);
        } else {
            return response()->json([
                "message" => "Task Not Found."
            ], 404);
        }
    }

    //edit task name
    public function editTask(Request $request, $id)
    {
        if (TaskList::where('id', $id)->exists()) {
            $task = TaskList::find($id);
            $task->todo_tasks = is_null($request->todo_tasks) ? $task->todo_tasks : $request->todo_tasks;
            $task->status = 1;
            $task->save();
            return response()->json([
                "message" => "Task has been edited."
            ], 200);
        } else {
            return response()->json([
                "message" => "Task Not Found."
            ], 404);
        }
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'User successfully signed out']);
    }

    protected function createNewToken($token)
    {
        // return response()->json([
        // 'access_token' => $token,
        // 'token_type' => 'bearer',
        // 'expires_in' => auth('api')->factory()->getTTL() * 60,
        // 'user' => auth()->user()
        // ]);
        return $this->jsonResponse(
            [
                'access_token' => $token,
                'token_type' => 'bearer',
                'expires_in' => auth('api')->factory()->getTTL() * 60,
                'user' => auth()->user()
            ],
            'Valid Input Parameters',
            200
        );
    }
}
