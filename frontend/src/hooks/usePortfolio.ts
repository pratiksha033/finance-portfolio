import { useEffect, useState } from "react"
import { fetchPortfolio } from "@/services/api"
import { Stock } from "@/types/stock"

export function usePortfolio() {
  const [data, setData] = useState<Stock[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
  try {
    const res = await fetchPortfolio()
    setData(res.data)
  } catch (err) {
    console.error("API ERROR:", err)
  } finally {
    setLoading(false)
  }
}


  useEffect(() => {
    load()

    const interval = setInterval(load, 15000) // 🔥 auto refresh

    return () => clearInterval(interval)
  }, [])

  return { data, loading }
}
