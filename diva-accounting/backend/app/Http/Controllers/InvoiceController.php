<?php
namespace App\Http\Controllers;
use App\Models\{Invoice,InvoiceItem};
use Illuminate\Http\Request;
use PDF;

class InvoiceController extends Controller {
  public function index() { return Invoice::with('items.service','customer')->get(); }
  public function store(Request $r) {
    $data = $r->validate([
      'customer_id'=>'required|exists:customers,id','date'=>'required|date','currency'=>'required',
      'discount'=>'numeric','tax_rate'=>'numeric','items'=>'required|array',
      'items.*.service_id'=>'required|exists:services,id','items.*.quantity'=>'required|integer','items.*.unit_price'=>'required|numeric'
    ]);
    $total = collect($data['items'])->reduce(fn($sum,$i)=>$sum + $i['quantity']*$i['unit_price'],0);
    $total = $total * (1 + $data['tax_rate']/100) - $data['discount'];
    $inv = Invoice::create(array_merge($data,['total'=>$total]));
    foreach($data['items'] as $it) { $inv->items()->create($it); }
    return $inv->load('items.service','customer');
  }
  public function pdf(Invoice $invoice) {
    $invoice->load('items.service','customer');
    $pdf = PDF::loadView('invoices.template', compact('invoice'));
    return $pdf->download("invoice_{$invoice->id}.pdf");
  }
  public function update(Request $r, Invoice $invoice) { /* similar to store */ }
  public function destroy(Invoice $invoice) { $invoice->delete(); return response()->noContent(); }
}
