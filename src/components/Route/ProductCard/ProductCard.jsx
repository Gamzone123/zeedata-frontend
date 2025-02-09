import React, { useState, useEffect } from "react";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { addTocart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "../../Products/Ratings";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  // Extract data from the Firebase response format
  const productData = {
    id: data._id['stringValue'], // Product ID
    name: data.name['stringValue'],
    description: data.description['stringValue'],
    category: data.category['stringValue'],
    stock: data.stock['integerValue'],
    originalPrice: data.originalPrice['integerValue'], // Corrected
    discountPrice: data.discountPrice['integerValue'], // Corrected
    shop: {
      id: data.shop['mapValue']['fields']._id['stringValue'],
      name: data.shop['mapValue']['fields'].name['stringValue'],
      email: data.shop['mapValue']['fields'].email['stringValue'],
      phoneNumber: data.shop['mapValue']['fields'].phoneNumber['integerValue'],
      address: data.shop['mapValue']['fields'].address['stringValue'],
    },
    images: data.images['arrayValue'].values.map((img) => img['mapValue']['fields'].url['stringValue']),
    ratings: data.reviews['arrayValue'].length,
    soldOut: data.sold_out['integerValue'],
    tags: data.tags['stringValue'],
  };

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === productData.id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (productData.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...productData, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
      <Link to={`/product/${productData.id}`}>
        <img
          src={productData.images && productData.images[0]}
          alt={productData.name}
          className="w-full h-[170px] object-contain"
        />
      </Link>

      <Link to="#">
        <h5 className={`${styles.shop_name}`}>{productData.shop.name}</h5>
      </Link>
      <Link to="#">
        <h4 className="pb-3 font-[500]">
          {productData.name.length > 40 ? productData.name.slice(0, 40) + "..." : productData.name}
        </h4>

        <div className="flex">
          <Ratings rating={productData.ratings} />
        </div>

        <div className="py-2 flex items-center justify-between">
          <div className="flex">
            <h5 className={`${styles.productDiscountPrice}`}>
              Rs. {productData.discountPrice || productData.originalPrice}
            </h5>
            {productData.originalPrice && (
              <h4 className={`${styles.price}`}>Rs. {productData.originalPrice}</h4>
            )}
          </div>
        </div>
      </Link>

      {/* Side options */}
      <div>
        {click ? (
          <AiFillHeart
            size={22}
            className="cursor-pointer absolute right-2 top-5"
            onClick={() => removeFromWishlistHandler(productData)}
            color={click ? "red" : "#333"}
            title="Remove from wishlist"
          />
        ) : (
          <AiOutlineHeart
            size={22}
            className="cursor-pointer absolute right-2 top-5"
            onClick={() => addToWishlistHandler(productData)}
            color={click ? "red" : "#333"}
            title="Add to wishlist"
          />
        )}
        <AiOutlineEye
          size={22}
          className="cursor-pointer absolute right-2 top-14"
          onClick={() => setOpen(!open)}
          color="#333"
          title="Quick view"
        />
        <AiOutlineShoppingCart
          size={25}
          className="cursor-pointer absolute right-2 top-24"
          onClick={() => addToCartHandler(productData.id)}
          color="#444"
          title="Add to cart"
        />

        {open ? <ProductDetailsCard setOpen={setOpen} data={productData} /> : null}
      </div>
    </div>
  );
};

export default ProductCard;
