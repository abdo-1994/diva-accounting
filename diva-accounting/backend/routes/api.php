<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    ServiceController,
    PackageController,
    CustomerController,
    InvoiceController,
    ExpenseController,
    GiftCardController,
    DashboardController,
    SettingsController,
    UserController,
    CurrencyController
};

Route::middleware('auth:sanctum')->group(function() {
    Route::apiResource('services', ServiceController::class);
    Route::apiResource('packages', PackageController::class);
    Route::apiResource('customers', CustomerController::class);
    Route::apiResource('invoices', InvoiceController::class);
    Route::get('invoices/{invoice}/pdf', [InvoiceController::class,'pdf']);
    Route::apiResource('expenses', ExpenseController::class);
    Route::apiResource('gift-cards', GiftCardController::class);
    Route::post('gift-cards/{gift_card}/charge', [GiftCardController::class,'charge']);
    Route::get('dashboard', [DashboardController::class,'index']);
    Route::get('settings', [SettingsController::class,'index']);
    Route::post('settings', [SettingsController::class,'update']);
    Route::apiResource('users', UserController::class);
    Route::get('currencies', [CurrencyController::class,'index']);
});
