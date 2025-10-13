<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GiftCardTransaction extends Model {
    use HasFactory;
    protected $fillable = ['gift_card_id','invoice_id','amount','date'];
}
