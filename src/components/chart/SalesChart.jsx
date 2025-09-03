import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./SalesChart.module.css";
import CalenderIcon from "../../assets/icons/CalenderIcon.svg";

const weeklyData = [
  { name: "Mon", Purchase: 12000, Sales: 11000 },
  { name: "Tue", Purchase: 15000, Sales: 13000 },
  { name: "Wed", Purchase: 10000, Sales: 9000 },
  { name: "Thu", Purchase: 14000, Sales: 12000 },
  { name: "Fri", Purchase: 16000, Sales: 15000 },
  { name: "Sat", Purchase: 13000, Sales: 12500 },
  { name: "Sun", Purchase: 10000, Sales: 8000 },
];

const monthlyData = [
  { name: "Jan", Purchase: 48000, Sales: 43000 },
  { name: "Feb", Purchase: 51000, Sales: 42000 },
  { name: "Mar", Purchase: 41000, Sales: 47000 },
  { name: "Apr", Purchase: 32000, Sales: 39000 },
  { name: "May", Purchase: 40000, Sales: 41000 },
  { name: "Jun", Purchase: 23000, Sales: 35000 },
  { name: "Jul", Purchase: 30000, Sales: 27000 },
  { name: "Aug", Purchase: 24000, Sales: 23000 },
  { name: "Sep", Purchase: 39000, Sales: 38000 },
  { name: "Oct", Purchase: 27000, Sales: 32000 },
];

const yearlyData = [
  { name: "2020", Purchase: 450000, Sales: 420000 },
  { name: "2021", Purchase: 480000, Sales: 470000 },
  { name: "2022", Purchase: 500000, Sales: 490000 },
  { name: "2023", Purchase: 520000, Sales: 530000 },
  { name: "2024", Purchase: 550000, Sales: 570000 },
];

const SalesChart = () => {
  const [view, setView] = useState("Monthly"); 

  const data =
    view === "Weekly"
      ? weeklyData
      : view === "Yearly"
      ? yearlyData
      : monthlyData;

  return (
    <div className={styles.chartWrapper}>
      <div className={styles.header}>
        <h3>Sales & Purchase</h3>

        {/* Dropdown */}
        <div className={styles.dropdown}>
          <img src={CalenderIcon} alt="CalenderIcon" />
          <select
            value={view}
            onChange={(e) => setView(e.target.value)}
            className={styles.select}
          >
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>
      </div>

      {/* Chart */}
      <div className={styles.chartBody}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={16}>
            <CartesianGrid vertical={false} stroke="#f0f0f0" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => value.toLocaleString()} />
            <Tooltip formatter={(value) => value.toLocaleString()} />
            <Legend />
            <Bar dataKey="Purchase" fill="#4ab5f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Sales" fill="#32cd32" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;
