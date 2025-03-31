import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import BrainHouseLogo from "../../assets/newbrainhouselogo.png";
import SignInModal from "../signin/SignInModal";
import useWidth from "../../hooks/useWidth/useWidth";
import { motion } from "framer-motion";
import X from "../../assets/X.png";

const Header = () => {
  const location = useLocation();
  const categoryId = parseInt(location.pathname.split("/")[2]);
  const width = useWidth();
  const [hide, setHide] = useState(true);

  const toggleMenu = () => {
    setHide(!hide);
  };

  const check =
    !location.pathname.startsWith("/register") &&
    !location.pathname.startsWith("/payment");

  return (
    check && (
      <div className="bg-black background absolute top-0 w-full h-20">
        <header
          className="fixed z-50 top-0 w-full backdrop-brightness-[.85] 
          backdrop-blur bg-gradient-to-b from-[#2D2862] to-transparent to-100%
      flex items-center justify-between px-2 py-7 md:py-5 lg:py-4 md:px-10 text-white text"
        >
          <motion.div
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <NavLink
              to="/"
              className="logo flex items-center gap-2 text-white no-underline "
            >
              <img
                src={BrainHouseLogo}
                alt="logo"
                width={40}
                height={40}
                className="rounded-xl"
              />
              <h1 className="font-bold my-auto">Brain House</h1>
            </NavLink>
          </motion.div>

          {(width >= 1024 || !hide) && (
            <motion.nav
              initial={{ opacity: 0, y: -200 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              onClick={(e) => e.stopPropagation()} 
              className="flex lg:bg-transparent bg-opacity-95 bg-black md:bg-black md:bg-opacity-95 w-[100%]
              h-fit pb-6 flex-col lg:flex-row absolute top-0 text-center
              right-0 bottom-0 z-10 gap-6 lg:h-full lg:p-0 lg:static lg:w-auto"
            >
              <div className="flex justify-center items-center mt-4 lg:hidden z-50">
                <SignInModal />
              </div>
              <NavLink
                to="/"
                className="nav-link text-white no-underline text-center "
              >
                მთავარი
              </NavLink>
              <NavLink
                to="/about"
                className="nav-link text-white no-underline text-center"
              >
                ჩვენ შესახებ
              </NavLink>
              <NavLink
                to={`/tickets/${categoryId || 21}`}
                className="nav-link text-white text-center"
              >
                თეორიის კურსი
              </NavLink>
            </motion.nav>
          )}

          {width < 1024 &&
            (hide ? (
              <button onClick={toggleMenu} className="space-y-1">
                <div className="w-[35px] h-[5px] bg-orange-500 rounded-3xl"></div>
                <div className="w-[35px] h-[5px] bg-orange-500 rounded-3xl"></div>
                <div className="w-[35px] h-[5px] bg-orange-500 rounded-3xl"></div>
              </button>
            ) : (
              <h1
                onClick={toggleMenu}
                className="z-20 mt-[-40px] ml-[-100px] text-3xl absolute spin-on-hover 
              right-1 cursor-pointer border-2 rounded-full hover:bg-gray-700 duration-200 mt-1"
              >
                <img src={X} width={32} alt="back" />
              </h1>
            ))}

          {(width >= 1024 || !hide) && width >= 1024 && (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="z-20 bigparent justify-center flex"
            >
              <SignInModal />
            </motion.div>
          )}
        </header>
      </div>
    )
  );
};

export default Header;
