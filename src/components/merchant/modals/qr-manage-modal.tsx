"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Download, QrCode, RefreshCw } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectField } from "@/components/ui/select-field";
import { SuccessBanner } from "@/components/ui/success-banner";
import { AeroDineLogo } from "@/components/brand/aerodine-logo";
import { cn } from "@/lib/utils";

function parseTableNum(value: string): number | null {
  const m = value.trim().match(/^T?(\d+)$/i);
  return m ? Number(m[1]) : null;
}

interface QrManageModalProps {
  open: boolean;
  onClose: () => void;
}

export function QrManageModal({ open, onClose }: QrManageModalProps) {
  const [from, setFrom] = useState("T1");
  const [to, setTo] = useState("T20");
  const [zone, setZone] = useState("Main Dining Area");
  const [generated, setGenerated] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [downloaded, setDownloaded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setFrom("T1");
      setTo("T20");
      setZone("Main Dining Area");
      setGenerated(false);
      setSelected([]);
      setDownloaded(false);
      setError("");
    }
  }, [open]);

  const tables = useMemo(() => {
    const start = parseTableNum(from);
    const end = parseTableNum(to);
    if (start == null || end == null || end < start || end - start > 99) return [];
    return Array.from({ length: end - start + 1 }, (_, i) => `T${start + i}`);
  }, [from, to]);

  const previewTable = selected[0] ?? tables[0] ?? "T1";

  const generate = () => {
    if (!tables.length) {
      setError("Enter a valid range like T1 → T20 (max 100 tables).");
      return;
    }
    setError("");
    setGenerated(true);
    setSelected(tables);
    setDownloaded(false);
  };

  const toggle = (t: string) => {
    setSelected((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
    );
  };

  const download = () => {
    if (!selected.length) return;
    setDownloaded(true);
    window.setTimeout(onClose, 1200);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="xl"
      title="Table QR Management"
      description="Generate, preview, and download QR codes for your dining tables."
      footer={
        downloaded ? null : (
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
            <p className="text-xs text-muted">
              {generated
                ? `${selected.length} of ${tables.length} tables selected · ${zone}`
                : "Generate codes to download printable QR stickers"}
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button onClick={download} disabled={!generated || !selected.length}>
                <Download size={16} />
                Download {selected.length || ""} QR{selected.length === 1 ? "" : "s"}
              </Button>
            </div>
          </div>
        )
      }
    >
      {downloaded ? (
        <SuccessBanner
          title="QR pack ready"
          message={`${selected.length} table QR codes downloaded as a ZIP for ${zone}.`}
        />
      ) : (
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-5">
            <section className="space-y-4">
              <h3 className="text-sm font-semibold text-zinc-700">Generate table QRs</h3>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  id="qr-from"
                  label="From"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
                <Input
                  id="qr-to"
                  label="To"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>
              <p className="text-xs text-muted">
                {tables.length
                  ? `Will generate ${tables.length} unique table QR${tables.length === 1 ? "" : "s"}.`
                  : "Enter a valid table range"}
              </p>
              <SelectField
                id="qr-zone"
                label="Zone / section"
                value={zone}
                onChange={(e) => setZone(e.target.value)}
              >
                <option>Main Dining Area</option>
                <option>Outdoor Patio</option>
                <option>Private Room</option>
                <option>Rooftop</option>
              </SelectField>
              {error && <p className="text-xs text-danger">{error}</p>}
              <Button variant="outline" fullWidth onClick={generate}>
                <RefreshCw size={16} />
                Generate Codes
              </Button>
            </section>

            {generated && (
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-zinc-700">Select tables</h3>
                  <button
                    type="button"
                    className="text-xs font-semibold text-primary"
                    onClick={() =>
                      setSelected(selected.length === tables.length ? [] : tables)
                    }
                  >
                    {selected.length === tables.length ? "Deselect all" : "Select all"}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto pr-1">
                  {tables.map((t) => {
                    const active = selected.includes(t);
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => toggle(t)}
                        className={cn(
                          "min-w-11 h-10 px-2 rounded-lg border text-xs font-bold transition-all",
                          active
                            ? "border-primary bg-primary-light text-primary"
                            : "border-border text-muted hover:border-zinc-300",
                        )}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          <div className="space-y-4">
            <p className="text-sm text-muted">Preview · ready for table tents or stickers</p>
            <div className="mx-auto max-w-xs p-6 rounded-2xl border-2 border-border bg-gradient-to-b from-white to-zinc-50 shadow-lg text-center space-y-4">
              <AeroDineLogo size="sm" className="justify-center" />
              <div>
                <p className="font-bold">AeroDine Cafe</p>
                <p className="text-xs text-muted">Scan to Order & Pay</p>
              </div>
              <div className="w-40 h-40 mx-auto bg-white border border-border rounded-xl flex items-center justify-center shadow-inner">
                <QrCode size={88} className="text-zinc-800" strokeWidth={1.25} />
              </div>
              <div className="bg-customer-primary text-white py-2.5 rounded-lg font-bold text-sm tracking-wide">
                TABLE {previewTable.replace(/^T/i, "")}
              </div>
              <p className="text-[11px] text-muted flex items-center justify-center gap-1">
                <Check size={12} className="text-success" />
                {zone}
              </p>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
