"use client";

import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const categoryConfig = {
  total: {
    label: "Books",
    color: "#00685f",
    theme: {
      light: "#00685f",
      dark: "#4fdbc8",
    },
  },
};

const availabilityConfig = {
  Available: {
    label: "Available",
    color: "#0d9488",
  },
  Unavailable: {
    label: "Unavailable",
    color: "#f43f5e",
  },
};

const availabilityColors = ["#0d9488", "#f43f5e"];

const AdminStatsChart = ({ charts = {} }) => {
  const booksByCategory = charts?.booksByCategory || [];
  const availability = charts?.availability || [];
  const hasCategoryData = booksByCategory.some((item) => Number(item.total) > 0);
  const hasAvailabilityData = availability.some((item) => Number(item.value) > 0);

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-5 flex flex-col gap-1">
          <h3 className="text-lg font-bold text-foreground font-montserrat">
            Books by Category
          </h3>
          <p className="text-sm text-foreground/60">
            Catalog distribution across library categories.
          </p>
        </div>

        {hasCategoryData ? (
          <ChartContainer config={categoryConfig} className="h-[320px] w-full">
            <BarChart data={booksByCategory} margin={{ top: 22, right: 12, left: -12, bottom: 8 }}>
              <CartesianGrid vertical={false} strokeDasharray="4 4" />
              <XAxis
                dataKey="category"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                interval={0}
                tickFormatter={(value) => String(value).slice(0, 12)}
              />
              <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="total"
                fill="var(--color-total)"
                radius={[8, 8, 0, 0]}
                maxBarSize={58}
              >
                <LabelList
                  dataKey="total"
                  position="top"
                  offset={8}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        ) : (
          <EmptyChartState message="No category data available yet." />
        )}
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-5 flex flex-col gap-1">
          <h3 className="text-lg font-bold text-foreground font-montserrat">
            Availability
          </h3>
          <p className="text-sm text-foreground/60">
            Current stock status for the collection.
          </p>
        </div>

        {hasAvailabilityData ? (
          <>
            <ChartContainer config={availabilityConfig} className="mx-auto h-[270px] w-full max-w-[360px]">
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel nameKey="name" />}
                />
                <Pie
                  data={availability}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={64}
                  outerRadius={104}
                  paddingAngle={3}
                  strokeWidth={3}
                >
                  {availability.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={availabilityColors[index % availabilityColors.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>

            <div className="mt-3 grid gap-3">
              {availability.map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm dark:bg-slate-800/60"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: availabilityColors[index % availabilityColors.length] }}
                    />
                    <span className="font-medium text-foreground/75">{item.name}</span>
                  </div>
                  <span className="font-semibold text-foreground">{Number(item.value || 0).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <EmptyChartState message="No availability data available yet." />
        )}
      </section>
    </div>
  );
};

const EmptyChartState = ({ message }) => (
  <div className="flex h-[260px] items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-sm font-medium text-foreground/50 dark:border-slate-700 dark:bg-slate-800/35">
    {message}
  </div>
);

export default AdminStatsChart;
