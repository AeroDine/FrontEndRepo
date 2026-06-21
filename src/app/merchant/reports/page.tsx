import { MerchantShell } from "@/components/layout/merchant-shell";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function ReportsPage() {
  return (
    <MerchantShell>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Order History & Reports</h1>
            <p className="text-sm text-muted">Last 7 days performance</p>
          </div>
          <Button variant="outline">
            <Download size={18} />
            Export CSV
          </Button>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: "Total GMV", value: formatCurrency(87420) },
            { label: "Total Orders", value: "312" },
            { label: "Dine-in vs Takeaway", value: "68% / 32%" },
          ].map(({ label, value }) => (
            <div key={label} className="p-5 rounded-2xl bg-card border border-border">
              <p className="text-sm text-muted">{label}</p>
              <p className="text-2xl font-extrabold mt-1">{value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-card border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-stone-50 border-b border-border">
              <tr>
                <th className="text-left p-4 font-semibold">Order</th>
                <th className="text-left p-4 font-semibold hidden sm:table-cell">Type</th>
                <th className="text-left p-4 font-semibold hidden md:table-cell">Date</th>
                <th className="text-right p-4 font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: "ORD-0042", type: "Dine-in", date: "Today, 7:32 PM", total: 598 },
                { id: "ORD-0041", type: "Takeaway", date: "Today, 7:15 PM", total: 450 },
                { id: "ORD-0040", type: "Dine-in", date: "Today, 6:48 PM", total: 820 },
                { id: "ORD-0039", type: "Dine-in", date: "Yesterday", total: 340 },
              ].map((row) => (
                <tr key={row.id} className="border-b border-border last:border-0">
                  <td className="p-4 font-medium">{row.id}</td>
                  <td className="p-4 text-muted hidden sm:table-cell">{row.type}</td>
                  <td className="p-4 text-muted hidden md:table-cell">{row.date}</td>
                  <td className="p-4 text-right font-semibold">{formatCurrency(row.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MerchantShell>
  );
}
