import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "../helpers/apiCall";
import FavoriteCities from "./FavoriteCities";
import SearchCity from "./SearchCity";
import UserBox from "./UserBox";

import WeatherContent from "./WeatherContent";

const Home = (props) => {
  const [cityList, setCityList] = useState([]);
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [user, setUser] = useState({});

  const capitalize = (str) => {
    let str2 = str.slice(0, 1).toUpperCase() + str.slice(1);
    return str2;
  };

  const addCity = (city) => {
    if (city !== "") {
      setCityList((prevState) => [...prevState, capitalize(city)]);
    }
  };

  const removeCity = (city) => {
    setCityList((prevState) =>
      prevState.filter(
        (c) => c.toLocaleLowerCase() !== city.toLocaleLowerCase()
      )
    );
  };
  useEffect(() => {
    fetchUser();
    fetchWeather();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BE_URL}/users/me`,
        {
          withCredentials: true,
        }
      );

      const data = response.data;

      if (response.statusText === "OK") {
        setUser(data);
        setCityList(data.favorites);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWeather = async (cityName = "prishtina") => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BE_URL}/weather/${cityName}`,
        {
          withCredentials: true,
        }
      );

      setWeatherData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLogOut = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BE_URL}/users/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.statusText === "OK") {
        localStorage.setItem("LoggedIn", false);
        props.setIsLogedIn();
        props.history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Row className="no-gutters">
        <Col
          md={8}
          className="text-light border-right border-bottom border-light"
        >
          <SearchCity
            city={city}
            setCity={setCity}
            fetchWeather={fetchWeather}
          />
          <div className="border-top border-light">
            {weatherData.weather && (
              <WeatherContent
                weatherData={weatherData}
                cityList={cityList}
                addCity={addCity}
                removeCity={removeCity}
              />
            )}
          </div>
        </Col>
        <Col
          md={4}
          className="text-light position-relative"
          style={{ background: "#1c1c1d" }}
        >
          <FavoriteCities cityList={cityList} fetchWeather={fetchWeather} />
          <UserBox
            user={user}
            capitalize={capitalize}
            fetchLogOut={fetchLogOut}
          />
        </Col>
      </Row>
      <div style={{ background: "#1c1c1d", height: "40px" }}></div>
    </>
  );
};

export default Home;
