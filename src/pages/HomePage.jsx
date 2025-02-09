import React from 'react'
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero/Hero";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import Sponsored from "../components/Route/Sponsored";
import Footer from "../components/Layout/Footer";
import ProductsPage from './ProductsPage';

const HomePage = () => {
  return (
    <div>
        <Header activeHeading={1} />
        <Hero />
        <br />
        <ProductsPage />
        {/* <FeaturedProduct /> */}
        <Sponsored />
        <Footer />
    </div>
  )
}

export default HomePage