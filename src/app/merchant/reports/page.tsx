import { MerchantShell } from "@/components/layout/merchant-shell";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

export default function ReportsPage() {
  return (
    <MerchantShell dark>
      <div className="flex min-h-screen">
        <div className="flex-1 p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Order History & Reports</h1>
              <select className="text-sm text-zinc-400 mt-1 bg-transparent">
                <option>AeroDine Cafe — Downtown</option>
              </select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-zinc-600 text-zinc-300">
                Schedule Email
              </Button>
              <Button size="sm">Export PDF/CSV</Button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              { label: "Total Sales", value: "₹1,24,500", change: "+12.5% vs last week", up: true },
              { label: "Total Orders", value: "342", change: "+8.2% vs last week", up: true },
              { label: "Avg. Order Value", value: "₹364", change: "-2.1% vs last week", up: false },
              { label: "Discounts Given", value: "₹4,250", change: "0% vs last week", up: true },
            ].map((s) => (
              <div key={s.label} className="p-5 rounded-2xl bg-merchant-card border border-zinc-700">
                <p className="text-sm text-zinc-400">{s.label}</p>
                <p className="text-2xl font-extrabold text-white mt-1">{s.value}</p>
                <p className={`text-xs font-semibold mt-1 ${s.up ? "text-green-400" : "text-red-400"}`}>
                  {s.change}
                </p>
              </div>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-merchant-card border border-zinc-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-white">Performance Overview</h2>
              <div className="flex gap-1">
                {["Sales", "Tax/GST", "Items", "Settlements"].map((t, i) => (
                  <button
                    key={t}
                    type="button"
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                      i === 0 ? "bg-primary text-white" : "text-zinc-400"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-40 flex items-end gap-3">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
                <div key={d} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t bg-primary/70"
                    style={{ height: `${30 + i * 10}%` }}
                  />
                  <span className="text-[10px] text-zinc-500">{d}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <input
              placeholder="Search Order ID, Customer..."
              className="w-full h-11 px-4 rounded-xl bg-merchant-card border border-zinc-700 text-white text-sm"
            />
            <div className="flex flex-wrap gap-2">
              {["Today", "All Channels", "All Payments", "All Status"].map((f) => (
                <button
                  key={f}
                  type="button"
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-merchant-card border border-zinc-700 text-zinc-400"
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        <aside className="hidden xl:block w-80 border-l border-zinc-700 bg-merchant-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-white">Order #ORD-8924</h2>
            <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-500/20 text-green-400">
              Completed
            </span>
          </div>
          <p className="text-xs text-zinc-500">Oct 24, 2023 · 2:45 PM</p>
          <div className="text-sm space-y-2 text-zinc-300">
            <p>Channel: Dine-In (Table 12)</p>
            <p>Payment: UPI (Paid)</p>
          </div>
          <div className="border-t border-zinc-700 pt-4 space-y-2 text-sm text-zinc-300">
            <div className="flex justify-between">
              <span>1x Paneer Tikka (Medium)</span>
              <span>{formatCurrency(280)}</span>
            </div>
            <div className="flex justify-between">
              <span>2x Garlic Naan</span>
              <span>{formatCurrency(120)}</span>
            </div>
            <div className="flex justify-between">
              <span>1x Dal Makhani</span>
              <span>{formatCurrency(320)}</span>
            </div>
          </div>
          <div className="border-t border-zinc-700 pt-4 space-y-1 text-sm">
            <div className="flex justify-between text-zinc-400">
              <span>Subtotal</span>
              <span>{formatCurrency(720)}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>CGST (2.5%)</span>
              <span>{formatCurrency(18)}</span>
            </div>
            <div className="flex justify-between text-zinc-400">
              <span>SGST (2.5%)</span>
              <span>{formatCurrency(18)}</span>
            </div>
            <div className="flex justify-between font-bold text-white pt-2">
              <span>Total</span>
              <span>{formatCurrency(761)}</span>
            </div>
          </div>
          <div className="flex gap-2 pt-4">
            <Button variant="outline" fullWidth className="border-zinc-600 text-zinc-300" size="sm">
              Print Receipt
            </Button>
            <Button variant="outline" fullWidth className="border-zinc-600 text-zinc-300" size="sm">
              Refund
            </Button>
          </div>
        </aside>
      </div>
    </MerchantShell>
  );
}
