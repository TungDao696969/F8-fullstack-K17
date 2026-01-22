// components/PartnerSections.tsx
import { Button } from "@/components/ui/button";

export default function PartnerSections() {
  const handlePartnerClick = () => {
    alert("Redirect to Business Partner Signup");
  };

  const handleRiderClick = () => {
    alert("Redirect to Rider Signup");
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Partner with us */}
        <div className="group relative overflow-hidden rounded-2xl">
          <img
            src="https://watermark.lovepik.com/photo/20211211/large/lovepik-chef-with-pasta-picture_501805839.jpg"
            alt="Partner with us"
            className="
              h-full w-full object-cover
              transition-transform duration-500 ease-out
              group-hover:scale-110
            "
          />

          <div className="absolute inset-0 bg-black/20" />

          {/* Badge */}
          <span className="absolute left-6 top-4 rounded-b-xl bg-white px-4 py-2 text-xs font-semibold">
            Earn more with lower fees
          </span>

          {/* Content */}
          <div className="absolute bottom-6 left-6 z-10 max-w-sm text-white">
            <p className="mb-1 text-sm text-orange-400">Signup as a business</p>
            <h3 className="mb-4 text-3xl font-extrabold">Partner with us</h3>
            <Button
              onClick={handlePartnerClick}
              className="rounded-full bg-orange-500 px-6 hover:bg-orange-600 cursor-pointer"
            >
              Get Started
            </Button>
          </div>
        </div>

        {/* Ride with us */}
        <div className="group relative overflow-hidden rounded-2xl">
          <img
            src="https://watermark.lovepik.com/photo/20211211/large/lovepik-the-image-of-a-western-chef-with-dishes-picture_501805084.jpg"
            alt="Ride with us"
            className="
              h-full w-full object-cover
              transition-transform duration-500 ease-out
              group-hover:scale-110
            "
          />

          <div className="absolute inset-0 bg-black/20" />

          {/* Badge */}
          <span className="absolute left-6 top-4 rounded-b-xl bg-white px-4 py-2 text-xs font-semibold">
            Avail exclusive perks
          </span>

          {/* Content */}
          <div className="absolute bottom-6 left-6 z-10 max-w-sm text-white">
            <p className="mb-1 text-sm text-orange-400">Signup as a rider</p>
            <h3 className="mb-4 text-3xl font-extrabold">Ride with us</h3>
            <Button
              onClick={handleRiderClick}
              className="rounded-full bg-orange-500 px-6 hover:bg-orange-600 cursor-pointer"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
