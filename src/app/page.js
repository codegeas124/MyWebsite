import { createClient } from '@supabase/supabase-js'

async function getGyms() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
  const { data, error } = await supabase.from("gyms").select("*")
  if (error) {
    console.error("Error fetching gyms:", error)
    return []
  }
  return data || []
}

export default async function Home() {
  const gyms = await getGyms()

  return (
    <main className="bg-black text-white min-h-screen p-6">
      <h1 className="text-4xl font-bold">🏋️ Fitnara</h1>
      <h2 className="hero-title">
        Your next <span className="highlight">workout</span> starts right here.
      </h2>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {gyms.map((gym) => (
          <div key={gym.id} className="bg-gray-800 p-4 rounded">
            <h3>{gym.name}</h3>
            <p>{gym.location}</p>
            <p>⭐ {gym.rating}</p>
          </div>
        ))}
      </div>
    </main>
  )
}