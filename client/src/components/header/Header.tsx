import { useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import BrainHouseLogo from "../../assets/newbrainhouselogo.png";
import SignInModal from "../signin/SignInModal";
import useWidth from "../../hooks/useWidth";
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
    <header className="relative w-full background flex items-center justify-between px-2 py-7 md:px-12 text-white">
      <motion.div
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <NavLink
          to="/"
          className="flex items-center gap-2 text-white no-underline"
        >
          <img src={BrainHouseLogo} alt="logo" width={50} height={50} />
          <h5 className="text-2xl font-bold my-auto">Brain House</h5>
        </NavLink>
      </motion.div>

      {(width >= 1024 || !hide) && (
        <motion.nav
          initial={{ opacity: 0, y: -200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex bg-black bg-opacity-50 md:bg-transparent w-[60%] h-screen flex-col pl-5 lg:flex-row absolute top-0 pt-24
        right-0 bottom-0 z-10 gap-10 lg:h-full lg:p-0 lg:static lg:w-auto"
        >
          <NavLink to="/" className="nav-link text-white no-underline">
            მთავარი
          </NavLink>

          <NavLink
            to={`/tickets/${categoryId || 0}`}
            className="nav-link text-white "
          >
            მართვის ბარათი
          </NavLink>
          {booleanPaid && currentUser && (
            <NavLink
              to="/courses/21"
              className="nav-link text-white no-underline"
            >
              კურსები
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
            className="z-20 mt-[-70px] ml-[-100px] text-3xl"
          >
            X
          </h1>
        ))}

      {(width >= 1024 || !hide) && (
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="z-20"
        >
          <SignInModal />
        </motion.div>
      )}
    </header>
  );
};

export default Header;
