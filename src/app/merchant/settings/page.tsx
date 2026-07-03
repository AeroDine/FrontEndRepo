"use client";

import {
  Bell,
  CreditCard,
  Printer,
  Receipt,
  Store,
  Ticket,
  Users,
} from "lucide-react";
import { MerchantShell } from "@/components/layout/merchant-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SETTINGS_NAV = [
  { id: "profile", label: "Business Profile", icon: Store, active: true },
  { id: "staff", label: "Staff & Roles", icon: Users },
  { id: "taxes", label: "Taxes & Charges", icon: Receipt },
  { id: "payments", label: "Payments & UPI", icon: CreditCard },
  { id: "printers", label: "Printers & Devices", icon: Printer },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "subscription", label: "Subscription", icon: Ticket },
  { id: "support", label: "Support Tickets", icon: Ticket },
];

export default function SettingsPage() {
  return (
    <MerchantShell dark>
      <div className="flex min-h-screen">
        <aside className="w-56 shrink-0 border-r border-zinc-700 p-4 space-y-1">
          {SETTINGS_NAV.map(({ id, label, icon: Icon, active }) => (
            <button
              key={id}
              type="button"
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                active
                  ? "bg-primary text-white"
                  : "text-zinc-400 hover:bg-merchant-card"
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </aside>

        <div className="flex-1 p-8 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Business Profile</h1>
              <p className="text-sm text-zinc-400 mt-1">
                Manage your cafe details, outlet information, and branding.
              </p>
            </div>
            <Button size="sm">Save Changes</Button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
            <div className="h-28 rounded-xl border-2 border-dashed border-zinc-600 flex items-center justify-center text-sm text-zinc-500">
              Upload Logo
            </div>
            <div className="h-28 rounded-xl border-2 border-dashed border-zinc-600 flex items-center justify-center text-sm text-zinc-500 sm:col-span-2">
              Upload Cover Image (1200×400)
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
            <Input id="biz-name" label="Business Name" defaultValue="AeroDine Cafe" className="bg-merchant-card border-zinc-600 text-white" />
            <Input id="outlet-type" label="Outlet Type" defaultValue="Cafe / Coffee Shop" className="bg-merchant-card border-zinc-600 text-white" />
            <Input id="phone" label="Phone Number" defaultValue="+91 98765 43210" className="bg-merchant-card border-zinc-600 text-white" />
            <Input id="email" label="Email Address" defaultValue="hello@aerodinecafe.com" className="bg-merchant-card border-zinc-600 text-white" />
            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-white">Outlet Address</label>
              <textarea
                className="mt-1.5 w-full h-20 px-4 py-3 rounded-xl border border-zinc-600 bg-merchant-card text-sm text-white"
                defaultValue="123, 1st Floor, High Street, Downtown, Bangalore - 560001"
              />
            </div>
            <Input id="fssai" label="FSSAI License Number" defaultValue="11223344556677" className="bg-merchant-card border-zinc-600 text-white" />
            <Input id="gstin" label="GSTIN (Optional)" defaultValue="29ABCDE1234F1Z5" className="bg-merchant-card border-zinc-600 text-white" />
          </div>

          <section className="max-w-3xl">
            <h2 className="font-semibold text-white mb-4">Operating Hours</h2>
            <label className="flex items-center gap-3 text-sm text-zinc-300 mb-3">
              <input type="checkbox" defaultChecked className="accent-primary" />
              Monday – Friday
            </label>
            <div className="flex items-center gap-3">
              <input type="time" defaultValue="09:00" className="h-11 px-3 rounded-xl border border-zinc-600 bg-merchant-card text-white text-sm" />
              <span className="text-zinc-500">to</span>
              <input type="time" defaultValue="23:00" className="h-11 px-3 rounded-xl border border-zinc-600 bg-merchant-card text-white text-sm" />
            </div>
          </section>
        </div>
      </div>
    </MerchantShell>
  );
}
