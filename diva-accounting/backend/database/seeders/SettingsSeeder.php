<?php
namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\CompanySetting;

class SettingsSeeder extends Seeder {
    public function run(){
        $settings=[
            ['key'=>'company_name','value'=>'مركز ديفا للعناية'],
            ['key'=>'company_phone','value'=>'+966-XXX-XXXX'],
            ['key'=>'company_address','value'=>'العنوان هنا'],
            ['key'=>'default_currency','value'=>'SAR'],
            ['key'=>'tax_rate','value'=>'0'],
            ['key'=>'invoice_prefix','value'=>'INV-'],
            ['key'=>'expense_prefix','value'=>'EXP-'],
        ];
        foreach($settings as $s){ CompanySetting::updateOrCreate(['key'=>$s['key']], ['value'=>$s['value']]); }
    }
}
