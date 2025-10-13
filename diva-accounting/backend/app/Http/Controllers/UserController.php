<?php
namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class UserController extends Controller {
  public function index(){ return User::with('roles')->get(); }
  public function store(Request $r){
    $data = $r->validate(['name'=>'required','email'=>'required|email|unique:users','password'=>'required|min:6','roles'=>'required|array']);
    $data['password']=bcrypt($data['password']);
    $user = User::create($data);
    $user->syncRoles($r->input('roles'));
    return $user->load('roles');
  }
  public function update(Request $r, User $user){
    $data = $r->validate(['name'=>'sometimes|required','email'=>"sometimes|required|email|unique:users,email,{$user->id}",'password'=>'nullable|min:6','roles'=>'sometimes|required|array']);
    if(!empty($data['password'])) $data['password']=bcrypt($data['password']); else unset($data['password']);
    $user->update($data);
    if($r->has('roles')) $user->syncRoles($data['roles']);
    return $user->load('roles');
  }
  public function destroy(User $user){ $user->delete(); return response()->noContent(); }
}
