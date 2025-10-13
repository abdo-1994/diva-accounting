<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder {
    public function run() {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();
        $models=['service','package','customer','invoice','expense','gift_card'];
        foreach($models as $m){
            collect(['view','create','update','delete'])->each(fn($p)=>Permission::firstOrCreate(['name'=>"$p-$m"]));
        }
        Role::firstOrCreate(['name'=>'Admin'])->givePermissionTo(Permission::all());
        Role::firstOrCreate(['name'=>'Accountant'])->givePermissionTo(['view-invoice','create-invoice','update-invoice','view-expense','create-expense']);
        Role::firstOrCreate(['name'=>'Seller'])->givePermissionTo(['view-service','view-package','create-invoice']);
    }
}
