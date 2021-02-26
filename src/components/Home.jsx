import React, { useEffect, useState } from "react";
import { Row, Col, InputGroup, FormControl, Button } from "react-bootstrap";

import WeatherContent from "./WeatherContent";

const Home = (props) => {
  const [cityList, setCityList] = useState([]);
  const [city, setCity] = useState("");
  const [show, setShow] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const [selectedCity, setSelectedCity] = useState("");
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

  useEffect(() => {
    if (weatherData.message) {
      setCityList((prevState) =>
        prevState.filter(
          (c) => c.toLocaleLowerCase() !== selectedCity.toLocaleLowerCase()
        )
      );
    }
  }, [weatherData]);

  const fetchUser = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BE_URL}/users/me`, {
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data);
        setCityList(data.favorites);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWeather = async (cityName = "prishtina") => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/weather/${cityName}`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();

      setWeatherData(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="headerUmb  text-light text-center p-2">
        <h1>DO I NEED AN UMBREALLA TODAY</h1>
      </div>
      <Row className="no-gutters">
        <Col
          md={8}
          className="text-light border-right border-bottom border-light"
        >
          <div
            className="d-flex justify-content-center"
            style={{ background: "#1c1c1d" }}
          >
            <InputGroup className="my-3 w-50">
              <FormControl
                placeholder="Search city..."
                aria-label="Search city..."
                aria-describedby="basic-addon2"
                value={city}
                onChange={(e) => setCity(e.currentTarget.value)}
              />
              <InputGroup.Append>
                <Button
                  variant="outline-light"
                  onClick={() => fetchWeather(city)}
                >
                  Search
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
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
        <Col md={4} className="text-light position-relative">
          <div className="addCity1 p-2 pb-5 mb-3">
            <div className="cityList">
              <h4 className="text-center">Favorites</h4>
              <ul className="mt-4">
                {cityList.map((theCity, index) => (
                  <li
                    key={`city${index}`}
                    onClick={(e) => {
                      setSelectedCity(e.currentTarget.innerText);
                      fetchWeather(e.currentTarget.innerText);
                      setShow(true);
                    }}
                  >
                    {capitalize(theCity)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div
            className="position-absolute text-center border-top border-light"
            style={{ bottom: 10, right: 0, left: 0 }}
          >
            <Button
              as="a"
              variant="outline-light"
              className="rounded-pill mt-3"
              style={{ width: "80%" }}
              href={`${process.env.REACT_APP_BE_URL}/users/logout`}
            >
              Sing Out
            </Button>
          </div>
        </Col>
      </Row>
      <div style={{ background: "#1c1c1d", height: "40px" }}></div>
    </>
  );
};

export default Home;
