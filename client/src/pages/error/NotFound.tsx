import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1>404</h1>
      <h2>Oops!</h2>
      <h3>PAGE NOT FOUND</h3>
      <p>
        We're sorry, but the page you are looking for cannot be found. It may
        have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/">Go TO HOMEPAGE</Link>
    </div>
  );
};

export default NotFound;
