import ExploreClient from "./ExploreClient"

export const metadata = {
  title: "Explore Fitness Centers – Fitnara",
  description: "Browse gyms, yoga studios, pilates, crossfit, boxing, zumba, swimming and dance centers across every city in India. Filter by category and city.",
  alternates: { canonical: "/explore" },
  openGraph: {
    title: "Explore Fitness Centers – Fitnara",
    description: "Browse gyms, yoga studios, pilates, crossfit, boxing and more across India.",
    url: "https://www.fitnara.in/explore",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Explore fitness centers on Fitnara" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore Fitness Centers – Fitnara",
    description: "Browse gyms, yoga studios, pilates, crossfit and more across India.",
    images: ["/og-image.png"],
  },
}

export default function ExplorePage() {
  return <ExploreClient />
}
