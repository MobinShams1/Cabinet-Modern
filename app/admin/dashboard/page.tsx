

import Chart from "@/components/chart";
import Header from "@/components/header";
import KpiCards from "@/components/kpiCards";
import OrderTable from "@/components/orderTable";
import Sidebar from "@/components/sidebar-in-dashboard";
export default async function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-100 flex">
      <Sidebar />

      <main className="flex-1">
      
        
        <Header/>
      
        <section className="p-8">
          
          <KpiCards/>

       
          <Chart/>

          
          <OrderTable/>
        </section>
      </main>
    </div>
  );
}
