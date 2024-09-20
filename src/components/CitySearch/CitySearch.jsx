import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Icon from "react-icons-kit";
import { search } from "react-icons-kit/feather/search";
import './CitySearch.css';

function CitySearch({ city, setCity, handleCitySearch, loadings }) {
  const [inputValue, setInputValue] = useState(city);
  const debounceTimeoutRef = useRef(null);

  const handleChange = (e) => {
    const newCity = e.target.value;
    setInputValue(newCity);

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      setCity(newCity);
    }, 3000); // Adjust delay as needed
  };

  return (
    <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
      <label>
        <Icon icon={search} size={20} />
      </label>
      <input
        type="text"
        className="city-input"
        placeholder="Enter City"
        required
        value={inputValue}
        onChange={handleChange}
        readOnly={loadings}
      />
      <button type="button" onClick={handleCitySearch}>Search</button>
    </form>
  );
}

CitySearch.propTypes = {
  city: PropTypes.string.isRequired,
  setCity: PropTypes.func.isRequired,
  handleCitySearch: PropTypes.func.isRequired,
  loadings: PropTypes.bool.isRequired
};

export default CitySearch;
