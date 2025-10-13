<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoiceItem extends Model {
    use HasFactory;
    protected $fillable = ['invoice_id','service_id','quantity','unit_price'];
}
