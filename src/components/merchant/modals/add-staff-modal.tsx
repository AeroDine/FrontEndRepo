"use client";

import { useEffect, useState } from "react";
import {
  ChefHat,
  HandPlatter,
  Shield,
  UserRound,
  UtensilsCrossed,
  Wallet,
} from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SuccessBanner } from "@/components/ui/success-banner";
import { cn } from "@/lib/utils";

const ROLES = [
  {
    id: "waiter",
    label: "Waiter",
    description: "Take & serve table orders",
    icon: HandPlatter,
  },
  {
    id: "receptionist",
    label: "Receptionist",
    description: "Greet guests & manage walk-ins",
    icon: UserRound,
  },
  {
    id: "cook",
    label: "Cook / Kitchen",
    description: "Kitchen display & prep",
    icon: UtensilsCrossed,
  },
  {
    id: "cashier",
    label: "Cashier",
    description: "Billing & settlements",
    icon: Wallet,
  },
  {
    id: "chef",
    label: "Head Chef",
    description: "Kitchen lead & menu sign-off",
    icon: ChefHat,
  },
  {
    id: "manager",
    label: "Manager",
    description: "Full outlet access",
    icon: Shield,
  },
] as const;

type RoleId = (typeof ROLES)[number]["id"];

interface AddStaffModalProps {
  open: boolean;
  onClose: () => void;
}

export function AddStaffModal({ open, onClose }: AddStaffModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [role, setRole] = useState<RoleId>("waiter");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (open) {
      setName("");
      setPhone("");
      setEmail("");
      setPin("");
      setRole("waiter");
      setErrors({});
      setSaved(false);
    }
  }, [open]);

  const submit = () => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Name is required";
    if (!/^[6-9]\d{9}$/.test(phone.replace(/\s/g, ""))) {
      next.phone = "Enter a valid 10-digit mobile";
    }
    if (pin && !/^\d{4}$/.test(pin)) next.pin = "PIN must be 4 digits";
    setErrors(next);
    if (Object.keys(next).length) return;
    setSaved(true);
    window.setTimeout(onClose, 1100);
  };

  const roleLabel = ROLES.find((r) => r.id === role)?.label ?? role;

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="lg"
      title="Add Staff Member"
      description="Invite a team member with the right role for your outlet."
      footer={
        saved ? null : (
          <div className="flex flex-col-reverse sm:flex-row gap-2 sm:justify-end">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={submit}>Add Staff</Button>
          </div>
        )
      }
    >
      {saved ? (
        <SuccessBanner
          title="Staff member added"
          message={`${name} can sign in as ${roleLabel}. Share their login PIN securely.`}
        />
      ) : (
        <div className="space-y-6">
          <section className="space-y-3">
            <h3 className="text-sm font-semibold text-zinc-700">Select role</h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {ROLES.map(({ id, label, description, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setRole(id)}
                  className={cn(
                    "flex items-start gap-3 p-3.5 rounded-2xl border-2 text-left transition-all",
                    role === id
                      ? "border-primary bg-primary-light/40 shadow-sm shadow-primary/10"
                      : "border-border hover:border-zinc-300",
                  )}
                >
                  <div
                    className={cn(
                      "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
                      role === id ? "bg-primary text-white" : "bg-zinc-100 text-zinc-600",
                    )}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{label}</p>
                    <p className="text-xs text-muted mt-0.5">{description}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Input
                id="staff-name"
                label="Full name"
                placeholder="e.g. Priya Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={errors.name}
              />
            </div>
            <Input
              id="staff-phone"
              label="Mobile number"
              placeholder="9876543210"
              inputMode="numeric"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={errors.phone}
            />
            <Input
              id="staff-email"
              label="Email (optional)"
              type="email"
              placeholder="priya@cafe.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              id="staff-pin"
              label="Login PIN (optional)"
              placeholder="4-digit PIN"
              inputMode="numeric"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
              error={errors.pin}
            />
          </section>
        </div>
      )}
    </Modal>
  );
}
