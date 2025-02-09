import React from "react";
import styles from "../../styles/styles";

const Sponsored = () => {
  return (
    <div
      className={`${styles.section} hidden sm:block bg-white py-10 px-5 mb-12 cursor-pointer rounded-xl`}
    >
      <div className="flex justify-between w-full">
        <div className="flex items-start">
          <img
            src="https://championsofchangecoalition.org/wp-content/uploads/2022/07/Logo-Syngenta-Pakistan.png"
            alt=""
            style={{width:"250px", objectFit:"contain"}}
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/007/743/192/small/green-fresh-seeds-logo-design-natural-seed-logo-design-vector.jpg"
            style={{width:"250px", objectFit:"contain"}}
            alt=""
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTthZ4T5zQThg2QWxbxvLGJ4Z86g8aOjpUOCA&usqp=CAU"
            style={{width:"250px", objectFit:"contain"}}
            alt=""
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://championsofchangecoalition.org/wp-content/uploads/2022/07/Logo-Syngenta-Pakistan.png"
            style={{width:"250px", objectFit:"contain"}}
            alt=""
          />
        </div>
        <div className="flex items-start">
          <img
            src="https://mir-s3-cdn-cf.behance.net/projects/404/ca3926117369761.Y3JvcCw1ODM0LDQ1NjMsMCww.jpg"
            style={{width:"250px", objectFit:"contain"}}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Sponsored;
