export default function sitemap() {
  return [
    { url: 'https://fitnara.in', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://fitnara.in/explore', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: 'https://fitnara.in/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]
}
