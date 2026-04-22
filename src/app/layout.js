import { Geist, Geist_Mono, Syne, DM_Sans } from "next/font/google";
import "./globals.css";

// Existing fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// New fonts you want to add
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  weight: ["300", "400", "500"],
});

export const metadata = {
  title: "Fitnara – Discover the Best Gyms in India",
  description: "Find and explore top-rated gyms near you across India. Fitnara helps you discover fitness centres, compare ratings, and start your workout journey today.",
  metadataBase: new URL("https://fitnara.in"),
  openGraph: {
    title: "Fitnara – Discover the Best Gyms in India",
    description: "Find and explore top-rated gyms near you across India. Fitnara helps you discover fitness centres, compare ratings, and start your workout journey today.",
    url: "https://fitnara.in",
    siteName: "Fitnara",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fitnara – Discover the Best Gyms in India",
    description: "Find and explore top-rated gyms near you across India.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}