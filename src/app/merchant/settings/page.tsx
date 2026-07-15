"use client";

import { useState, type ReactNode } from "react";
import {
  Bell,
  Check,
  CreditCard,
  Headphones,
  Plus,
  Printer,
  Receipt,
  Store,
  Trash2,
  Users,
  Wifi,
  WifiOff,
  type LucideIcon,
} from "lucide-react";
import { MerchantShell } from "@/components/layout/merchant-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectField } from "@/components/ui/select-field";
import { AddStaffModal } from "@/components/merchant/modals/add-staff-modal";
import { SUBSCRIPTION_PLANS } from "@/lib/mock-data";
import { cn, formatCurrency } from "@/lib/utils";

type TabId =
  | "profile"
  | "staff"
  | "taxes"
  | "payments"
  | "printers"
  | "notifications"
  | "subscription"
  | "support";

const SETTINGS_NAV: { id: TabId; label: string; icon: LucideIcon }[] = [
  { id: "profile", label: "Business Profile", icon: Store },
  { id: "staff", label: "Staff & Roles", icon: Users },
  { id: "taxes", label: "Taxes & Charges", icon: Receipt },
  { id: "payments", label: "Payments & UPI", icon: CreditCard },
  { id: "printers", label: "Printers & Devices", icon: Printer },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "subscription", label: "Subscription", icon: CreditCard },
  { id: "support", label: "Support Tickets", icon: Headphones },
];

const STAFF = [
  { id: "1", name: "Priya Sharma", role: "Manager", phone: "+91 98765 43210", status: "Active" },
  { id: "2", name: "Rahul Verma", role: "Waiter", phone: "+91 98765 11111", status: "Active" },
  { id: "3", name: "Ananya Iyer", role: "Cashier", phone: "+91 98765 22222", status: "Active" },
  { id: "4", name: "Vikram Singh", role: "Cook", phone: "+91 98765 33333", status: "Offline" },
];

const DEVICES = [
  { id: "1", name: "Receipt Printer — Front", type: "Epson TM-T82", status: "online" as const },
  { id: "2", name: "KOT Printer — Kitchen", type: "Star TSP143", status: "warning" as const },
  { id: "3", name: "KDS Screen 1", type: "Kitchen Display", status: "online" as const },
  { id: "4", name: "KDS Screen 2 (Bar)", type: "Kitchen Display", status: "offline" as const },
];

const TICKETS = [
  {
    id: "TKT-1042",
    subject: "UPI settlement delayed",
    status: "In Progress",
    updated: "Today",
  },
  {
    id: "TKT-0988",
    subject: "Need extra QR stickers",
    status: "Resolved",
    updated: "3 days ago",
  },
];

function SectionHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <p className="text-sm text-zinc-400 mt-1 max-w-xl">{description}</p>
      </div>
      {action}
    </div>
  );
}

function ToggleRow({
  label,
  description,
  defaultChecked = true,
}: {
  label: string;
  description: string;
  defaultChecked?: boolean;
}) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between gap-4 p-4 rounded-xl border border-zinc-700 bg-merchant-card">
      <div>
        <p className="text-sm font-semibold text-white">{label}</p>
        <p className="text-xs text-zinc-400 mt-0.5">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={label}
        onClick={() => setOn((v) => !v)}
        className={cn(
          "relative w-11 h-6 rounded-full transition-colors shrink-0",
          on ? "bg-primary" : "bg-zinc-600",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform",
            on && "translate-x-5",
          )}
        />
      </button>
    </div>
  );
}

function ProfilePanel() {
  const [saved, setSaved] = useState(false);
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Business Profile"
        description="Manage your cafe details, outlet information, and branding."
        action={
          <Button
            size="sm"
            onClick={() => {
              setSaved(true);
              window.setTimeout(() => setSaved(false), 2000);
            }}
          >
            {saved ? "Saved" : "Save Changes"}
          </Button>
        }
      />

      <div className="grid sm:grid-cols-2 gap-4 max-w-2xl">
        <button
          type="button"
          className="h-28 rounded-xl border-2 border-dashed border-zinc-600 flex items-center justify-center text-sm text-zinc-500 hover:border-primary/50 hover:text-zinc-300 transition-colors"
        >
          Upload Logo
        </button>
        <button
          type="button"
          className="h-28 rounded-xl border-2 border-dashed border-zinc-600 flex items-center justify-center text-sm text-zinc-500 hover:border-primary/50 hover:text-zinc-300 transition-colors sm:col-span-2"
        >
          Upload Cover Image (1200×400)
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
        <Input
          id="biz-name"
          label="Business Name"
          defaultValue="AeroDine Cafe"
          className="bg-merchant-card border-zinc-600 text-white"
        />
        <SelectField
          id="outlet-type"
          label="Outlet Type"
          defaultValue="Cafe / Coffee Shop"
          className="bg-merchant-card border-zinc-600 text-white"
        >
          <option>Cafe / Coffee Shop</option>
          <option>Fine Dining</option>
          <option>Quick Service</option>
          <option>Cloud Kitchen</option>
        </SelectField>
        <Input
          id="phone"
          label="Phone Number"
          defaultValue="+91 98765 43210"
          className="bg-merchant-card border-zinc-600 text-white"
        />
        <Input
          id="email"
          label="Email Address"
          defaultValue="hello@aerodinecafe.com"
          className="bg-merchant-card border-zinc-600 text-white"
        />
        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-white">Outlet Address</label>
          <textarea
            className="mt-1.5 w-full h-20 px-4 py-3 rounded-xl border border-zinc-600 bg-merchant-card text-sm text-white"
            defaultValue="123, 1st Floor, High Street, Downtown, Bangalore - 560001"
          />
        </div>
        <Input
          id="fssai"
          label="FSSAI License Number"
          defaultValue="11223344556677"
          className="bg-merchant-card border-zinc-600 text-white"
        />
        <Input
          id="gstin"
          label="GSTIN (Optional)"
          defaultValue="29ABCDE1234F1Z5"
          className="bg-merchant-card border-zinc-600 text-white"
        />
      </div>

      <section className="max-w-3xl">
        <h2 className="font-semibold text-white mb-4">Operating Hours</h2>
        <label className="flex items-center gap-3 text-sm text-zinc-300 mb-3">
          <input type="checkbox" defaultChecked className="accent-primary" />
          Monday – Friday
        </label>
        <div className="flex items-center gap-3">
          <input
            type="time"
            defaultValue="09:00"
            className="h-11 px-3 rounded-xl border border-zinc-600 bg-merchant-card text-white text-sm"
          />
          <span className="text-zinc-500">to</span>
          <input
            type="time"
            defaultValue="23:00"
            className="h-11 px-3 rounded-xl border border-zinc-600 bg-merchant-card text-white text-sm"
          />
        </div>
      </section>
    </div>
  );
}

function StaffPanel() {
  const [addOpen, setAddOpen] = useState(false);
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Staff & Roles"
        description="Invite team members and control what each role can access."
        action={
          <Button size="sm" onClick={() => setAddOpen(true)}>
            <Plus size={16} />
            Add Staff
          </Button>
        }
      />

      <div className="rounded-2xl border border-zinc-700 overflow-hidden divide-y divide-zinc-700">
        {STAFF.map((s) => (
          <div
            key={s.id}
            className="flex flex-wrap items-center justify-between gap-3 px-4 py-3.5 text-sm"
          >
            <div className="min-w-0">
              <p className="font-semibold text-white">{s.name}</p>
              <p className="text-xs text-zinc-400 mt-0.5">
                {s.role} · {s.phone}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  "text-xs font-bold px-2 py-1 rounded-full",
                  s.status === "Active"
                    ? "bg-emerald-500/15 text-emerald-400"
                    : "bg-zinc-700 text-zinc-300",
                )}
              >
                {s.status}
              </span>
              <button
                type="button"
                className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                aria-label={`Remove ${s.name}`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        {["Waiter", "Cook", "Manager"].map((role) => (
          <div key={role} className="p-4 rounded-xl border border-zinc-700 bg-merchant-card">
            <p className="text-sm font-semibold text-white">{role} permissions</p>
            <p className="text-xs text-zinc-400 mt-1">
              {role === "Manager"
                ? "Full access including settings & reports"
                : role === "Cook"
                  ? "Kitchen display & mark items ready"
                  : "View tables, accept orders, request bill"}
            </p>
          </div>
        ))}
      </div>

      <AddStaffModal open={addOpen} onClose={() => setAddOpen(false)} />
    </div>
  );
}

function TaxesPanel() {
  return (
    <div className="space-y-6 max-w-3xl">
      <SectionHeader
        title="Taxes & Charges"
        description="Configure GST rates and service charges applied at checkout."
        action={<Button size="sm">Save Changes</Button>}
      />

      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-zinc-300">GST slabs</h2>
        {[
          { name: "Food (dine-in)", rate: "5" },
          { name: "Packaged items", rate: "12" },
          { name: "Beverages (aerated)", rate: "18" },
        ].map((tax) => (
          <div
            key={tax.name}
            className="flex flex-wrap items-center gap-3 p-4 rounded-xl border border-zinc-700 bg-merchant-card"
          >
            <p className="flex-1 text-sm font-medium text-white min-w-40">{tax.name}</p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                defaultValue={tax.rate}
                className="w-20 h-10 px-3 rounded-xl border border-zinc-600 bg-merchant-surface text-white text-sm"
              />
              <span className="text-sm text-zinc-400">%</span>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-zinc-300">Service charge</h2>
        <div className="p-4 rounded-xl border border-zinc-700 bg-merchant-card space-y-4">
          <label className="flex items-center gap-3 text-sm text-zinc-300">
            <input type="checkbox" defaultChecked className="accent-primary" />
            Apply service charge on dine-in bills
          </label>
          <div className="flex items-center gap-2 max-w-xs">
            <Input
              id="service-charge"
              label="Rate"
              type="number"
              defaultValue="10"
              className="bg-merchant-surface border-zinc-600 text-white"
            />
            <span className="text-zinc-400 mt-6">%</span>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl border border-zinc-700 bg-merchant-card">
        <label className="flex items-center gap-3 text-sm text-zinc-300">
          <input type="checkbox" defaultChecked className="accent-primary" />
          Show tax break-up on customer bill & digital receipt
        </label>
      </div>
    </div>
  );
}

function PaymentsPanel() {
  return (
    <div className="space-y-6 max-w-3xl">
      <SectionHeader
        title="Payments & UPI"
        description="Manage settlement account, UPI collects, and payout schedule."
        action={<Button size="sm">Save Changes</Button>}
      />

      <section className="space-y-4 p-5 rounded-2xl border border-zinc-700 bg-merchant-card">
        <h2 className="font-semibold text-white">Bank account</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            id="account"
            label="Account Number"
            defaultValue="••••••7890"
            className="bg-merchant-surface border-zinc-600 text-white"
          />
          <Input
            id="ifsc"
            label="IFSC Code"
            defaultValue="HDFC0001234"
            className="bg-merchant-surface border-zinc-600 text-white"
          />
          <Input
            id="beneficiary"
            label="Beneficiary Name"
            defaultValue="AeroDine Pvt Ltd"
            className="bg-merchant-surface border-zinc-600 text-white sm:col-span-2"
          />
        </div>
      </section>

      <section className="space-y-4 p-5 rounded-2xl border border-zinc-700 bg-merchant-card">
        <h2 className="font-semibold text-white">UPI collect</h2>
        <Input
          id="upi"
          label="Primary UPI ID"
          defaultValue="aerodine@hdfcbank"
          className="bg-merchant-surface border-zinc-600 text-white"
        />
        <p className="text-xs text-zinc-400">Used on takeaway bills and QR payment screens.</p>
      </section>

      <section className="space-y-3">
        <h2 className="font-semibold text-white">Settlement preference</h2>
        <label className="block p-4 rounded-xl border-2 border-primary bg-primary/10 cursor-pointer">
          <div className="flex items-start gap-3">
            <input type="radio" name="settlement" defaultChecked className="mt-1 accent-primary" />
            <div>
              <p className="font-semibold text-white">T+1 (Next Day)</p>
              <p className="text-xs text-zinc-400">Settled by 11 AM next working day. Zero extra fees.</p>
            </div>
          </div>
        </label>
        <label className="block p-4 rounded-xl border border-zinc-700 cursor-pointer hover:border-zinc-500">
          <div className="flex items-start gap-3">
            <input type="radio" name="settlement" className="mt-1 accent-primary" />
            <div>
              <p className="font-semibold text-white flex items-center gap-2">
                Instant
                <span className="text-[10px] font-bold bg-primary text-white px-2 py-0.5 rounded">
                  PREMIUM
                </span>
              </p>
              <p className="text-xs text-zinc-400">Settle within 15 mins of order completion.</p>
            </div>
          </div>
        </label>
      </section>
    </div>
  );
}

function PrintersPanel() {
  return (
    <div className="space-y-6">
      <SectionHeader
        title="Printers & Devices"
        description="Monitor kitchen displays, KOT printers, and receipt hardware."
        action={
          <Button size="sm" variant="outline" className="border-zinc-600 text-zinc-300">
            <Plus size={16} />
            Pair Device
          </Button>
        }
      />

      <div className="grid sm:grid-cols-2 gap-3">
        {DEVICES.map((d) => (
          <div
            key={d.id}
            className="p-4 rounded-2xl border border-zinc-700 bg-merchant-card space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-white">{d.name}</p>
                <p className="text-xs text-zinc-400 mt-0.5">{d.type}</p>
              </div>
              {d.status === "online" ? (
                <Wifi size={18} className="text-emerald-400" />
              ) : d.status === "warning" ? (
                <Printer size={18} className="text-amber-400" />
              ) : (
                <WifiOff size={18} className="text-red-400" />
              )}
            </div>
            <div className="flex items-center justify-between">
              <span
                className={cn(
                  "text-xs font-bold px-2 py-1 rounded-full capitalize",
                  d.status === "online" && "bg-emerald-500/15 text-emerald-400",
                  d.status === "warning" && "bg-amber-500/15 text-amber-400",
                  d.status === "offline" && "bg-red-500/15 text-red-400",
                )}
              >
                {d.status === "warning" ? "Low paper" : d.status}
              </span>
              <Button size="sm" variant="outline" className="border-zinc-600 text-zinc-300 h-8">
                {d.status === "offline" ? "Reconnect" : "Test print"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationsPanel() {
  return (
    <div className="space-y-6 max-w-2xl">
      <SectionHeader
        title="Notifications"
        description="Choose how your team gets alerted about orders and system health."
        action={<Button size="sm">Save Preferences</Button>}
      />
      <div className="space-y-3">
        <ToggleRow
          label="New order alerts"
          description="Sound + banner when a guest places an order"
        />
        <ToggleRow
          label="Kitchen SLA warnings"
          description="Alert when prep time exceeds target"
        />
        <ToggleRow
          label="Low stock reminders"
          description="Notify managers when items run low"
        />
        <ToggleRow
          label="Device offline alerts"
          description="KDS or printers disconnected"
        />
        <ToggleRow
          label="Daily payout summary"
          description="Email settlement summary every evening"
          defaultChecked={false}
        />
        <ToggleRow
          label="SMS for critical failures"
          description="Payment gateway or printer outages"
        />
      </div>
    </div>
  );
}

function SubscriptionPanel() {
  const [selected, setSelected] = useState(
    SUBSCRIPTION_PLANS.find((p) => p.recommended)?.id ?? SUBSCRIPTION_PLANS[0].id,
  );

  return (
    <div className="space-y-6 max-w-3xl">
      <SectionHeader
        title="Subscription"
        description="Your current plan and upgrade options for this outlet."
      />

      <div className="p-4 rounded-2xl border border-primary/40 bg-primary/10 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-primary">Current plan</p>
          <p className="text-lg font-bold text-white mt-1">Pro · renews 12 Aug 2026</p>
        </div>
        <Button size="sm" variant="outline" className="border-zinc-600 text-zinc-300">
          Manage billing
        </Button>
      </div>

      <div className="space-y-3">
        {SUBSCRIPTION_PLANS.map((plan) => (
          <button
            key={plan.id}
            type="button"
            onClick={() => setSelected(plan.id)}
            className={cn(
              "w-full text-left p-4 rounded-2xl border-2 transition-all",
              selected === plan.id
                ? "border-primary bg-primary/10"
                : "border-zinc-700 hover:border-zinc-500",
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white">{plan.name}</h3>
                  {plan.recommended && (
                    <span className="text-[10px] font-bold uppercase bg-primary text-white px-2 py-0.5 rounded-full">
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-2xl font-extrabold text-primary mt-1">
                  {formatCurrency(plan.price)}
                  <span className="text-sm font-normal text-zinc-400">/mo</span>
                </p>
              </div>
              <div
                className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0",
                  selected === plan.id
                    ? "border-primary bg-primary text-white"
                    : "border-zinc-600",
                )}
              >
                {selected === plan.id && <Check size={14} />}
              </div>
            </div>
            <ul className="mt-3 space-y-1">
              {plan.features.map((f) => (
                <li key={f} className="text-xs text-zinc-400 flex items-center gap-1.5">
                  <Check size={12} className="text-success shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>

      <Button fullWidth>Update Plan</Button>
    </div>
  );
}

function SupportPanel() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="space-y-6 max-w-3xl">
      <SectionHeader
        title="Support Tickets"
        description="Raise an issue with AeroDine support or track existing tickets."
      />

      <div className="rounded-2xl border border-zinc-700 overflow-hidden">
        {TICKETS.map((t) => (
          <div
            key={t.id}
            className="flex flex-wrap items-center justify-between gap-3 px-4 py-3.5 border-b border-zinc-700 last:border-0"
          >
            <div>
              <p className="text-sm font-semibold text-white">{t.subject}</p>
              <p className="text-xs text-zinc-500 mt-0.5">
                {t.id} · Updated {t.updated}
              </p>
            </div>
            <span
              className={cn(
                "text-xs font-bold px-2.5 py-1 rounded-full",
                t.status === "Resolved"
                  ? "bg-emerald-500/15 text-emerald-400"
                  : "bg-amber-500/15 text-amber-400",
              )}
            >
              {t.status}
            </span>
          </div>
        ))}
      </div>

      <section className="space-y-4 p-5 rounded-2xl border border-zinc-700 bg-merchant-card">
        <h2 className="font-semibold text-white">New ticket</h2>
        {sent ? (
          <p className="text-sm text-emerald-400 font-medium">
            Ticket submitted. Our team typically replies within 2 hours.
          </p>
        ) : (
          <>
            <SelectField
              id="ticket-category"
              label="Category"
              className="bg-merchant-surface border-zinc-600 text-white"
            >
              <option>Payments & settlements</option>
              <option>Hardware / printers</option>
              <option>Menu & QR</option>
              <option>Billing & subscription</option>
              <option>Other</option>
            </SelectField>
            <Input
              id="ticket-subject"
              label="Subject"
              placeholder="Brief summary of the issue"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="bg-merchant-surface border-zinc-600 text-white"
            />
            <div className="space-y-1.5">
              <label htmlFor="ticket-body" className="text-sm font-medium text-white">
                Details
              </label>
              <textarea
                id="ticket-body"
                rows={4}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="What happened? Include order IDs if relevant."
                className="w-full px-4 py-3 rounded-xl border border-zinc-600 bg-merchant-surface text-sm text-white resize-none"
              />
            </div>
            <Button
              onClick={() => {
                if (!subject.trim() || !body.trim()) return;
                setSent(true);
              }}
            >
              Submit Ticket
            </Button>
          </>
        )}
      </section>
    </div>
  );
}

export default function SettingsPage() {
  const [tab, setTab] = useState<TabId>("profile");

  return (
    <MerchantShell dark>
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="lg:w-56 shrink-0 border-b lg:border-b-0 lg:border-r border-zinc-700 p-3 lg:p-4">
          <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible scrollbar-hide">
            {SETTINGS_NAV.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                  tab === id
                    ? "bg-primary text-white shadow-sm shadow-primary/30"
                    : "text-zinc-400 hover:bg-merchant-card hover:text-zinc-200",
                )}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </div>
        </aside>

        <div className="flex-1 p-6 lg:p-8 animate-fade-in" key={tab}>
          {tab === "profile" && <ProfilePanel />}
          {tab === "staff" && <StaffPanel />}
          {tab === "taxes" && <TaxesPanel />}
          {tab === "payments" && <PaymentsPanel />}
          {tab === "printers" && <PrintersPanel />}
          {tab === "notifications" && <NotificationsPanel />}
          {tab === "subscription" && <SubscriptionPanel />}
          {tab === "support" && <SupportPanel />}
        </div>
      </div>
    </MerchantShell>
  );
}
