import axios from "axios";
import { server } from "../../server";

// create product
export const createProduct =
  (
    name,
    description,
    category,
    tags,
    originalPrice,
    discountPrice,
    stock,
    shopId,
    images
  ) =>
    async (dispatch) => {
      try {
        dispatch({
          type: "productCreateRequest",
        });

        const { data } = await axios.post(`${server}/api/v2/product/create-product`,
          name,
          description,
          category,
          tags,
          originalPrice,
          discountPrice,
          stock,
          shopId,
          images,
        );
        dispatch({
          type: "productCreateSuccess",
          payload: data.product,
        });
      } catch (error) {
        dispatch({
          type: "productCreateFail",
          payload: error.message,
        });
      }
    };

// get All Products of a shop
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsShopRequest",
    });

    const { data } = await axios.get(
      `${server}/api/v2/product/get-all-products-shop/${id}`
    );
    console.log(data)
    dispatch({
      type: "getAllProductsShopSuccess",
      payload: data.products,
    });
    console.log(data)
  } catch (error) {
    dispatch({
      type: "getAllProductsShopFailed",
      payload: error.response.data.message,
    });
  }
};

// delete product of a shop
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProductRequest",
    });

    const { data } = await axios.delete(
      `${server}/api/v2/product/delete-shop-product/${id}`,
      {
        headers: {
          "x-access-token": localStorage.getItem("seller_token")
        }
      }
    );

    dispatch({
      type: "deleteProductSuccess",
      payload: data.message,
    });

    // Reload the window after a successful deletion
    window.location.reload();
  } catch (error) {
    dispatch({
      type: "deleteProductFailed",
      payload: error.response.data.message,
    });
  }
};


// get all products
// export const getAllProducts = () => async (dispatch) => {
//   try {
//     dispatch({
//       type: "getAllProductsRequest",
//     });

//     const { data } = await axios.get(`${server}/api/v2/product/get-all-products`);
//     dispatch({
//       type: "getAllProductsSuccess",
//       payload: data.products,
//     });
//   } catch (error) {
//     dispatch({
//       type: "getAllProductsFailed",
//       payload: error.response.data.message,
//     });
//   }
// };

export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsRequest",
    });

    const firebaseUrl = `https://firestore.googleapis.com/v1/projects/zeedata-1/databases/(default)/documents/products`;

    // Fetching data from Firebase Firestore
    const { data } = await axios.get(firebaseUrl);

    // Firebase response structure: documents are in `data.documents`
    const products = data.documents.map(doc => ({
      id: doc.name.split('/').pop(), // Extracting document ID from `name`
      ...doc.fields, // Extracting the fields (product details)
    }));

    dispatch({
      type: "getAllProductsSuccess",
      payload: products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsFailed",
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};