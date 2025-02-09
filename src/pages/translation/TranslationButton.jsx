import React, { useState } from 'react';
import i18n from "../../i18n";

const TranslationButton = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const chooseLanguage = (e) => {
    e.preventDefault();
    i18n.changeLanguage(e.target.value);
    setSelectedLanguage(e.target.value);
  };

  return (
    <div style={{ display: "flex", gap: "30px" }}>
      <select defaultValue={selectedLanguage} onChange={chooseLanguage} className="block w-24 py-2 px-3 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" >
              <option value="en">English</option>
              <option value="ur">اردو</option>
            </select>
    </div>
  );
};

export default TranslationButton;
