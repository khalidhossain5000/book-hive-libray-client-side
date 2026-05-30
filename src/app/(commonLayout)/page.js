import Banner from "@/components/homePage/Banner/Banner";
import CategoriesSection from "@/components/homePage/Category/CategoriesSection";
import Info from "@/components/homePage/InfoSection/Info";
import PopularBooks from "@/components/homePage/PopularBooksSection/PopularBooks";
import React from "react";

const HomePage = () => {
  return (
    <div>
 
        <Banner />
        <CategoriesSection />
   <PopularBooks/>
   <Info/>
    </div>
  );
};

export default HomePage;
