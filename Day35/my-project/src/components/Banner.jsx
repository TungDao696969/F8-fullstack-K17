import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import heroImg from "../assets/heroBanner1.png";
import heroImg2 from "../assets/heroBanner2.png";
export default function HeroBanner() {
  return (
    <section className="relative mx-auto mt-6 max-w-7xl overflow-hidden rounded-2xl bg-white shadow-sm">
      {/* CENTER IMAGE */}
      <img
        src={heroImg}
        alt="Center"
        className="pointer-events-none absolute left-[47%] top-1/2 z-30
             w-[310px] md:w-[430px] lg:w-[510px] xl:w-[500px]
             -translate-x-1/2 -translate-y-1/2
             drop-shadow-2xl"
      />
      <div className="grid grid-cols-1 items-center gap-10 p-6 md:grid-cols-2 md:p-12">
        {/* LEFT CONTENT */}
        <div>
          <p className="mb-3 text-sm text-gray-500">
            Order Restaurant food, takeaway and groceries.
          </p>

          <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-5xl">
            Feast Your Senses,
            <br />
            <span className="text-orange-500">Fast and Fresh</span>
          </h1>

          <div className="flex max-w-[300px] items-center gap-2 rounded-full border p-1 shadow-sm">
            <Input
              placeholder="e.g. EC4R 3TE"
              className="border-0 focus-visible:ring-0"
            />
            <Button className="rounded-full bg-orange-500 px-6 hover:bg-orange-600">
              Search
            </Button>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        {/* RIGHT CONTENT */}
        <div className="relative flex justify-end">
          {/* Orange background */}
          <div className="absolute right-0 -top-10 h-[180%] w-[80%] rounded-l-[160px] bg-orange-500" />

          {/* Image wrapper */}
          <div className="relative z-10 mr-60 flex items-center">
            <img src={heroImg2} alt="Food" className="w-[180px] md:w-[260px] h-[250px]" />
          </div>

          {/* FLOATING CARDS */}
          <div className="absolute right-6 top-1/2 z-20 -translate-y-1/2 space-y-6">
            {/* CARD 1 */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative w-64 rounded-xl bg-white p-4 shadow"
            >
              <span
                className="absolute -left-4 top-1/2 flex h-7 w-7 
        -translate-y-1/2 items-center justify-center 
        rounded-full bg-orange-500 text-sm font-bold text-white"
              >
                1
              </span>

              <p className="text-sm font-semibold">Order</p>
              <p className="text-xs text-gray-500">
                We’ve received your order!
              </p>
            </motion.div>

            {/* CARD 2 */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative w-64 rounded-xl bg-white p-4 shadow"
            >
              <span
                className="absolute -left-4 top-1/2 flex h-7 w-7 
        -translate-y-1/2 items-center justify-center 
        rounded-full bg-orange-500 text-sm font-bold text-white"
              >
                2
              </span>

              <p className="text-sm font-semibold">Order Accepted</p>
              <p className="text-xs text-gray-500">
                Your order will be delivered shortly
              </p>
            </motion.div>

            {/* CARD 3 */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="relative w-64 rounded-xl bg-white p-4 shadow"
            >
              <span
                className="absolute -left-4 top-1/2 flex h-7 w-7 
        -translate-y-1/2 items-center justify-center 
        rounded-full bg-orange-500 text-sm font-bold text-white"
              >
                3
              </span>

              <p className="text-sm font-semibold">Rider's nearby 🚴</p>
              <p className="text-xs text-gray-500">
                They're almost there – get ready!
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
