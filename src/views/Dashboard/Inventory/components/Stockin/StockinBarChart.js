import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useState, useEffect } from 'react';
import { StockinList } from 'api/stockinAPI';

const StockinBarChart = () => {
  const [stockinData, setStockinData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await StockinList();
    setStockinData(data);
  };

  // Extract the required data for the chart
  const chartData = stockinData.map((entry) => ({
    itemName: entry.itemName,
    qty: entry.qty,
  }));

  return (
    <div>
      <h2>Stock-In Bar Chart</h2>
      <BarChart width={600} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="itemName" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="quantity"
          fill="rgba(75, 192, 192, 0.4)"
          stroke="rgba(75, 192, 192, 1)"
          strokeWidth={1}
        />
      </BarChart>
    </div>
  );
};

export default StockinBarChart;
