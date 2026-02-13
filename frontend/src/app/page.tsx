"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import PortfolioTable from "@/components/PortfolioTable";
import SummaryCards from "@/components/SummaryCards";
import PortfolioCharts from "@/components/PortfolioCharts";
export default function Home() {
  const [data, setData] = useState<any[]>([]);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/portfolio");
    setData(res.data);
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Portfolio Dashboard</h1>

      <SummaryCards data={data} />
      <PortfolioCharts data={data} />
      <PortfolioTable data={data} />
    </main>
  );
}
