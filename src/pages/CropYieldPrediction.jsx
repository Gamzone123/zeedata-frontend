import React, { useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import field from '../Assests/predic_img.png';
import { PuffLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
const CropYieldPrediction = () => {
  const {t} = useTranslation()
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [prediction, setprediction] = useState("")
  const [formData, setFormData] = useState({
    fieldArea: "",
    temperature: "",
    waterAvailability: "",
    soilType: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if any field is empty
    if (
      !formData.fieldArea ||
      !formData.temperature ||
      !formData.waterAvailability ||
      !formData.soilType
    ) {
      toast.error("Please fill in all fields");
      return;
    }
  
    console.log(formData); // For testing, log form data
    const url = "https://pythonscript.onrender.com/cyppredict"; // URL to post the data
    // setShowOTPModal(true)
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Region: 1,
          CropType: 2,
          Year: 2024,
          FieldArea: parseInt(formData.fieldArea),
          Temperature: parseInt(formData.temperature),
          WaterAvailablity: parseInt(formData.waterAvailability),
          SoilType: parseInt(formData.soilType),
        }),
      });
  
      const data = await response.json();
      // console.log('Response:', data);
      // console.log(data.prediction[0]);
      setprediction(data.prediction[0] * 100);
      setShowOTPModal(true);
      setFormData({
        fieldArea: "",
        temperature: "",
        waterAvailability: "",
        soilType: "",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  
  return (
    <>
      <Header activeHeading={3} />
      <div className="flex justify-center" >
      <div className="w-[50%]  p-6 items-center justify-center flex">
  {/* Card Content */}
  <div className="bg-[white] shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <h2 className="text-xl font-bold mb-4">{t("Instructions")}</h2>
    <p className="text-gray-700 text-base">
      {t("inst")}
    </p>
   
    {/* Temperature */}
    <h2 className="text-xl font-bold mt-6 mb-2">{t("Temperature")}</h2>
    <p className="text-gray-700 text-base">
      <strong>Low:</strong> Temperature less than or equal to 15°C<br />
      <strong>Medium:</strong> Temperature between 15°C and 25°C<br />
      <strong>High:</strong> Temperature between 25°C and 45°C
    </p>
    {/* Water Availability */}
    <h2 className="text-xl font-bold mt-6 mb-2">{t("Water Availability")}</h2>
    <p className="text-gray-700 text-base">
      <strong>Low:</strong> Less than or equal to 15,000 m³ per hectare<br />
      <strong>Medium:</strong> Between 15,000 m³ and 25,000 m³ per hectare<br />
      <strong>High:</strong> Between 25,000 m³ and 35,000 m³ per hectare
    </p>
    {/* Soil Type */}
    <h2 className="text-xl font-bold mt-6 mb-2">{t("Soil Type")}</h2>
    <p className="text-gray-700 text-base">
      {t("Soiltext")}
      <br />
      <strong>-</strong> Loamy
      <br />
      <strong>-</strong> Clay
      <br />
      <strong>-</strong> Silt
      <br />
      <strong>-</strong> Loamy
    </p>
  </div>
</div>


    
<div className="isolate w-[50%] bg-white p-6 py-24 sm:py-32 ">
  <div className="mx-auto max-w-2xl text-center">
    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t("Crop Yield Prediction")}</h2>
    <p className="mt-2 text-lg leading-8 text-gray-600">
      {t("cyptext")}
    </p>
  </div>
  <form onSubmit={handleSubmit} method="POST" className="mx-auto mt-16 max-w-xl sm:mt-10">
          <div className="sm:col-span-2">
            {/* Field Area */}
            <div className="mb-6">
              <label htmlFor="fieldArea" className="block text-sm font-semibold leading-6 text-gray-900">
                Field Area (Acres)
              </label>
              <div className="mt-2.5">
              <input
  type="text"
  name="fieldArea"
  id="fieldArea"
  value={formData.fieldArea}
  onChange={handleChange}
  autoComplete=""
  pattern="[0-9]*" // Accept only digits
  className="block w-full h-[50px] rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 decoration-none sm:text-sm sm:leading-6"
/>
              </div>
            </div>
            {/* Temperature */}
            <div className="mb-6">
              <label htmlFor="temperature" className="block text-sm font-semibold leading-6 text-gray-900">
                Temperature
              </label>
              <select
                id="temperature"
                name="temperature"
                value={formData.temperature}
                onChange={handleChange}
                className="block w-full h-[50px] rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                  <option value="">Select Temperature</option>
                <option value="15">Low (&le; 15°C)</option>
                <option value="25">Medium (15°C - 25°C)</option>
                <option value="45">High (25°C - 45°C)</option>
              </select>
            </div>
            {/* Water Availability */}
            <div className="mb-6">
              <label htmlFor="waterAvailability" className="block text-sm font-semibold leading-6 text-gray-900">
                Water Availability
              </label>
              <select
                id="waterAvailability"
                name="waterAvailability"
                value={formData.waterAvailability}
                onChange={handleChange}
                className="block w-full h-[50px] rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                  <option value="">Select Water Availablilty</option>
                <option value="15000">Low (&le; 15,000 m³ per hectare)</option>
                <option value="25000">Medium (15,000 m³ - 25,000 m³ per hectare)</option>
                <option value="35000">High (25,000 m³ - 35,000 m³ per hectare)</option>
              </select>
            </div>
            {/* Soil Type */}
            <div className="mb-6">
              <label htmlFor="soilType" className="block text-sm font-semibold leading-6 text-gray-900">
                Soil Type
              </label>
              <select
  id="soilType"
  name="soilType"
  value={formData.soilType}
  onChange={handleChange}
  className="block w-full h-[50px] rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
>
  <option value="">Select Soil Type</option>
  <option value="1">Loamy</option>
  <option value="2">Clay</option>
  <option value="3">Silt</option>
  <option value="4">Other</option>
</select>

            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Calculate
            </button>
          </div>
        </form>
</div>


    <div className="w-[50%] p-6 items-center justify-center flex">
  {/* Card Content */}
  <div className="bg-white shadow-md rounded ">
    <img src={field} alt="" />
  </div>
</div>

{showOTPModal && (
          <div className="absolute z-10 p-20 inset-0 ">
            <div className="flex items-end justify-center  pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              {/* Background overlay */}
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
  
              {/* Centered content */}
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                {/* Modal Header with Close Button */}
                <div className="absolute top-0 right-0 p-4 cursor-pointer">
                  <button onClick={() => setShowOTPModal(false)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6 text-gray-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
  
                {/* OTP Form */}
                <form >
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h2
                          className="text-lg leading-6 font-medium text-gray-900"
                          id="modal-title"
                        >
                          Crop Yield Prediction
                        </h2>
                        <p style={{ color: "red", fontSize: "20px" }}>
                          The Results of the predictions are:
                        </p>
                        <div className="mt-2">
                          Production: {prediction} kg/acre
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </form>
              </div>
            </div>
          </div>
        )}

    </div>
      <Footer />
    </>
  );
};

export default CropYieldPrediction;
