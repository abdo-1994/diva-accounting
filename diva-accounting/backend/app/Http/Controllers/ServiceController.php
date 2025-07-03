<?php
namespace App\Http\Controllers;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller {
    public function index() { return Service::all(); }
    public function store(Request $req) {
        $data = $req->validate(['name'=>'required','category'=>'required','price'=>'required|numeric']);
        return Service::create($data);
    }
    public function update(Request $req, Service $service) {
        $service->update($req->only('name','category','price'));
        return $service;
    }
    public function destroy(Service $service) {
        $service->delete();
        return response()->noContent();
    }
}
