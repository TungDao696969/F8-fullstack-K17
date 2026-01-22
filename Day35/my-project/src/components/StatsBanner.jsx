// components/StatsBanner.tsx
import { useQuery } from "@tanstack/react-query";
import { fetchStats } from "@/services/api";
export default function StatsBanner() {
  const { data, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: fetchStats,
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="h-24 animate-pulse rounded-xl bg-orange-200" />
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid grid-cols-2 overflow-hidden rounded-xl border-2 bg-orange-500 text-white md:grid-cols-4">
        <StatItem value={`${data.riders}+`} label="Registered Riders" />
        <StatItem
          value={`${data.orders.toLocaleString()}+`}
          label="Orders Delivered"
        />
        <StatItem
          value={`${data.restaurants}+`}
          label="Restaurants Partnered"
        />
        <StatItem
          value={`${data.foodItems.toLocaleString()}+`}
          label="Food Items"
        />
      </div>
    </section>
  );
}

function StatItem({ value, label }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 border-r border-white/40 py-6 last:border-r-0">
      <p className="text-3xl font-extrabold md:text-4xl">{value}</p>
      <p className="text-xs font-medium uppercase tracking-wide md:text-sm">
        {label}
      </p>
    </div>
  );
}
