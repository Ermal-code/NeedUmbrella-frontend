import React from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";

const SearchCity = ({ city, setCity, fetchWeather }) => {
  return (
    <div
      className="d-flex justify-content-center"
      style={{ background: "#1c1c1d" }}
    >
      <InputGroup className="my-3 mx-5 stay">
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
            onClick={() => {
              fetchWeather(city);
              setCity("");
            }}
            disabled={city === ""}
          >
            Search
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
};

export default SearchCity;
