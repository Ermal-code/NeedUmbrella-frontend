import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "../helpers/apiCall";
import EditOrDeleteModal from "./EditOrDeleteModal";
import FavoriteCities from "./FavoriteCities";
import Loader from "./Loader";
import SearchCity from "./SearchCity";
import UserBox from "./UserBox";
import WeatherContent from "./WeatherContent";

const Home = (props) => {
  const [cityList, setCityList] = useState([]);
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editProfile, setEditProfile] = useState(null);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

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
        fetchWeather(data.favorites[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWeather = async (cityName) => {
    try {
      setLoader(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BE_URL}/weather/${cityName}`,
        {
          withCredentials: true,
        }
      );
      if (response.statusText === "OK") {
        setError(null);
        setWeatherData(response.data);
        setLoader(false);
      }
    } catch (error) {
      const err = error.response.data;
      setError(err);
      setLoader(false);
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

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      {user && (
        <EditOrDeleteModal
          showModal={showModal}
          handleClose={handleClose}
          editProfile={editProfile}
          user={user}
          fetchUser={fetchUser}
          history={props.history}
        />
      )}
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
            {loader ? (
              <div className="weatherContent">
                <Loader />
              </div>
            ) : (
              <WeatherContent
                weatherData={weatherData}
                cityList={cityList}
                addCity={addCity}
                removeCity={removeCity}
                error={error}
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
          {user && (
            <UserBox
              user={user}
              capitalize={capitalize}
              fetchLogOut={fetchLogOut}
              handleShow={handleShow}
              setEditProfile={setEditProfile}
            />
          )}
        </Col>
      </Row>
      <div style={{ background: "#1c1c1d", height: "40px" }}></div>
    </>
  );
};

export default Home;
