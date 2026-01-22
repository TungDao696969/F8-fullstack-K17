// components/PopularCategories.tsx
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/api";
export default function PopularCategories() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      {/* Title */}
      <h2 className="mb-6 text-2xl font-extrabold">
        Order.uk Popular Categories <span className="ml-1">😄</span>
      </h2>

      {/* Categories */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
        {data.map((cat) => (
          <Card
            key={cat.id}
            className="group cursor-pointer border-none shadow-sm transition hover:shadow-md"
          >
            <CardContent className="p-3">
              <div className="mb-3 overflow-hidden rounded-xl bg-gray-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-32 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <h3 className="text-sm font-semibold text-gray-900">
                {cat.name}
              </h3>
              <p className="text-xs text-orange-500">
                {cat.restaurants} Restaurants
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
