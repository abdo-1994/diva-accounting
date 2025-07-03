<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;

class UsersSeeder extends Seeder {
    public function run(){
        $accounts=[['name'=>'Admin One','email'=>'admin1@diva.com','role'=>'Admin'],['name'=>'Admin Two','email'=>'admin2@diva.com','role'=>'Admin'],['name'=>'Seller One','email'=>'seller1@diva.com','role'=>'Seller'],['name'=>'Seller Two','email'=>'seller2@diva.com','role'=>'Seller'],['name'=>'Accountant','email'=>'accountant@diva.com','role'=>'Accountant']];
        foreach($accounts as $a){
            $user=User::updateOrCreate(['email'=>$a['email']],['name'=>$a['name'],'password'=>bcrypt('password123')]);
            $user->syncRoles([$a['role']]);
        }
    }
}
