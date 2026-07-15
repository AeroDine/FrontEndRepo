"use client";

import { useState } from "react";
import {
  Bell,
  ClipboardList,
  Plus,
  QrCode,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import { MerchantShell } from "@/components/layout/merchant-shell";
import { MenuItemModal } from "@/components/merchant/modals/menu-item-modal";
import { AddStaffModal } from "@/components/merchant/modals/add-staff-modal";
import { QrManageModal } from "@/components/merchant/modals/qr-manage-modal";
import { ManualOrderModal } from "@/components/merchant/modals/manual-order-modal";
import { cn } from "@/lib/utils";

type ActionId = "menu" | "staff" | "qr" | "order";

const quickActions: {
  id: ActionId;
  label: string;
  hint: string;
  icon: LucideIcon;
}[] = [
  { id: "menu", label: "Create Menu Item", hint: "Add a dish", icon: Plus },
  { id: "staff", label: "Add Staff", hint: "Invite team", icon: UserPlus },
  { id: "qr", label: "Download QRs", hint: "Table codes", icon: QrCode },
  { id: "order", label: "Manual Order", hint: "Walk-in / phone", icon: ClipboardList },
];

const stats = [
  { label: "Today's Sales", value: "₹24,500", change: "↑ 12% vs yesterday", positive: true },
  { label: "Active Orders", value: "18", sub: "6 pending in kitchen" },
  { label: "Avg Prep Time", value: "14 min", change: "↑ 2m vs target", positive: false },
  { label: "Payout Status", value: "₹18,200", sub: "Settling Today" },
];

export default function DashboardPage() {
  const [activeModal, setActiveModal] = useState<ActionId | null>(null);

  return (
    <MerchantShell>
      <div className="p-6 lg:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <select className="text-sm text-muted mt-1 bg-transparent border-none outline-none">
              <option>AeroDine Cafe — Downtown</option>
            </select>
          </div>
          <button
            type="button"
            className="p-2.5 rounded-xl border border-border bg-white hover:bg-zinc-50 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={20} />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map(({ id, label, hint, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveModal(id)}
              className={cn(
                "group p-4 rounded-2xl bg-white border border-border text-left",
                "hover:border-primary/35 hover:shadow-md hover:shadow-primary/5",
                "active:scale-[0.98] transition-all duration-200",
              )}
            >
              <div className="w-11 h-11 rounded-xl bg-primary-light text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                <Icon size={20} />
              </div>
              <p className="text-sm font-semibold leading-snug">{label}</p>
              <p className="text-xs text-muted mt-0.5">{hint}</p>
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map(({ label, value, change, sub, positive }) => (
            <div key={label} className="p-5 rounded-2xl bg-white border border-border">
              <p className="text-sm text-muted">{label}</p>
              <p className="text-2xl font-extrabold mt-1">{value}</p>
              {change && (
                <p
                  className={`text-xs font-semibold mt-1 ${
                    positive ? "text-customer-accent" : "text-danger"
                  }`}
                >
                  {change}
                </p>
              )}
              {sub && <p className="text-xs text-muted mt-1">{sub}</p>}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-5 rounded-2xl bg-white border border-border">
            <h2 className="font-bold mb-4">Today&apos;s Sales Trend</h2>
            <div className="h-48 flex items-end gap-2">
              {[20, 35, 25, 40, 30, 55, 90].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t bg-primary/80 transition-all hover:bg-primary"
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-[10px] text-muted">
                    {["10a", "12p", "1p", "3p", "5p", "6p", "8p"][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="font-bold">System Alerts</h2>
            <div className="p-4 rounded-xl bg-red-50 border border-red-100 text-sm">
              <p className="font-semibold text-red-900">KDS Offline</p>
              <p className="text-red-700 text-xs mt-1">
                Kitchen Display System 2 (Bar) has lost connection.
              </p>
              <button type="button" className="text-xs text-primary font-semibold mt-2 hover:underline">
                Reconnect
              </button>
            </div>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 text-sm">
              <p className="font-semibold text-amber-900">Printer Warning</p>
              <p className="text-amber-700 text-xs mt-1">Receipt printer is low on paper.</p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-50 border border-border text-sm">
              <p className="font-semibold">Low Stock</p>
              <p className="text-muted text-xs mt-1">Paneer Tikka is low on stock (2 left).</p>
              <button
                type="button"
                className="text-xs text-primary font-semibold mt-2 hover:underline"
                onClick={() => setActiveModal("menu")}
              >
                Update Menu
              </button>
            </div>
          </div>
        </div>
      </div>

      <MenuItemModal
        open={activeModal === "menu"}
        onClose={() => setActiveModal(null)}
        mode="create"
      />
      <AddStaffModal open={activeModal === "staff"} onClose={() => setActiveModal(null)} />
      <QrManageModal open={activeModal === "qr"} onClose={() => setActiveModal(null)} />
      <ManualOrderModal open={activeModal === "order"} onClose={() => setActiveModal(null)} />
    </MerchantShell>
  );
}
