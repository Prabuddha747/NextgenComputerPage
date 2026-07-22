"use client";

import { useState, type FormEvent } from "react";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/data/business";

export function WhatsAppEnquiryForm({
  intro,
  detailsLabel = "What do you need help with?",
  detailsPlaceholder = "e.g. Laptop won't turn on, screen has vertical lines...",
  submitLabel = "Send on WhatsApp",
}: {
  intro: string;
  detailsLabel?: string;
  detailsPlaceholder?: string;
  submitLabel?: string;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const message = [
      intro,
      name && `Name: ${name}`,
      phone && `Phone: ${phone}`,
      details && `Details: ${details}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-border bg-surface p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-accent"
          />
        </Field>
        <Field label="Phone number">
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="10-digit mobile number"
            inputMode="tel"
            className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-accent"
          />
        </Field>
      </div>
      <Field label={detailsLabel}>
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder={detailsPlaceholder}
          rows={4}
          className="w-full resize-none rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-accent"
        />
      </Field>
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.02]"
      >
        <MessageCircle className="h-4 w-4" />
        {submitLabel}
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted">{label}</span>
      {children}
    </label>
  );
}
