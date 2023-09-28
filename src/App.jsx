import { useState } from "react";
import axios from "axios";
import keys from "./keys";

const api = {
  key: keys.API_KEY,
  base: keys.BASE_URL,
};

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});

  const search = async (e) => {
    if (e.key === "Enter") {
      const res = await axios.get(
        `${api.base}weather?q=${city}&units=metric&APPID=${api.key}`
      );
      setCity("");
      setWeather(res.data);
      console.log("data", res.data);
    }
  };

  return (
    <div
      className={
        typeof weather.main !== "undefined"
          ? weather.main.temp > 18
            ? "App hot"
            : "App cold"
          : "App"
      }
    >
      <main>
        <div className=" flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold my-4">
            Let's check your city weather
          </h1>
          <input
            type="text"
            onChange={(e) => setCity(e.target.value)}
            value={city}
            onKeyPress={search}
            placeholder="search your city..."
            className="input search-bar input-bordered w-full max-w-sm"
          />
        </div>
        {typeof weather.main !== "undefined" ? (
          <div>
            <div className="location-container">
              <h1 className="location">
                {weather.name},{weather.sys.country}
              </h1>
              <h1 className="date"> {new Date().toDateString()}</h1>
              <div className="weather-container">
                <h3 className="temperature">
                  {Math.round(weather.main.temp)}°C
                </h3>
                <p>Feels Like: {Math.round(weather.main.feels_like)}°C</p>
                <p>wind speed: {weather.wind.speed}</p>

                <h2 className="weather">{weather.weather[0].main}</h2>
              </div>
            </div>
          </div>
        ) : (
          <div className="not-found">
            <p>Please Type your city name...</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
