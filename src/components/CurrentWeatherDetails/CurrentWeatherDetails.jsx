import PropTypes from 'prop-types';
import Icon from "react-icons-kit";
import { arrowUp } from "react-icons-kit/feather/arrowUp";
import { arrowDown } from "react-icons-kit/feather/arrowDown";
import { droplet } from "react-icons-kit/feather/droplet";
import { wind } from "react-icons-kit/feather/wind";
import { activity } from "react-icons-kit/feather/activity";
import './CurrentWeatherDetails.css'

function CurrentWeatherDetails({ citySearchData}) {
  if (!citySearchData || !citySearchData.data) {
    return <div className="error-msg">No Data Found</div>;
  }

  const { data } = citySearchData;

  return (
    <div className="current-weather-details-box">
      <div className="details-box-header">
        <h4>Current Weather</h4>
        {/* <div className="switch" onClick={toggleUnit}>
          <div className={`switch-toggle ${unit === "metric" ? "c" : "f"}`}></div>
          <span className="c">C</span>
          <span className="f">F</span>
        </div> */}
      </div>
      <div className="weather-details-container">
        <div className="details">
          <h4 className="city-name">{data.name}</h4>
          <div className="icon-and-temp">
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt="icon"
            />
            <h1>{data.main.temp}&deg;</h1>
          </div>
          <h4 className="description">{data.weather[0].description}</h4>
        </div>
        <div className="metrices">
          <h4>Feels like {data.main.feels_like}&deg;C</h4>
          <div className="key-value-box">
            <div className="key">
              <Icon icon={arrowUp} size={20} className="icon" />
              <span className="value">{data.main.temp_max}&deg;C</span>
            </div>
            <div className="key">
              <Icon icon={arrowDown} size={20} className="icon" />
              <span className="value">{data.main.temp_min}&deg;C</span>
            </div>
          </div>
          <div className="key-value-box">
            <div className="key">
              <Icon icon={droplet} size={20} className="icon" />
              <span>Humidity</span>
            </div>
            <div className="value">
              <span>{data.main.humidity}%</span>
            </div>
          </div>
          <div className="key-value-box">
            <div className="key">
              <Icon icon={wind} size={20} className="icon" />
              <span>Wind</span>
            </div>
            <div className="value">
              <span>{data.wind.speed}kph</span>
            </div>
          </div>
          <div className="key-value-box">
            <div className="key">
              <Icon icon={activity} size={20} className="icon" />
              <span>Pressure</span>
            </div>
            <div className="value">
              <span>{data.main.pressure}hPa</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

CurrentWeatherDetails.propTypes = {
  citySearchData: PropTypes.shape({
    data: PropTypes.shape({
      name: PropTypes.string.isRequired,
      weather: PropTypes.arrayOf(
        PropTypes.shape({
          icon: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
        })
      ).isRequired,
      main: PropTypes.shape({
        temp: PropTypes.number.isRequired,
        feels_like: PropTypes.number.isRequired,
        temp_max: PropTypes.number.isRequired,
        temp_min: PropTypes.number.isRequired,
        humidity: PropTypes.number.isRequired,
        pressure: PropTypes.number.isRequired,
      }).isRequired,
      wind: PropTypes.shape({
        speed: PropTypes.number.isRequired,
      }).isRequired,
    }),
  }),
  unit: PropTypes.string.isRequired,
  toggleUnit: PropTypes.func.isRequired,
};

export default CurrentWeatherDetails;