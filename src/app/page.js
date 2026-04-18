"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function Home() {
  const [gyms, setGyms] = useState([])

  useEffect(() => {
    fetchGyms()
  }, [])

  async function fetchGyms() {
    const { data, error } = await supabase.from("gyms").select("*")
    console.log(data, error)
    setGyms(data || [])
  }

  return (
    <main className="bg-black text-white min-h-screen p-6">
      <h1 className="text-4xl font-bold">🏋️ Fitnara</h1>
      <h1 className="hero-title">
        Your next <span className="highlight">workout</span> starts right here.
      </h1>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {gyms.map((gym) => (
          <div key={gym.id} className="bg-gray-800 p-4 rounded">
            <h2>{gym.name}</h2>
            <p>{gym.location}</p>
            <p>⭐ {gym.rating}</p>
          </div>
        ))}
      </div>
    </main>
  )
}