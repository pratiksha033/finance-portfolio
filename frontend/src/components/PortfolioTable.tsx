"use client";

import { useEffect, useMemo, useState } from "react";

export default function PortfolioTable({ data }: { data: any[] }) {
  const [search, setSearch] = useState("");
  const [sector, setSector] = useState("All");

  const [sortKey, setSortKey] = useState<string>("name");
  const [asc, setAsc] = useState<boolean>(true);

  const [page, setPage] = useState(1);
  const pageSize = 3;

  const sectors = useMemo(() => {
    const s = new Set(data.map((d) => d.sector));
    return ["All", ...Array.from(s)];
  }, [data]);

  const filtered = useMemo(() => {
    return data.filter((s) => {
      const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
      const matchSector = sector === "All" || s.sector === sector;
      return matchSearch && matchSector;
    });
  }, [data, search, sector]);

  const sorted = useMemo(() => {
    const copy = [...filtered];

    copy.sort((a, b) => {
      if (typeof a[sortKey] === "string") {
        return asc
          ? a[sortKey].localeCompare(b[sortKey])
          : b[sortKey].localeCompare(a[sortKey]);
      }
      return asc ? a[sortKey] - b[sortKey] : b[sortKey] - a[sortKey];
    });

    return copy;
  }, [filtered, sortKey, asc]);

  const totalPages = Math.ceil(sorted.length / pageSize);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page]);

  useEffect(() => {
    setPage(1);
  }, [search, sector]);

  const handleSort = (key: string) => {
    if (key === sortKey) setAsc(!asc);
    else {
      setSortKey(key);
      setAsc(true);
    }
  };

  const thClass = "cursor-pointer hover:text-yellow-400 transition";

  return (
    <div className="mt-6">
      <div className="flex gap-4 mb-4 text-white">
        <input
          placeholder="Search stock..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-900 px-3 py-2 rounded border w-60"
        />

        <select
          value={sector}
          onChange={(e) => setSector(e.target.value)}
          className="bg-gray-900 px-3 py-2 rounded border"
        >
          {sectors.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto max-h-[500px]">
        <table className="w-full border text-sm text-center">
          <thead className="bg-gray-800 text-white sticky top-0">
            <tr>
              <th className={thClass} onClick={() => handleSort("name")}>
                Name
              </th>
              <th className={thClass} onClick={() => handleSort("qty")}>
                Qty
              </th>
              <th
                className={thClass}
                onClick={() => handleSort("purchasePrice")}
              >
                Buy
              </th>
              <th className={thClass} onClick={() => handleSort("cmp")}>
                CMP
              </th>
              <th
                className={thClass}
                onClick={() => handleSort("presentValue")}
              >
                Present
              </th>
              <th className={thClass} onClick={() => handleSort("gainLoss")}>
                Gain/Loss
              </th>
              <th className={thClass} onClick={() => handleSort("pe")}>
                PE
              </th>
              <th>Earnings</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map((s) => (
              <tr key={s.symbol} className="border-t hover:bg-gray-900">
                <td>{s.name}</td>
                <td>{s.qty}</td>
                <td>{s.purchasePrice}</td>
                <td>{s.cmp}</td>
                <td>{s.presentValue}</td>

                <td
                  className={
                    s.gainLoss >= 0
                      ? "text-green-600 font-bold"
                      : "text-red-600 font-bold"
                  }
                >
                  {s.gainLoss}
                </td>

                <td>{s.pe}</td>
                <td>{s.earnings}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center gap-6 mt-5 text-white">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-1 bg-gray-800 rounded hover:bg-gray-700 disabled:opacity-40"
        >
          ◀ Prev
        </button>

        <span className="font-semibold text-yellow-400">
          Page {page} of {totalPages || 1}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-1 bg-gray-800 rounded hover:bg-gray-700 disabled:opacity-40"
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}
