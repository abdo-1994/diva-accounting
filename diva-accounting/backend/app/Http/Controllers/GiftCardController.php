<?php
namespace App\Http\Controllers;
use App\Models\{GiftCard,GiftCardTransaction};
use Illuminate\Http\Request;

class GiftCardController extends Controller {
  public function index() { return GiftCard::all(); }
  public function store(Request $r) {
    $d = $r->validate(['code'=>'required|unique:gift_cards','initial_value'=>'required|numeric','expiry_date'=>'required|date','customer_id'=>'nullable|exists:customers,id']);
    $d['balance']=$d['initial_value']; return GiftCard::create($d);
  }
  public function show(GiftCard $gift_card) { return $gift_card; }
  public function charge(Request $r, GiftCard $card) {
    $data = $r->validate(['amount'=>'required|numeric','invoice_id'=>'nullable|exists:invoices,id','date'=>'required|date']);
    if($card->balance < $data['amount']) return response()->json(['error'=>'Insufficient'],422);
    $card->decrement('balance',$data['amount']);
    return $card->transactions()->create($data);
  }
  public function update(Request $r, GiftCard $gift_card) { /* ... */ }
  public function destroy(GiftCard $gift_card) { $gift_card->delete(); return response()->noContent(); }
}
