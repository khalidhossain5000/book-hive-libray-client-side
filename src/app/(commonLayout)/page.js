import Banner from '@/components/homePage/Banner/Banner';
import CategoriesSection from '@/components/homePage/Category/CategoriesSection';
import React from 'react';

const HomePage = () => {
    return (
        <div>
       
      
            <main><Banner/>
            <CategoriesSection/>
            </main>
        </div>
    );
};

export default HomePage;