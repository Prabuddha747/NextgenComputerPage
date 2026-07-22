import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";
import { PageLoader } from "@/components/layout/page-loader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nextgencomputer.in"),
  title: {
    default: "Next Gen Computer — Laptops, Gaming PCs & Repair in Patna",
    template: "%s | Next Gen Computer",
  },
  description:
    "Patna's trusted computer store for 26+ years — Dell, HP, Lenovo, Asus, Acer, MSI & Apple laptops, custom gaming PCs, laptop/desktop repair, CCTV, networking and enterprise IT solutions. Dak Bunglow Road, Patna.",
  openGraph: {
    title: "Next Gen Computer — Patna's Trusted Tech Partner for 26+ Years",
    description:
      "Laptops, gaming PCs, accessories, repair, CCTV, networking and enterprise IT — Dak Bunglow Road, Patna.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          themes={["dark", "light"]}
        >
          <PageLoader />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFab />
        </ThemeProvider>
      </body>
    </html>
  );
}
