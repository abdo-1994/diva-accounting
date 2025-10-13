<?php
namespace App\Http\Controllers;
use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller {
  public function index() { return Customer::all(); }
  public function store(Request $r) {
    $data = $r->validate(['name'=>'required','email'=>'required|email|unique:customers','phone'=>'nullable','notes'=>'nullable']);
    return Customer::create($data);
  }
  public function show(Customer $customer) { return $customer; }
  public function update(Request $r, Customer $c) {
    $data = $r->validate(['name'=>'sometimes|required','email'=>'sometimes|required|email|unique:customers,email,'.$c->id,'phone'=>'nullable','notes'=>'nullable']);
    $c->update($data);
    return $c;
  }
  public function destroy(Customer $customer) { $customer->delete(); return response()->noContent(); }
}
