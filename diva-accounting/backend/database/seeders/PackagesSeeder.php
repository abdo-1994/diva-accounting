<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Package;
use App\Models\Service;

class PackagesSeeder extends Seeder {
    public function run(){
        $packages=[['name'=>'نعومة كاملة','description'=>'تنظيف يدين + …','price'=>60]];
        foreach($packages as $p){
            $pkg=Package::updateOrCreate(['name'=>$p['name']],['description'=>$p['description'],'price'=>$p['price']]);
            $names=explode('+',$p['description']); $ids=[];
            foreach($names as $n){ if($svc=Service::where('name','like',"%".trim($n)."%")->first()) $ids[]=$svc->id; }
            $pkg->items()->sync($ids);
        }
    }
}
