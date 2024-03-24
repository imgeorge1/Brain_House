import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center">
      <h2 className="text-[48px] font-thin mt-1">Oops!</h2>
      <h1 className="text-[52px] font-black mb-1">404 Page Not Found</h1>
      <p className="text-[22px]">
        We're sorry, but the page you are looking for cannot be found. It may
        have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="">
        Go TO HOMEPAGE
      </Link>
    </div>
  );
};

export default NotFound;
