<?php
namespace App\Http\Controllers;
use App\Models\Expense;
use Illuminate\Http\Request;

class ExpenseController extends Controller {
  public function index() { return Expense::all(); }
  public function store(Request $r) {
    $data = $r->validate(['type'=>'required','date'=>'required|date','amount'=>'required|numeric','receipt_image'=>'nullable|image|max:2048']);
    if($r->hasFile('receipt_image')) {
      $data['receipt_image']=$r->file('receipt_image')->store('receipts');
    }
    return Expense::create($data);
  }
  public function show(Expense $expense) { return $expense; }
  public function update(Request $r, Expense $e) { /* similar */ }
  public function destroy(Expense $expense) { $expense->delete(); return response()->noContent(); }
}
