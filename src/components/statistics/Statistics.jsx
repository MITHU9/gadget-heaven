import React, { PureComponent } from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from "recharts";
import Hero from "../Hero";
import { Helmet } from "react-helmet-async";

const data = [
  {
    name: "Laptop Pro 15",
    rating: 4.7,
    price: 800,
  },
  {
    name: "Gaming Laptop Z5",
    rating: 4.8,
    price: 967,
  },
  {
    name: "Apple-iPhone-X",
    price: 1397,
    rating: 4.6,
  },
  {
    name: "iPhone 16 Pro Max",
    price: 1480,
    rating: 4.4,
  },
  {
    name: "Smart Watch Fit",
    price: 1520,
    rating: 4.6,
  },
  {
    name: "Bluetooth Earbuds",
    price: 1400,
    rating: 4.9,
  },
  {
    name: "MacBook Air 13",
    price: 1400,
    rating: 4.5,
  },
];

export default class Statistics extends PureComponent {
  static demoUrl =
    "https://codesandbox.io/p/sandbox/simple-composed-chart-lyz572";

  render() {
    return (
      <div>
        <Helmet>
          <title>Statistics || Gadget Heaven</title>
        </Helmet>

        <div>
          <Hero
            title="Statistics"
            description="Explore the latest gadgets that will take your experience to the next level. From smart devices to the coolest accessories, we have it all!"
          />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="py-6">
            <h3 className="text-2xl font-bold text-gray-800">Statistics</h3>
          </div>

          <div className="bg-white rounded-lg">
            <ResponsiveContainer width="100%" height={500}>
              <ComposedChart
                width={500}
                height={500}
                data={data}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="name" scale="band" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="price"
                  fill="#9538B1"
                  stroke="#9538E2"
                />
                <Bar dataKey="price" barSize={32} fill="#9538E2" />
                <Line type="monotone" dataKey="Total" stroke="#ff7300" />
                <Scatter dataKey="rating" fill="red" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }
}
