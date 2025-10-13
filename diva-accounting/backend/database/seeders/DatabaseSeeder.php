<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {
    public function run(){
        $this->call([
            RolesAndPermissionsSeeder::class,
            CurrenciesSeeder::class,
            SettingsSeeder::class,
            UsersSeeder::class,
            ServicesSeeder::class,
            PackagesSeeder::class,
        ]);
    }
}
