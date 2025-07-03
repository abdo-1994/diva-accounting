<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Currency;

class CurrenciesSeeder extends Seeder {
    public function run(){
        $currencies=[['code'=>'SAR','name'=>'Saudi Riyal','exchange_rate'=>1],['code'=>'YER','name'=>'Yemeni Rial','exchange_rate'=>0.066],['code'=>'USD','name'=>'US Dollar','exchange_rate'=>0.27]];
        foreach($currencies as $c){ Currency::updateOrCreate(['code'=>$c['code']], $c); }
    }
}
