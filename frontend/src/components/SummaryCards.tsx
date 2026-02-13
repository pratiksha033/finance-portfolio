type Stock = {
  purchasePrice: number;
  qty: number;
  cmp: number;
};

export default function SummaryCards({ data }: { data: Stock[] }) {
  const totalInvestment = data.reduce(
    (sum, s) => sum + s.purchasePrice * s.qty,
    0
  );

  const currentValue = data.reduce((sum, s) => sum + s.cmp * s.qty, 0);

  const profit = currentValue - totalInvestment;

  const returnPercent =
    totalInvestment === 0 ? 0 : (profit / totalInvestment) * 100;

  const Card = ({ title, value, green }: any) => (
    <div className="bg-gray-900 p-6 rounded-xl shadow text-center">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2
        className={`text-xl font-bold mt-2 ${
          green ? "text-green-500" : "text-white"
        }`}
      >
        {value}
      </h2>
    </div>
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card
        title="Total Investment"
        value={`₹ ${totalInvestment.toFixed(2)}`}
      />
      <Card title="Current Value" value={`₹ ${currentValue.toFixed(2)}`} />
      <Card
        title="Profit / Loss"
        value={`₹ ${profit.toFixed(2)}`}
        green={profit >= 0}
      />
      <Card
        title="Return %"
        value={`${returnPercent.toFixed(2)} %`}
        green={returnPercent >= 0}
      />
    </div>
  );
}
