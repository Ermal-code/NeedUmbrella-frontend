import React from "react";
import axios from "../helpers/apiCall";

const WeatherContent = (props) => {
  const imageBG = (type) => {
    let url;
    if (type === "Clouds") {
      url = `url(https://highlightcoin.io/wp-content/uploads/2018/07/image_content_1422355_20180412083336-750x432.jpg)`;
    } else if (type === "Clear") {
      url = `url(https://i.pinimg.com/736x/92/80/9d/92809d667c699d9d561db905fea0b85c.jpg)`;
    } else if (type === "Snow") {
      url = `url(https://c1.wallpaperflare.com/preview/487/784/986/snow-snowstorm-snowy-weather.jpg)`;
    } else if (type === "Haze") {
      url = `url(https://p0.pikist.com/photos/34/668/fog-trueb-trees-landscape-nature-haze-weather-forest-light.jpg)`;
    } else if (type === "Rain") {
      url = `url(https://wpcdn.us-east-1.vip.tn-cloud.net/www.myneworleans.com/content/uploads/2021/04/r/y/gettyimages-1257951336.jpg)`;
    }
    return url;
  };
  const convertToDate = (number, type = "short") => {
    const unixTimestamp = number;
    const milliseconds = unixTimestamp * 1000; // 1575909015000
    const dateObject = new Date(milliseconds);
    const humanDateFormat = dateObject.toLocaleString("en-US", {
      weekday: "long",
      month: "short",
      year: "numeric",
    });

    const humanDateFormatshort = dateObject.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });

    if (type === "long") {
      return humanDateFormat;
    } else {
      return humanDateFormatshort;
    }
  };

  const addToFav = async (city) => {
    try {
      const resp = await axios.post(
        `${process.env.REACT_APP_BE_URL}/users/addToFav`,
        { favorite: `${city}` },
        {
          headers: {
            "Content-Type": "application/json",
          },

          withCredentials: true,
        }
      );
      if (resp.statusText === "OK") {
        props.addCity(city);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromFav = async (city) => {
    try {
      const resp = await axios.post(
        `${process.env.REACT_APP_BE_URL}/users/removeFromFav`,
        { favorite: `${city}` },
        {
          headers: {
            "Content-Type": "application/json",
          },

          withCredentials: true,
        }
      );
      if (resp.statusText === "OK") {
        props.removeCity(city);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const weather = props.weatherData;
  return (
    <div>
      <div
        style={{
          backgroundImage: imageBG(weather.weather[0].main),
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          position: "relative",
        }}
        className="weatherContent stay"
      >
        <div className="mBody">
          <h1 className="text-center mt-3">
            {weather.name}
            {"     "}
            {props.cityList.includes(weather.name) ? (
              <i
                className="fas fa-star"
                onClick={() => removeFromFav(weather.name)}
              ></i>
            ) : (
              <i
                className="far fa-star"
                onClick={() => addToFav(weather.name)}
              ></i>
            )}
          </h1>
          <div className="d-flex justify-content-between pt-5">
            <div
              className="border-right border-light pl-2 text-center "
              style={{ width: "33%" }}
            >
              <h5>Max</h5>
              <h5>{Math.floor(weather.main.temp_max)} &#8451;</h5>
            </div>
            <div
              className="border-right border-light pl-2  text-center"
              style={{ width: "33%" }}
            >
              <h5>Min</h5>
              <h5>{Math.floor(weather.main.temp_min)} &#8451;</h5>
            </div>
            <div className="text-center pl-2" style={{ width: "33%" }}>
              <h5>Feels Like</h5>
              <h5>{Math.floor(weather.main.feels_like)} &#8451;</h5>
            </div>
          </div>
          <div className="d-flex px-4 justify-content-between align-items-center mx-5">
            <div className="mt-4 d-flex justify-content-between align-items-center">
              <h5>Sunrise</h5>
              <img
                height="45px"
                src={`https://openweathermap.org/img/wn/01d@2x.png`}
              />

              <h5>{convertToDate(weather.sys.sunrise)}</h5>
            </div>
            <div className="mt-4  d-flex justify-content-between align-items-center">
              <h5>Sunset</h5>
              <img
                height="45px"
                src={`https://openweathermap.org/img/wn/01n@2x.png`}
              />

              <h5>{convertToDate(weather.sys.sunset)}</h5>
            </div>
          </div>
          <div>
            <h3 className="text-center mt-5">Temperature</h3>

            <div className="showTemp">
              <h4 style={{ fontSize: "90px", marginBottom: 0 }}>
                {Math.floor(weather.main.temp)} &#8451;
              </h4>
              <img
                height="150px"
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              />
            </div>
            <h4 className="text-center">{weather.weather[0].main}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherContent;
