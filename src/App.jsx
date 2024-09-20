import { useState, useEffect, useCallback } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { getCityData } from "./Store/Slices/WeatherSlice.js"; 
import CitySearch from "./components/CitySearch/CitySearch.jsx";
import CurrentWeatherDetails from "./components/CurrentWeatherDetails/CurrentWeatherDetails.jsx";
import Loader from "./components/Loader.jsx";

function App() {
  const { citySearchLoading, citySearchData } = useSelector((state) => state.weather);

  const [loadings, setLoadings] = useState(true);
  const [city, setCity] = useState("Peshawar");
  const [unit, setUnit] = useState("metric");

  const dispatch = useDispatch();

  useEffect(() => {
    const isAnyChildLoading = [citySearchLoading].some((state) => state);
    setLoadings(isAnyChildLoading);
  }, [citySearchLoading]);

  const fetchData = useCallback(() => {
    dispatch(getCityData({ city, unit }));
  }, [city, dispatch, unit]);

  useEffect(() => {
    fetchData();
  }, [unit, fetchData]);

  const toggleUnit = () => {
    setLoadings(true);
    setUnit(unit === "metric" ? "imperial" : "metric");
  };

  const handleCitySearch = (e) => {
    e.preventDefault();
    setLoadings(true);
    fetchData();
  };

  return (
    <div className="background">
      <div className="box">
        <CitySearch
          city={city}
          setCity={setCity}
          handleCitySearch={handleCitySearch}
          loadings={loadings}
        />
        <div className="current-weather-details-box">
          {loadings ? (
            <Loader loadings={loadings} />
          ) : (
            <>
              {citySearchData && citySearchData.error ? (
                <div className="error-msg">{citySearchData.error}</div>
              ) : (
                <CurrentWeatherDetails
                  citySearchData={citySearchData}
                  unit={unit}
                  toggleUnit={toggleUnit}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
