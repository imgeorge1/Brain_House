import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import BrainHouseLogo from "../../assets/newbrainhouselogo.png";
import SignInModal from "../signin/SignInModal";
import useWidth from "../../hooks/useWidth";

const Header = () => {
  const location = useLocation();
  const categoryId = parseInt(location.pathname.split("/")[2]);
  const width = useWidth();
  const [hide, setHide] = useState(true);

  const toggleMenu = () => {
    setHide(!hide);
  };

  return (
    <header className="relative w-full background flex items-center justify-between px-2 py-4 md:px-12 text-white">
      <NavLink
        to="/"
        className="flex items-center gap-2 text-white no-underline"
      >
        <img src={BrainHouseLogo} alt="logo" width={50} height={50} />
        <h5 className="text-2xl font-bold my-auto">Brain House</h5>
      </NavLink>

      {(width >= 768 || !hide) && (
        <div
          className="flex bg-black bg-opacity-50 md:bg-transparent w-full h-screen flex-col pl-5 md:flex-row absolute top-0 pt-24
        left-[40%] bottom-0 z-10 gap-10 md:h-full md:p-0 md:static md:w-auto"
        >
          <NavLink to="/" className="nav-link text-white fs-4 no-underline">
            მთავარი
          </NavLink>

          <NavLink
            to={`/tickets/${categoryId || 0}`}
            className="nav-link text-white fs-4 "
          >
            მართვის ბარათი
          </NavLink>
          <NavLink
            to="/courses"
            className="nav-link text-white fs-4 no-underline"
          >
            კურსები
          </NavLink>
        </div>
      )}

      {width < 768 &&
        (hide ? (
          <button onClick={toggleMenu} className="space-y-1">
            <div className="w-[35px] h-[5px] bg-black"></div>
            <div className="w-[35px] h-[5px] bg-black"></div>
            <div className="w-[35px] h-[5px] bg-black"></div>
          </button>
        ) : (
          <h1
            onClick={toggleMenu}
            className="z-20 mt-[-50px] ml-[-125px] text-3xl"
          >
            X
          </h1>
        ))}

      {(width >= 768 || !hide) && (
        <div className="z-20">
          <SignInModal />
        </div>
      )}
    </header>
  );
};

export default Header;
