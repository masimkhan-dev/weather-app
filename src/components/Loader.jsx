import PropTypes from 'prop-types'; // Import PropTypes for validation
import { SphereSpinner } from "react-spinners-kit";

function Loader({ loadings }) {
  return (
    <div className="loader">
      <SphereSpinner loading={loadings} color="#2fa5ed" size={20} />
    </div>
  );
}

// PropTypes validation for loadings
Loader.propTypes = {
  loadings: PropTypes.bool.isRequired,
};

export default Loader;
