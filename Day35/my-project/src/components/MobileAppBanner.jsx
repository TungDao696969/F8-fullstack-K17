// components/MobileAppBanner.tsx
import { Button } from "@/components/ui/button";
import imgMobileApp from "../assets/mobileApp.png";

export default function MobileAppBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="relative overflow-hidden rounded-2xl bg-gray-100">
        <div className="grid grid-cols-1 items-center gap-8 p-6 md:grid-cols-2 md:p-12">
          {/* Image */}
          <div className="flex justify-center md:justify-start">
            <img
              src={imgMobileApp}
              alt="Mobile app ordering"
              className="w-full max-w-md object-contain"
            />
          </div>

          {/* Content */}
          <div>
            <h2 className="mb-4 text-3xl font-extrabold leading-tight md:text-4xl">
              Order.uk is more
              <span className="mt-2 block rounded-full bg-black px-4 py-2 text-white md:inline-block md:ml-2">
                <span className="text-orange-500 underline">Personalised</span> & Instant
              </span>
            </h2>

            <p className="mb-6 text-sm text-gray-600">
              Download the Order.uk app for faster ordering
            </p>

            {/* Store Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                className="h-14 rounded-xl bg-black px-6 hover:bg-gray-800"
              >
                <a
                  href="https://www.apple.com/app-store/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                    alt="Download on the App Store"
                    className="h-8"
                  />
                </a>
              </Button>

              <Button
                asChild
                className="h-14 rounded-xl bg-black px-6 hover:bg-gray-800"
              >
                <a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Get it on Google Play"
                    className="h-8"
                  />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
