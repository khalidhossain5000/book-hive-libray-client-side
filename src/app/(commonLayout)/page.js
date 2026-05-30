import Banner from "@/components/homePage/Banner/Banner";
import CategoriesSection from "@/components/homePage/Category/CategoriesSection";
import Cta from "@/components/homePage/CtaSection/Cta";
import Flow from "@/components/homePage/FlowSection/Flow";
import Info from "@/components/homePage/InfoSection/Info";
import PopularBooks from "@/components/homePage/PopularBooksSection/PopularBooks";
import Testimonial from "@/components/homePage/TestimonialSection/Testimonial";
import Stats from "@/components/StatsSection/Stats";
import React from "react";

const HomePage = () => {
  return (
    <div>
 
        <Banner />
        <CategoriesSection />
   <PopularBooks/>
   <Info/>
   <Flow/>
   <Stats/>
   <Testimonial/>
   <Cta/>
    </div>
  );
};

export default HomePage;
