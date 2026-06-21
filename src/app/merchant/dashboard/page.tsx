import { IndianRupee, ShoppingBag, TrendingUp, Users } from "lucide-react";
import { MerchantShell } from "@/components/layout/merchant-shell";
import { Badge } from "@/components/ui/badge";
import { MERCHANT_ORDERS } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

const stats = [
  { label: "Today's Revenue", value: "₹12,450", change: "+18%", icon: IndianRupee },
  { label: "Orders Today", value: "47", change: "+12%", icon: ShoppingBag },
  { label: "Avg Order Value", value: "₹265", change: "+5%", icon: TrendingUp },
  { label: "Active Tables", value: "8/12", change: "", icon: Users },
];

export default function DashboardPage() {
  const activeOrders = MERCHANT_ORDERS.filter((o) => o.status !== "COMPLETED");

  return (
    <MerchantShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Good evening, Rajan 👋</h1>
          <p className="text-muted text-sm">Spice Garden · Pune</p>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map(({ label, value, change, icon: Icon }) => (
            <div
              key={label}
              className="p-5 rounded-2xl bg-card border border-border shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted">{label}</span>
                <div className="w-9 h-9 rounded-lg bg-primary-light text-primary flex items-center justify-center">
                  <Icon size={18} />
                </div>
              </div>
              <p className="text-2xl font-extrabold">{value}</p>
              {change && (
                <p className="text-xs text-success font-semibold mt-1">{change} vs yesterday</p>
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-card border border-border">
            <h2 className="font-bold mb-4">Active Orders</h2>
            <div className="space-y-3">
              {activeOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-stone-50"
                >
                  <div>
                    <p className="font-semibold text-sm">{order.orderNumber}</p>
                    <p className="text-xs text-muted">
                      {order.type === "DINE_IN"
                        ? `Table ${order.tableNumber}`
                        : `Pickup ${order.pickupCode}`}
                      · {order.elapsedMinutes}m ago
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        order.status === "READY"
                          ? "success"
                          : order.status === "PREPARING"
                            ? "warning"
                            : "default"
                      }
                    >
                      {order.status}
                    </Badge>
                    <p className="text-sm font-bold mt-1">{formatCurrency(order.total)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-card border border-border">
            <h2 className="font-bold mb-4">Top Items Today</h2>
            <div className="space-y-3">
              {[
                { name: "Hyderabadi Chicken Biryani", qty: 18, revenue: 6282 },
                { name: "Paneer Tikka", qty: 14, revenue: 3486 },
                { name: "Masala Dosa", qty: 11, revenue: 1980 },
              ].map((item, i) => (
                <div key={item.name} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary-light text-primary text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-xs text-muted">{item.qty} orders</p>
                  </div>
                  <span className="text-sm font-semibold">{formatCurrency(item.revenue)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MerchantShell>
  );
}
