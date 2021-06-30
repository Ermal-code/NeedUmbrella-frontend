import React from "react";

const FavoriteCities = ({ cityList, fetchWeather }) => {
  return (
    <div className="p-2 pb-5 mb-3">
      <div className="cityList">
        <h4 className="text-center mt-3">Favorite Cities</h4>
        <ul className="mt-4">
          {cityList.map((theCity, index) => (
            <li
              key={`city${index}`}
              onClick={(e) => {
                fetchWeather(e.currentTarget.innerText);
              }}
            >
              {theCity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FavoriteCities;
