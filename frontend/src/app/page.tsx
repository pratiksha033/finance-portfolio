"use client";

import { usePortfolio } from "@/hooks/usePortfolio";
import PortfolioTable from "@/components/PortfolioTable";
import SummaryCards from "@/components/SummaryCards";
import PortfolioCharts from "@/components/PortfolioCharts";

export default function Home() {
  const { data, loading } = usePortfolio();

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Portfolio Dashboard</h1>

      <SummaryCards data={data} />
      <PortfolioCharts data={data} />
      <PortfolioTable data={data} />
    </main>
  );
}
