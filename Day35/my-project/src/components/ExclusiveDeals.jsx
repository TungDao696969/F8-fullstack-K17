// components/ExclusiveDeals.tsx
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getDealsByCategory } from "@/services/api";

export default function ExclusiveDeals() {
  const [activeCategory, setActiveCategory] = useState("Pizza & Fast food");

  const {
    data: deals = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["deals", activeCategory],
    queryFn: () => getDealsByCategory(activeCategory),      
  });

  const categories = ["Vegan", "Sushi", "Pizza & Fast food", "Others"];

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-extrabold">
          Up to <span className="text-orange-500">-40%</span> 🎉 Order.uk
          exclusive deals
        </h2>

        <div className="flex gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              className={
                activeCategory === cat
                  ? "rounded-full bg-orange-500 hover:bg-orange-600"
                  : "rounded-full"
              }
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* States */}
      {isLoading && <p>Loading deals...</p>}
      {error && <p>Failed to load deals</p>}

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className="group relative overflow-hidden rounded-2xl shadow cursor-pointer"
          >
            <img
              src={deal.image}
              alt={deal.title}
              className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <Badge className="absolute right-3 top-3 bg-black text-white">
              -{deal.discount}%
            </Badge>

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-sm text-orange-400">Restaurant</p>
              <h3 className="text-lg font-bold">{deal.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
