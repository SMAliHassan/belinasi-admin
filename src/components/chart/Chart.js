import "./chart.css";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Chart({
  title,
  data,
  dataKey,
  grid,
  children,
  fontSize,
}) {
  return (
    <div className="chart">
      {children}
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data} style={{ fontSize: fontSize || "1rem" }}>
          <XAxis dataKey="name" stroke="#000" />
          <Line type="monotone" dataKey={dataKey} stroke="#ee2761" />
          <Tooltip />
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
