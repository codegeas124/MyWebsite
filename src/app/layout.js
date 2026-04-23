import { Geist, Geist_Mono, Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Script from "next/script";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne", weight: ["400", "700", "800"] });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm", weight: ["300", "400", "500"] });

export const metadata = {
  title: "Fitnara – Discover Fitness Centers Across India",
  description: "Find gyms, yoga studios, pilates, crossfit, boxing, zumba, swimming and dance centers near you across India. Fitnara helps you discover the best fitness spaces in your city.",
  metadataBase: new URL("https://www.fitnara.in"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Fitnara – Discover Fitness Centers Across India",
    description: "Find gyms, yoga studios, pilates, crossfit, boxing, zumba, swimming and dance centers near you across India.",
    url: "https://www.fitnara.in",
    siteName: "Fitnara",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fitnara – Discover Fitness Centers Across India",
    description: "Find gyms, yoga studios, pilates, crossfit and more near you across India.",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} ${dmSans.variable} h-full antialiased`}>
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-E2GKPD06CP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-E2GKPD06CP');
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
