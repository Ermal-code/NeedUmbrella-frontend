import React, { useEffect, useState } from "react";
import { Row, Col, InputGroup, FormControl, Button } from "react-bootstrap";

import WeatherContent from "./WeatherContent";

const Home = () => {
  const [cityList, setCityList] = useState([]);
  const [city, setCity] = useState("");
  const [show, setShow] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const [selectedCity, setSelectedCity] = useState("");

  const capitalize = (str) => {
    let str2 = str.slice(0, 1).toUpperCase() + str.slice(1);
    return str2;
  };

  const addCity = () => {
    if (city !== "") {
      setCityList((prevState) => [...prevState, city]);
      setCity("");
    }
  };
  useEffect(() => {
    console.log(selectedCity);
    console.log(cityList);
    if (weatherData.message) {
      setCityList((prevState) =>
        prevState.filter(
          (c) => c.toLocaleLowerCase() !== selectedCity.toLocaleLowerCase()
        )
      );
    }
  }, [weatherData]);

  const fetchWeather = async (cityName) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BE_URL}/weather/${cityName}`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);
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
      <Row>
        <Col md={8} className="text-light">
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
                <Button variant="outline-light" onClick={() => addCity()}>
                  Search
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
          <div>
            {weatherData.weather && (
              <WeatherContent weatherData={weatherData} />
            )}
          </div>
        </Col>
        <Col md={4} className="text-light">
          <div className="addCity1 p-2">
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
        </Col>
      </Row>
      <div style={{ background: "#1c1c1d", height: "40px" }}></div>
    </>
  );
};

export default Home;
