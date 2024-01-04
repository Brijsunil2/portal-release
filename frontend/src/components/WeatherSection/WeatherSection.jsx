import "./WeatherSection.css";
import { useState, useEffect, useRef } from "react";
import findLocation from "./findLocation.js";
import { Container, Spinner, Row, Col } from "react-bootstrap";

const kelvinToCelsius = (kelvinTemp) => kelvinTemp - 273.15;

const WeatherSection = () => {
  const init = useRef(false);
  const [weather, setWeather] = useState();
  useEffect(() => {
    if (!init.current) {
      findLocation().then(async (location) => {
        const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`;

        const res = await fetch(weatherURL);
        const jsonData = await res.json();
        setWeather(jsonData);
      });
    }

    return () => (init.current = true);
  }, [weather]);

  return (
    <>
      {weather ? (
        <Container className="weather-container">
          <Row>
            <p className="weather-header">{weather.weather[0].main}</p>
          </Row>
          <Row>
            <Col sm>
              <img
                className="weather-img"
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description + " image"}
              />
            </Col>
            <Col sm>
              <p className="weather-temp">
                {Math.round(kelvinToCelsius(weather.main.temp)) + "\u00B0C"}
              </p>
              <p className="weather-info">
                {"Feels Like: " +
                  Math.round(kelvinToCelsius(weather.main.feels_like)) +
                  "\u00B0C"}
              </p>
              <p className="weather-info">
                {"Low: " +
                  Math.round(kelvinToCelsius(weather.main.temp_min)) +
                  "\u00B0C"}
              </p>
              <p className="weather-info">
                {"High: " +
                  Math.round(kelvinToCelsius(weather.main.temp_max)) +
                  "\u00B0C"}
              </p>
            </Col>
          </Row>
          <Row>
            <Col sm>
              <p className="weather-info">{weather.weather[0].description}</p>
            </Col>
            <Col sm>
              <p className="weather-info">
                {"Humidity: " + weather.main.humidity + "%"}
              </p>
            </Col>
          </Row>
        </Container>
      ) : (
        <Container className="weather-container">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Container>
      )}
    </>
  );
};

export default WeatherSection;
