import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sri Bhairaveshwara Power Control | Electrical Control Panels Bangalore",
    template: "%s | Sri Bhairaveshwara Power Control",
  },
  description:
    "Specialist manufacturer of MCC, PCC, AMF, APFC, E-House, Synchronizing and LT control panels in Bangalore. Design, manufacture and commissioning of premium industrial electrical control solutions.",
  keywords:
    "MCC panel, PCC panel, AMF panel, APFC panel, electrical control panels, LT panels, E-House, feeder pillar, bus duct, power distribution, Bangalore, Karnataka",
  authors: [{ name: "Sri Bhairaveshwara Power Control" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Sri Bhairaveshwara Power Control",
    title: "Sri Bhairaveshwara Power Control | Electrical Control Panels Bangalore",
    description:
      "Design, manufacture and commissioning of premium LT panels, MCC, APFC, PLC and automation systems in Bangalore.",
  },
  twitter: { card: "summary_large_image" },
  metadataBase: new URL("https://sribhairaveshwarapowercontrol.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.jpeg" type="image/jpeg" />
        <meta name="theme-color" content="#0B3D91" />
      </head>
      <body className={`${inter.variable} ${jakarta.variable}`}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
