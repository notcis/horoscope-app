"use client";

import { dataPie } from "@/data-mock/data-pie";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function TeamDistributionChart() {
  return (
    <ResponsiveContainer width="100%" height={150}>
      <PieChart>
        <Tooltip
          labelClassName="font-bold"
          wrapperClassName="dark:[&_.recharts-tooltip-item]:!text-white [&_.recharts-tooltip-item]:!text-black !text-sm dark:!bg-black rounded-md dark:!border-border"
        />
        <Pie data={dataPie} dataKey="value" nameKey="name">
          {dataPie.map((dataItem, i) => (
            <Cell key={i} fill={dataItem.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
