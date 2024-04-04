import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center mt-40 mb-96 md:mb-20">
      <h2 className="text-[44px] font-thin errorpage-oops mb-6">Oops!</h2>
      <h1 className="text-[64px] font-black errorpage-404 my-8">
        404 Page Not Found
      </h1>
      <p className="text-[18px] errorpage-text mb-5">
        We're sorry, but the page you are looking for cannot be found. It may
        have been removed,
        <br /> had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="justify-center inline-flex text-[18px]">
        <a>
          Go TO <span className="errorpage-link">HOMEPAGE</span>{" "}
          <span className="text-[25px]">←</span>
        </a>
      </Link>
    </div>
  );
};

export default NotFound;
