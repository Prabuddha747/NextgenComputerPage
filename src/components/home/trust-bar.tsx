import { Section } from "@/components/ui/section";
import { Counter } from "@/components/ui/counter";
import { business } from "@/data/business";

const stats = [
  { value: business.yearsExperience, suffix: "+", label: "Years in Patna" },
  { value: business.rating, decimals: 1, suffix: "★", label: "Average rating" },
  { value: business.reviewCount, suffix: "+", label: "Customer reviews" },
];

export function TrustBar() {
  return (
    <Section className="py-14 sm:py-16">
      <div className="grid grid-cols-1 gap-8 rounded-3xl border border-border bg-surface px-8 py-10 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-display text-4xl font-bold text-accent sm:text-5xl">
              <Counter to={stat.value} decimals={stat.decimals ?? 0} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 overflow-hidden">
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wider text-muted">
          Authorized to sell &amp; service
        </p>
        <div className="flex w-max items-center gap-16 animate-marquee">
          {[...business.brands, ...business.brands, ...business.brands].map((brand, i) => (
            <span key={`${brand}-${i}`} className="flex shrink-0 items-center gap-16">
              <span className="font-display text-2xl font-semibold text-muted/70 sm:text-3xl">
                {brand}
              </span>
              <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent/40" />
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
