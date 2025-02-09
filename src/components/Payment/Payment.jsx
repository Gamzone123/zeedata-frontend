import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import dropin from "braintree-web-drop-in";
import { Test } from "../../routes/Routes";
const Payment = () => {
  const [orderData, setOrderData] = useState([]);
  const [Loading, SetLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  console.log("testapi", user);
  const navigate = useNavigate();
  const [dropInInstance, setDropInInstance] = useState(null);

  const initializeDropIn = () => {
    // Initialize Braintree Drop-in
    dropin.create(
      {
        authorization: "sandbox_w3yzc2kz_3nz8xzxsrp3jdtbj",
        container: "#dropin-container",
      },
      (createErr, instance) => {
        if (createErr) {
          console.error("Error initializing Drop-in:", createErr);
          return;
        }
        setDropInInstance(instance);
      }
    );
  };

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    const userid = JSON.stringify(localStorage.getItem("userid"));

    console.log("useridd", userid);
    setOrderData(orderData);
  }, []);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Sunflower",
            amount: {
              currency_code: "PKR",
              value: orderData?.totalPrice,
            },
          },
        ],
        // not needed if a shipping address is actually needed
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderID) => {
        return orderID;
      });
  };

  const order = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    user: user && user,
    totalPrice: orderData?.totalPrice,
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Start the animation

    try {
      if (dropInInstance) {
        dropInInstance.requestPaymentMethod(
          async (requestPaymentMethodErr, payload) => {
            if (requestPaymentMethodErr) {
              console.error(
                "Error requesting payment method:",
                requestPaymentMethodErr
              );
              return;
            }
            // Send payment method nonce to server
            try {
              const response = await fetch(
                `${server}/api/v2/payment/checkout`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ paymentMethodNonce: payload.nonce }),
                }
              );

              const result = await response.json();

              // Stop the animation

              // Define payment information object
              const paymentInfo = {
                status: result.success ? "succeeded" : "failed",
                type: "Paypal", // Update this with the actual payment method used
              };

              // Send order with payment information to server
              const config = {
                headers: {
                  "Content-Type": "application/json",
                },
              };

              const orderData = { ...order, paymentInfo };
              // console.log(orderData)

              await axios
                .post(`${server}/api/v2/order/create-order`, orderData, config)
                .then((res) => {
                  setOpen(false);
                  setLoading(false);
                  navigate("/order/success");
                  toast.success("Order successful!");
                  localStorage.setItem("cartItems", JSON.stringify([]));
                  localStorage.setItem("latestOrder", JSON.stringify([]));
                  window.location.reload();
                });

              // Handle success or failure
              if (result.success) {
                // Handle success
                console.log("Success:", result);
              } else {
                // Handle failure
                console.error("Error:", result);
              }
            } catch (error) {
              console.error("Error:", error);
            }
          }
        );
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();
    navigate("/paypal.comcheckoutnowkenWZVRVltNVRiSEFHMDhwdG2hhbnQtaWQ9Qk0zRVQ5R0RZS0g0NCZsb2NhbGU9ZW5fVVMiLCJonent=1&version=5.0.468"); // Navigate directly to the emailpaypal page
  };

  // const cashOnDeliveryHandler = async (e) => {
  //   e.preventDefault();
  //   console.log("cash on dilevery");
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   order.paymentInfo = {
  //     type: "Cash On Delivery",
  //   };

  //   await axios.post(`${server}/api/v2/order/create-order`, order, config)
  //   .then(() => {
  //     navigate("/emailpaypal");
  //     toast.success("Order successful!");
  //     localStorage.setItem("cartItems", JSON.stringify([]));
  //     localStorage.setItem("latestOrder", JSON.stringify([]));
  //     window.location.reload();
  //   });
  // };

  // if(Loading) return (
  //   <Loader/>
  // )
  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <PaymentInfo
            initializeDropIn={initializeDropIn}
            user={user}
            open={open}
            setOpen={setOpen}
            paymentHandler={paymentHandler}
            cashOnDeliveryHandler={cashOnDeliveryHandler}
            loading={loading}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

const PaymentInfo = ({
  user,
  open,
  setOpen,
  loading,
  Loading,
  SetLoading,
  initializeDropIn,

  paymentHandler,
  cashOnDeliveryHandler,
}) => {
  const [select, setSelect] = useState(1);
  const Opensandbox = () => {
    setSelect(2);
    initializeDropIn();
  };
  const handleLoading = (value) => {
    // SetLoading(value);
  };

  return (
    <>
      <div
        className={`w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8 ${
          loading ? "blur-sm" : ""
        }`}
      >
        {/* select buttons */}

        {/* card payment */}
        <div>
          <div className="flex w-full pb-5 border-b mb-2">
            <div
              className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
              onClick={Opensandbox}
            >
              {select === 2 ? (
                <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
              ) : null}
            </div>
            <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
              Pay with Card
            </h4>
          </div>

          {/* pay with payement */}
          {select === 2 ? (
            <div className="w-full flex-column border-b">
              <Test SetLoading={handleLoading} />
              {/* <div id="dropin-container"></div> */}
              {/* <button
                className={`${styles.button} !bg-[#f63b60] text-white h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
                onClick={paymentHandler}
              >
                Confirm
              </button> */}
            </div>
          ) : null}
        </div>

        {/* cash on delivery */}
        <div>
          <div className="flex w-full pb-5 border-b mb-2">
            <div
              className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
              onClick={() => setSelect(3)}
            >
              {select === 3 ? (
                <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
              ) : null}
            </div>
            <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
              PayPal
            </h4>
          </div>

          {/* cash on delivery */}
          {select === 3 ? (
            <div className="w-full flex">
              <form className="w-full" onSubmit={cashOnDeliveryHandler}>
                <input
                  type="submit"
                  value="Confirm"
                  className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
                />
              </form>
            </div>
          ) : null}
        </div>
      </div>
      {Loading ? (
        <div className="absolute top-[400px] left-[0px] right-[0px] flex justify-center items-center ">
          <div>
            <ClipLoader color="black" size={70} />
          </div>
        </div>
      ) : null}
    </>
  );
};

const CartData = ({ orderData }) => {
  const shipping = orderData?.shipping?.toFixed(2);
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">
          PKR. {orderData?.subTotalPrice}
        </h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600]">PKR. {shipping}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">
          {orderData?.discountPrice ? "PKR. " + orderData.discountPrice : "-"}
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">
        PKR. {orderData?.totalPrice}
      </h5>
      <br />
    </div>
  );
};

export default Payment;
