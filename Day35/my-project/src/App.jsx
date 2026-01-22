import React from "react";
import Header from "./components/Header";
import HeroBanner from "./components/Banner";
import ExclusiveDeals from "./components/ExclusiveDeals";
import PopularCategories from "./components/PopularCategories";
import PopularRestaurants from "./components/PopularRestaurants";
import MobileAppBanner from "./components/MobileAppBanner";
import PartnerSections from "./components/PartnerSections";
import KnowMoreTabs from "./components/KnowMoreTabs";
import StatsBanner from "./components/StatsBanner";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div>
      <div className="container mx-auto w-[1300px]">
        <Header />
        <HeroBanner />
        <ExclusiveDeals />
        <PopularCategories />
        <PopularRestaurants />
        <MobileAppBanner />
        <PartnerSections />
        <KnowMoreTabs />
        <StatsBanner />
        <Footer />
      </div>
    </div>
  );
}
