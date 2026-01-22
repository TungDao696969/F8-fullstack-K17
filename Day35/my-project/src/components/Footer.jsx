import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Music, Ghost } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 pt-14">
      <div className="mx-auto max-w-7xl px-6">
        {/* TOP */}
        <div className="grid gap-10 md:grid-cols-4">
          {/* LOGO */}
          <div>
            <h2 className="text-3xl font-black">
              Order<span className="text-orange-500">UK</span>
            </h2>

            <div className="mt-4 flex gap-3">
              <Button asChild className="h-14 rounded-xl hover:bg-gray-800">
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

              <Button asChild className="h-14 rounded-xl hover:bg-gray-800">
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

            <p className="mt-4 text-sm text-gray-500">
              Company #490039-445, Registered with House of companies.
            </p>
          </div>

          {/* SUBSCRIBE */}
          <div>
            <h3 className="mb-4 font-bold">
              Get Exclusive Deals in your Inbox
            </h3>

            <div className="flex">
              <Input
                placeholder="youremail@gmail.com"
                className="rounded-r-none"
              />
              <Button className="rounded-l-none bg-orange-500 hover:bg-orange-600">
                Subscribe
              </Button>
            </div>

            <p className="mt-2 text-xs text-gray-400">
              we wont spam, read our email policy
            </p>

            {/* SOCIAL */}
            <div className="mt-4 flex gap-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600"
              >
                <Facebook className="h-5 w-5" />
              </a>

              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500"
              >
                <Instagram className="h-5 w-5" />
              </a>

              <a
                href="https://www.tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black"
              >
                <Music className="h-5 w-5" />
              </a>

              <a
                href="https://www.snapchat.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400"
              >
                <Ghost className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* LEGAL */}
          <div>
            <h4 className="mb-4 font-semibold">Legal Pages</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="/terms" className="hover:text-orange-500">
                  Terms and conditions
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-orange-500">
                  Privacy
                </a>
              </li>
              <li>
                <a href="/cookies" className="hover:text-orange-500">
                  Cookies
                </a>
              </li>
              <li>
                <a href="/modern-slavery" className="hover:text-orange-500">
                  Modern Slavery Statement
                </a>
              </li>
            </ul>
          </div>

          {/* LINKS */}
          <div>
            <h4 className="mb-4 font-semibold">Important Links</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="/help" className="hover:text-orange-500">
                  Get help
                </a>
              </li>
              <li>
                <a href="/partner" className="hover:text-orange-500">
                  Add your restaurant
                </a>
              </li>
              <li>
                <a href="/rider-signup" className="hover:text-orange-500">
                  Sign up to deliver
                </a>
              </li>
              <li>
                <a href="/business" className="hover:text-orange-500">
                  Create a business account
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="mt-12 bg-gray-900 py-4 text-center text-sm text-gray-400">
        © 2024 Order.uk. All Rights Reserved.
      </div>
    </footer>
  );
}
