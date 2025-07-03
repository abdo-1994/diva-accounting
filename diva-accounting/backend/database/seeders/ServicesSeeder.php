<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Service;

class ServicesSeeder extends Seeder {
    public function run(){
        $services=[['name'=>'جيل بوليش / لون أظافر','category'=>'Nails','price'=>20],['name'=>'طلاء أظافر عادي','category'=>'Nails','price'=>15],['name'=>'إزالة الجيل','category'=>'Nails','price'=>10]];
        foreach($services as $s){ Service::updateOrCreate(['name'=>$s['name']], $s); }
    }
}
