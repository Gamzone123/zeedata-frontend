import React, { useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import prices from "../Assests/prices.png";
import { PuffLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { AiOutlineClose } from 'react-icons/ai';

const CropPricePrediction = () => {
  const { t } = useTranslation();
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [prediction, setprediction] = useState("");
  const handleRemovePrediction = () => {
    setprediction(false);
  };
  const jsonData = [
    {
      year: 2010,
      production: 23311,
      dollar_price: 93.66,
      wheat_price: 950,
    },
    {
      year: 2011,
      production: 25214,
      dollar_price: 102.14,
      wheat_price: 950,
    },
    {
      year: 2012,
      production: 23473,
      dollar_price: 101.005,
      wheat_price: 1050,
    },
    {
      year: 2013,
      production: 24211,
      dollar_price: 102.95,
      wheat_price: 1200,
    },
    {
      year: 2014,
      production: 25979,
      dollar_price: 104.62,
      wheat_price: 1200,
    },
    {
      year: 2015,
      production: 25086,
      dollar_price: 105.38,
      wheat_price: 1300,
    },
    {
      year: 2016,
      production: 25633,
      dollar_price: 122.38,
      wheat_price: 1300,
    },
    {
      year: 2017,
      production: 26674,
      dollar_price: 150.64,
      wheat_price: 1300,
    },
    {
      year: 2018,
      production: 25076,
      dollar_price: 161.51,
      wheat_price: 1300,
    },
    {
      year: 2019,
      production: 24349,
      dollar_price: 162.09,
      wheat_price: 1300,
    },
    {
      year: 2020,
      production: 25248,
      dollar_price: 206.815,
      wheat_price: 1400,
    },
    {
      year: 2021,
      production: 27464,
      dollar_price: 282.83,
      wheat_price: 1800,
    },
    {
      year: 2022,
      production: 26400,
      dollar_price: 278.75,
      wheat_price: 2200,
    },
    {
      year: 2023,
      production: 26810,
      dollar_price: 278.75,
      wheat_price: 3900,
    },
  ];
  const handlePredict = async (event) => {
    event.preventDefault(); // Prevent the form from causing a page refresh

    try {
      const response = await axios.post(
        "https://pythonscript.onrender.com/cpppredict"
      );
      const data = response.data; // Directly access the data property from Axios response
      console.log(data.new_prediction[0]);
      const roundedPrice = parseFloat(data.new_prediction[0]).toFixed(2);
      setprediction(roundedPrice);
    } catch (error) {
      toast.error("Failed to fetch price prediction: " + error.message); // Improved error handling
    }
  };

  return (
    <>
      <Header activeHeading={4} />
      <div className="items-center justify-center flex">
        <div className="w-[50%]  p-6 items-center ">
          {/* Card Content */}
          <div className="bg-[white] shadow-md rounded px-14 pt-6 pb-8 mb-4">
            <h2 className="text-center font-bold">
              Production and Price Trends for Wheat (2010-2023)
            </h2>
            <br />
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="text-left font-semibold">Year</th>
                  <th className="text-center  font-semibold">
                    Production(1000 MT)
                  </th>
                  <th className="text-right font-semibold">Wheat Price/50kg</th>
                </tr>
              </thead>
              <tbody>
                {jsonData.map((item, index) => (
                  <tr key={index} className=" border-b">
                    <td className="text-left p-2">{item.year}</td>
                    <td className="text-center p-2">{item.production}</td>
                    <td className="text-right p-2">{item.wheat_price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="isolate w-[50%] bg-white p-6 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Crop Price Prediction
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Enter the details below to predict the crop prices based on
              historical data and other influencing factors.
            </p>
            <form
              className="flex flex-col items-center"
              onSubmit={handlePredict}
            >
              <select
                className="border-2 w-full border-gray-300 p-2 rounded-lg"
                name="cropType"
                id="cropType"
              >
                <option value="wheat">Wheat</option>
              </select>
              <button
                type="submit"
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
              >
                Calculate Price
              </button>
            </form>

           

<div className="mt-4">
      { prediction && (
        <div className="relative shadow-lg border h-[80px] flex justify-center items-center text-lg text-bold">
          <div className="absolute right-2 top-2">
            <button onClick={handleRemovePrediction}>
              <AiOutlineClose />
            </button>
          </div>
          <p>
            The Forecasted wheat price for year 2024 is: {prediction}/50kg.
          </p>
        </div>
      )}
    </div>

          </div>
        </div>

        <div className="w-[50%] p-8 items-center justify-center flex">
          {/* Card Content */}
          <div className="bg-white shadow-md rounded ">
            <img width="625px" src={prices} alt="" />
          </div>
        </div>
      </div>ss
      <Footer />
    </>
  );
};

export default CropPricePrediction;