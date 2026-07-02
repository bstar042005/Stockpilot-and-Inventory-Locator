import { useEffect, useState } from "react";
import API from "../services/api";
import "./Analytics.css";
import Sidebar from "../components/Sidebar";
import { generateAIInsights } from "../services/aiApi";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import ReactMarkdown from "react-markdown";

function Analytics() {
  const [products, setProducts] = useState([]);
  const [aiSummary, setAiSummary] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const inventoryValue = products.reduce(
    (sum, product) =>
      sum +
      Number(product.quantity) *
      Number(product.price || 0),
    0
  );

  const lowStockProducts = products.filter(
    (product) => product.quantity < 20
  );

  const warehouseHealth = products.length
  ? Math.round(
      ((products.length - lowStockProducts.length) /
        products.length) *
        100
    )
  : 100;

  const timeSaved = products.length * 3;

  const [aiQueries, setAiQueries] = useState(0);

  const inventoryStatus = [
  {
    name: "Healthy",
    value: products.filter(
      (p) => Number(p.quantity) >= 20
    ).length,
  },
  {
    name: "Low Stock",
    value: products.filter(
      (p) =>
        Number(p.quantity) > 0 &&
        Number(p.quantity) < 20
    ).length,
  },
  {
    name: "Out of Stock",
    value: products.filter(
      (p) => Number(p.quantity) === 0
    ).length,
  },
];

const PIE_COLORS = [
  "#22C55E",
  "#F59E0B",
  "#EF4444",
];

  const shelfMap = {};

products.forEach((product) => {
  const shelf = product.shelf || "Unknown";

  if (!shelfMap[shelf]) {
    shelfMap[shelf] = 0;
  }

  shelfMap[shelf] += Number(product.quantity);
});

const shelfData = Object.keys(shelfMap).map((shelf) => ({
  shelf,
  quantity: shelfMap[shelf],
}));

const lowStockShelfMap = {};

lowStockProducts.forEach((product) => {
  const shelf = product.shelf || "Unknown";

  if (!lowStockShelfMap[shelf]) {
    lowStockShelfMap[shelf] = 0;
  }

  lowStockShelfMap[shelf]++;
});

const lowStockShelfData = Object.keys(lowStockShelfMap).map((shelf) => ({
  shelf,
  count: lowStockShelfMap[shelf],
}));

  const handleAIInsights = async () => {
  setLoadingAI(true);

  const summary = await generateAIInsights();

  setAiSummary(summary);

  setAiQueries((prev) => prev + 1);

  setLoadingAI(false);
};

const dailyMap = {};

products.forEach((product) => {
  if (!product.createdAt) return;

  const day = new Date(product.createdAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });

  if (!dailyMap[day]) {
    dailyMap[day] = 0;
  }

  dailyMap[day]++;
});

const dailyActivity = Object.keys(dailyMap).map((day) => ({
  day,
  products: dailyMap[day],
}));

const topInventoryValue = [...products]
  .map((product) => ({
    ...product,
    value:
      Number(product.price || 0) *
      Number(product.quantity),
  }))
  .sort((a, b) => b.value - a.value)
  .slice(0, 5);

  const shelfValueMap = {};

products.forEach((product) => {
  const shelf = product.shelf || "Unknown";

  if (!shelfValueMap[shelf]) {
    shelfValueMap[shelf] = 0;
  }

  shelfValueMap[shelf] +=
    Number(product.quantity) * Number(product.price || 0);
});

const shelfValueData = Object.keys(shelfValueMap).map((shelf) => ({
  shelf,
  value: shelfValueMap[shelf],
}));

return (
  <div className="dashboard">

    <Sidebar />

    <div className="main">

      <div className="analytics-page">

      <div className="analytics-header">
        <h1>Analytics</h1>
        <p>
          Insights and inventory analytics
        </p>
      </div>

      <div className="last-updated">
  Last Updated: {new Date().toLocaleString()}
</div>

      {/* Cards */}
<div className="analytics-cards">

  <div
  className="analytics-card"
  style={{
    borderLeft: `6px solid ${
      warehouseHealth >= 90
        ? "#22C55E"
        : warehouseHealth >= 70
        ? "#F59E0B"
        : "#EF4444"
    }`,
  }}
>
  <p>Warehouse Health</p>

  <h2
    style={{
      color:
        warehouseHealth >= 90
          ? "#22C55E"
          : warehouseHealth >= 70
          ? "#F59E0B"
          : "#EF4444",
    }}
  >
    {warehouseHealth}%
  </h2>
</div>

  <div className="analytics-card">
    <p>Total Stock Value</p>
    <h2>₹{inventoryValue.toLocaleString()}</h2>
  </div>

  <div className="analytics-card">
    <p>Estimated Time Saved</p>
    <h2>{timeSaved} mins</h2>
  </div>

  <div className="analytics-card">
    <p>AI Queries</p>
    <h2>{aiQueries}</h2>
  </div>

</div>

{/* Center AI Assistant */}
<div className="analytics-ai-center">

  <div className="analytics-panel ai-panel">
<div className="ai-header">

  <h2>AI Inventory Insights</h2>

  <button
    className="generate-ai-btn"
    onClick={handleAIInsights}
  >
    Generate AI Insights
  </button>

</div>

    {loadingAI ? (
  <p>Generating AI Insights...</p>
) : aiSummary ? (
  <div className="ai-report">
    <ReactMarkdown>{aiSummary}</ReactMarkdown>
  </div>
) : (
  <div className="ai-report ai-placeholder">

  <p>Inventory Health Analysis</p>

  <p>Stock Optimization Suggestions</p>

  <p>Low Stock Risk Detection</p>

  <p>Inventory Value Summary</p>

  <p>AI Recommendations</p>

  <small>
    Click <strong>Generate AI Insights</strong> to receive an AI-generated report.
  </small>

</div>
)}

  </div>

</div>

      {/* Charts */}

      <div className="analytics-grid">

  <div className="analytics-panel">

    <h2>Stock Distribution by Shelf</h2>

    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={shelfData}>
        <XAxis dataKey="shelf" />
        <YAxis />
        <Tooltip />

        <Bar
    dataKey="quantity"
    fill="#3B82F6"
/>

      </BarChart>
    </ResponsiveContainer>

  </div>

  <div className="analytics-panel">

    <h2>Inventory Status</h2>

    <ResponsiveContainer width="100%" height={300}>
      <PieChart>

        <Pie
          data={inventoryStatus}
          dataKey="value"
          nameKey="name"
          outerRadius={90}
          label
        >
          {inventoryStatus.map((entry, index) => (
            <Cell
              key={index}
              fill={PIE_COLORS[index]}
            />
          ))}
        </Pie>

        <Tooltip />

        <Legend />

      </PieChart>
    </ResponsiveContainer>

  </div>

</div>

      <div className="analytics-grid">

  <div className="analytics-panel">

    <h2>Daily Activity</h2>

    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={dailyActivity}>
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />

        <Line
          type="monotone"
          dataKey="products"
          stroke="#3B82F6"
          strokeWidth={3}
        />

      </LineChart>
    </ResponsiveContainer>

  </div>

  <div className="analytics-panel">

  <h2>Inventory Value by Shelf</h2>

  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={shelfValueData}>
      <XAxis dataKey="shelf" />
      <YAxis />
      <Tooltip />

      <Bar
        dataKey="value"
        fill="#10B981"
      />
    </BarChart>
  </ResponsiveContainer>

</div>
</div>


      {/* Low Stock Table */}

      
<div className="analytics-grid">

  {/* Top Inventory Value */}

  <div className="analytics-panel">

    <h2>Top Inventory Value</h2>

    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={topInventoryValue}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />

        <Bar
          dataKey="value"
          fill="#10B981"
        />
      </BarChart>
    </ResponsiveContainer>

  </div>

  {/* Top Products by Quantity */}

  <div className="analytics-panel">

    <h2>Top Products by Quantity</h2>

    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={[...products]
          .sort((a, b) => b.quantity - a.quantity)
          .slice(0, 5)}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />

        <Bar
          dataKey="quantity"
          fill="#3B82F6"
        />
      </BarChart>
    </ResponsiveContainer>

  </div>

</div>
      </div>

    </div>

  </div>
);
}

export default Analytics;