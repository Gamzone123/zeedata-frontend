import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";
import { useTranslation } from 'react-i18next';

const FeaturedProduct = () => {
  const { t } = useTranslation();
  const seeds = [
    {
      id: 1,
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUk0OsgJ4UWfQgBAmWYBnVbn_5zibas_OA6Q&usqp=CAU",
      name: "Sunflower Seeds",
      description: "Premium sunflower seeds for a beautiful garden.",
      originalPrice: 990,
      discountPrice: 890,
      ratings: 4.5,
    },
    {
      id: 2,
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLWwHz056wHvAuXieeg6NlTl1QnQRbSbXJHQ&usqp=CAU",
      name: "Tomato Seeds",
      description: "Organic tomato seeds for delicious homegrown tomatoes.",
      originalPrice: 490,
      discountPrice: 390,
      ratings: 3.8,
    },
    {
      id: 3,
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPJKzzI6GXjGl_C_vTtrZFpoQhNbKTsfGWdw&usqp=CAU",
      name: "Carrot Seeds",
      description: "Sweet and crisp carrot seeds for your vegetable garden.",
      originalPrice: 560,
      discountPrice: 460,
      ratings: 4.0,
    },
    {
      id: 4,
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzKSjfmU96dnsRgtNrNDol7ChHjJhp4ADCH5DwsBzsn2QnrVYmYon9QUe2A1LvM50cmCw&usqp=CAU",
      name: "Lettuce Seeds",
      description: "Fresh lettuce seeds for a healthy salad all year round.",
      originalPrice: 790,
      discountPrice: 690,
      ratings: 4.2,
    },
    {
      id:5,
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS55v5ASnMN5vwAcQnQTSNvMAbXrgtpbi_jGg&usqp=CAU",
      name: "Onion Seeds",
      description: "Fresh onion seeds for a healthy salad all year round.",
      originalPrice: 380,
      discountPrice: 280,
      ratings: 4.4,
    }
  ];
  // const {allProducts} = useSelector((state) => state.products);
 
   
  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>{t("featured-pro-heading")}</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
        {/* {
            allProducts && allProducts.length !== 0 &&(
              <>
               {allProducts && allProducts.map((i, index) => <ProductCard data={i} key={index} />)}
              </>
            )
           } */}
           

           {seeds.map((data)=>
           <ProductCard data={data} />
           )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;
