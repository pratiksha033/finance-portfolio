import { useEffect, useState } from "react"
import { fetchPortfolio } from "@/services/api"
import { Stock } from "@/types/stock"

export function usePortfolio() {
  const [data, setData] = useState<Stock[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    const res = await fetchPortfolio()
    setData(res.data)
    setLoading(false)
  }

  useEffect(() => {
    load()

    const interval = setInterval(load, 15000) // 🔥 auto refresh

    return () => clearInterval(interval)
  }, [])

  return { data, loading }
}
