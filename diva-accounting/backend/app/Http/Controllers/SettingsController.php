<?php
namespace App\Http\Controllers;
use App\Models\CompanySetting;
use Illuminate\Http\Request;

class SettingsController extends Controller {
  public function index(){
    return CompanySetting::all()->pluck('value','key');
  }
  public function update(Request $req){
    foreach($req->all() as $key=>$value){
      CompanySetting::updateOrCreate(['key'=>$key],['value'=>$value]);
    }
    return response()->json(['message'=>'Settings updated']);
  }
}
