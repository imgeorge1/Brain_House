import { MdMarkEmailRead } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { FaFacebookSquare } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import BrainHouseLogo from "../../assets/newbrainhouselogo.png";

function Footer() {
  return (
    <div className="w-full background mt-4 p-8">
      <div className="flex justify-around flex-col sm:flex-row">
        <div className="min-w-60 min-h-40 text-center sm:text-left flex-col flex ">
          <NavLink
            to="/"
            className="text-xl flex justify-center sm:justify-start gap-2 text-white no-underline pb-1"
          >
            <img src={BrainHouseLogo} alt="logo" width={40} height={40} />
            <h5 className="font-bold my-auto">Brain House</h5>
          </NavLink>
          <div>
            <a href="/policy">
              <p className="mt-2 text-yellow-500 hover:text-yellow-600 duration-100">
                წესები, პირობები და მონაცემთა დაცვა
              </p>
            </a>
          </div>
          <div>
            <a href="/about">
              <p className="mt-3 text-yellow-500  hover:text-yellow-600 duration-150">
                ჩვენ შესახებ
              </p>
            </a>
          </div>
        </div>
        <div className="flex flex-col min-w-60 text-white gap-2 ">
          <p className="text-2xl font-bold active-link text-center sm:text-left pl-1">
            კონტაქტი
          </p>
          <div className="flex text-yellow-400 w-full items-center gap-2 mt-2 justify-center sm:justify-start">
            <MdMarkEmailRead />
            brainhouseedu@gmail.com
          </div>
          <div className="flex text-yellow-400 w-full items-center gap-2 mt-2 justify-center sm:justify-start">
            <IoCall />
            +995 599 79 57 67
          </div>
          <div className="flex text-blue-500 items-center w-full gap-2 mt-2 justify-center sm:justify-start">
            <a href="https://www.facebook.com/Brain.House.Geo" target="_blank">
              <FaFacebookSquare />
            </a>
          </div>
        </div>
      </div>
      <div className="flex text-gray-400 w-full justify-center gap-2 mt-12">
        Brain House © 2024
      </div>
    </div>
  );
}

export default Footer;
