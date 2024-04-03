import { useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import BrainHouseLogo from "../../assets/newbrainhouselogo.png";
import SignInModal from "../signin/SignInModal";
import useWidth from "../../hooks/useWidth/useWidth";
import { motion } from "framer-motion";
import { UserContext } from "../../context/UserContext";

const Header = () => {
  const location = useLocation();
  const categoryId = parseInt(location.pathname.split("/")[2]);
  const width = useWidth();
  const [hide, setHide] = useState(true);
  const { booleanPaid, currentUser } = useContext(UserContext);

  const toggleMenu = () => {
    setHide(!hide);
  };

  return (
    <header className="fixed z-50 top-0 w-full background flex items-center justify-between px-2 py-7 md:px-12 text-white">
      <motion.div
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <NavLink
          to="/"
          className="logo flex items-center gap-2 text-white no-underline"
        >
          <img src={BrainHouseLogo} alt="logo" width={50} height={50} />
          <h5 className="font-bold my-auto">Brain House</h5>
        </NavLink>
      </motion.div>

      {(width >= 1024 || !hide) && (
        <motion.nav
          initial={{ opacity: 0, y: -200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex lg:bg-transparent bg-opacity-50 bg-black md:bg-black md:bg-opacity-50 w-[55%] h-screen flex-col lg:flex-row absolute top-0
        right-0 bottom-0 z-10 gap-6 lg:h-full lg:p-0 lg:static lg:w-auto"
        >
          <NavLink
            to="/"
            className="nav-btn nav-link text-white no-underline text-center"
          >
            მთავარი
          </NavLink>

          <NavLink
            to={`/tickets/${categoryId || 0}`}
            className="nav-link text-white text-center"
          >
            მართვის ბარათი
          </NavLink>
          {booleanPaid && currentUser && (
            <NavLink
              to="/courses/21"
              className="nav-link text-white no-underline text-center"
            >
              კურსები
            </NavLink>
          )}
          {booleanPaid && currentUser && (
            <NavLink
              to="/exams"
              className="nav-link text-white no-underline text-center"
            >
              გამოცდა
            </NavLink>
          )}
        </motion.nav>
      )}

      {width < 1024 &&
        (hide ? (
          <button onClick={toggleMenu} className="space-y-1">
            <div className="w-[35px] h-[5px] bg-black"></div>
            <div className="w-[35px] h-[5px] bg-black"></div>
            <div className="w-[35px] h-[5px] bg-black"></div>
          </button>
        ) : (
          <h1
            onClick={toggleMenu}
            className="z-50 mt-[-60px] ml-[-100px] text-3xl absolute right-1"
          >
            x
          </h1>
        ))}

      {(width >= 1024 || !hide) && (
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="z-20 bigparent justify-center flex"
        >
          <SignInModal />
        </motion.div>
      )}
    </header>
  );
};

export default Header;
