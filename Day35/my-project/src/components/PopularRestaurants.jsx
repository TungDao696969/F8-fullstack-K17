import { useQuery } from "@tanstack/react-query";
import { getRestaurants } from "@/services/api";

export default function PopularRestaurants() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["restaurants"],
    queryFn: getRestaurants,
  });
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h2 className="mb-6 text-2xl font-extrabold">Popular Restaurants 🍔</h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex flex-col items-center rounded-xl p-4 shadow hover:-translate-y-1 hover:shadow-lg cursor-pointer"
          >
            <div
              className={`mb-3 flex h-20 w-20 items-center justify-center rounded-full ${item.bg}`}
            >
              <img
                src={item.logo}
                alt={item.name}
                className="h-10 object-contain"
              />
            </div>

            <p className="text-sm font-semibold">{item.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
