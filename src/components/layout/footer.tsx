import Link from "next/link";
import { MapPin, Phone, Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { business, PHONE_NUMBER, buildWhatsAppLink } from "@/data/business";
import { primaryNav } from "@/data/nav";

const shopLinks = [
  { label: "Gaming PCs", href: "/gaming-pcs" },
  { label: "Laptops", href: "/laptops" },
  { label: "Accessories", href: "/accessories" },
  { label: "Configurator", href: "/configurator" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-lg font-bold tracking-tight">
            Next<span className="text-accent">Gen</span> Computer
          </p>
          <p className="mt-3 max-w-xs text-sm text-muted">
            {business.yearsExperience}+ years selling, building, and repairing computers in
            Patna — {business.rating}
            <Star className="mx-1 -mt-0.5 inline h-3.5 w-3.5 fill-current text-accent" />
            from {business.reviewCount.toLocaleString()}+ reviews.
          </p>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">Shop</p>
          <ul className="space-y-2.5 text-sm">
            {shopLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-foreground/90 hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">Company</p>
          <ul className="space-y-2.5 text-sm">
            {primaryNav.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-foreground/90 hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted">Visit / Contact</p>
          <ul className="space-y-3 text-sm text-foreground/90">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              {business.address.line1}, {business.address.city}, {business.address.state}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-accent" />
              <a href={`tel:${PHONE_NUMBER}`} className="hover:text-accent">
                {PHONE_NUMBER}
              </a>
            </li>
            <li>
              <a
                href={buildWhatsAppLink("Hi, I'd like to know more about your products/services.")}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent hover:underline"
              >
                Chat on WhatsApp →
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-border py-6">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Next Gen Computer. All rights reserved.</p>
          <p>Dak Bunglow Road, Patna</p>
        </Container>
      </div>
    </footer>
  );
}
