import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/ui/section";
import { LocationCta } from "@/components/home/location-cta";
import { WhatsAppEnquiryForm } from "@/components/forms/whatsapp-enquiry-form";
import { Faq } from "@/components/home/faq";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Next Gen Computer on Dak Bunglow Road, Patna — call, WhatsApp, or send an enquiry directly.",
};

export default function ContactPage() {
  return (
    <>
      <Section className="pb-0 pt-14">
        <SectionHeading
          eyebrow="Contact"
          title="A real person replies — not a bot."
          description="Send a message and we'll reply on WhatsApp, directly from the store."
        />
        <div className="mx-auto max-w-xl">
          <WhatsAppEnquiryForm
            intro="Hi, I have a question."
            detailsLabel="Your message"
            detailsPlaceholder="Tell us what you're looking for..."
            submitLabel="Send Message"
          />
        </div>
      </Section>
      <Faq />
      <LocationCta />
    </>
  );
}
