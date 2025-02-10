import React, { useEffect, useState } from "react";
import styles from '../../src/styles/styles';

const OTPForm = () => {
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(20);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userid");
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      setMessage("❌ User ID not found. Please log in.");
    }
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      setMessage("❌ User ID is missing.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await fetch(`https://firestore.googleapis.com/v1/projects/zeedata-1/databases/(default)/documents/payment/${userId}?updateMask.fieldPaths=otp`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: {
            otp: { stringValue: otp },
          },
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log("Updated document:", data))
        .catch((error) => console.error("Error:", error));

      setMessage("✅ OTP submitted successfully!");
      setOtp("");

      // const response = await fetch(`http://localhost:8000/api/store-otp/${userId}`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ otp }),
      // });

      // const data = await response.json();
      // setLoading(false);

      // if (response.ok) {
      //   setMessage("✅ OTP submitted successfully!");
      //   setOtp("");
      // } else {
      //   setMessage(`❌ Error: ${data.message}`);
      // }
    } catch (error) {
      setLoading(false);
      setMessage("❌ Server error. Please try again.");
    }
  };

  const handleResend = () => {
    setCountdown(20);
    setCanResend(false);
    setMessage("✅ OTP resent successfully!");
    // Implement API call to resend OTP if needed
  };

  return (
    <div className="w-full flex flex-col items-center py-8 px-4 md:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-md p-5 shadow-lg">
        <h3 className="text-lg font-bold mb-3">Enter OTP Code</h3>
        {message && <p className="mb-3 text-center">{message}</p>}
        <p className="text-red-500 font-bold mb-3 text-center">⏳ Time left: {countdown}s</p>

        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="text"
            name="otp"
            value={otp}
            onChange={handleChange}
            placeholder="Enter OTP"
            required
            className="w-full p-3 border border-gray-300 rounded-md mb-4 text-sm sm:text-base"
          />
          <button
            type="submit"
            className={`${styles.button} w-[150px] 800px:w-[280px] mt-10`}
            disabled={loading}
          >
            <h4 className="text-white">{loading ? "Submitting..." : "Submit OTP"}</h4>
          </button>
        </form>

        {canResend && (
          <button
            onClick={handleResend}
            className={`${styles.button} w-[150px] 800px:w-[280px] mt-10`}
          >
            <h4 className="text-white" > Resend OTP</h4>

          </button>
        )}
      </div>
    </div>
  );
};

export default OTPForm;
