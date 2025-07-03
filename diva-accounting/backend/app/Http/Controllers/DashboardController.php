<?php
namespace App\Http\Controllers;
use App\Models\{Invoice,Customer,InvoiceItem,GiftCard};
use Carbon\Carbon;
use DB;

class DashboardController extends Controller {
    public function index(){
        $today = Carbon::today();
        $weekStart = Carbon::today()->subDays(6);
        $dailySales = Invoice::whereDate('date',$today)->sum('total');
        $newCustomers = Customer::whereDate('created_at',$today)->count();
        $weeklySales = Invoice::select(DB::raw("DATE(date) as day"),DB::raw("SUM(total) as total"))
            ->whereDate('date','>=',$weekStart)
            ->groupBy('day')->orderBy('day')->get();
        $topServices = InvoiceItem::select('service_id',DB::raw('COUNT(*) as count'))
            ->groupBy('service_id')->orderByDesc('count')->take(5)->with('service')->get();
        $activeGifts = GiftCard::where('expiry_date','>=',$today)->where('balance','>',0)->count();
        return response()->json(compact('dailySales','newCustomers','weeklySales','topServices','activeGifts'));
    }
}
