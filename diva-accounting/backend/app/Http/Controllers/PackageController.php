<?php
namespace App\Http\Controllers;
use App\Models\Package;
use Illuminate\Http\Request;

class PackageController extends Controller {
    public function index() {
        return Package::with('items.service')->get();
    }
    public function store(Request $req) {
        $data = $req->validate([
            'name'=>'required','description'=>'nullable','price'=>'required|numeric','service_ids'=>'required|array'
        ]);
        $pkg = Package::create($data);
        $pkg->items()->createMany(
            collect($data['service_ids'])->map(fn($id)=>['service_id'=>$id])->toArray()
        );
        return $pkg->load('items.service');
    }
    public function show(Package $package) {
        return $package->load('items.service');
    }
    public function update(Request $req, Package $package) {
        $data = $req->validate([
            'name'=>'sometimes|required','description'=>'nullable','price'=>'sometimes|required|numeric','service_ids'=>'sometimes|required|array'
        ]);
        $package->update($data);
        if(isset($data['service_ids'])) {
            $package->items()->delete();
            $package->items()->createMany(
                collect($data['service_ids'])->map(fn($id)=>['service_id'=>$id])->toArray()
            );
        }
        return $package->load('items.service');
    }
    public function destroy(Package $package) {
        $package->delete();
        return response()->noContent();
    }
}
