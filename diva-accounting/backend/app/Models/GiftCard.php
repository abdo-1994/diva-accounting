<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GiftCard extends Model {
    use HasFactory;
    protected $fillable = ['code','initial_value','balance','expiry_date','customer_id'];
    public function transactions(){
        return $this->hasMany(GiftCardTransaction::class);
    }
}
