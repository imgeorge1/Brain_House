import { MdMarkEmailRead } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";

function Footer() {
  return (
    <div className="w-full background mt-4 p-8">
      <div className="flex flex-col w-80 text-white gap-2 ">
        <p className="text-2xl font-bold py-4 active-link">კონტაქტი</p>
        <div className="flex text-yellow-400 w-full items-center gap-2 mt-2">
          <MdMarkEmailRead />
          brainhouseedu@gmail.com
        </div>
        <div className="flex text-yellow-400 w-full items-center gap-2 mt-2">
          <IoCall />
          +995 599 79 57 67
        </div>
        <div className="flex text-blue-500 w-full mt-2">
          <FaFacebook />
        </div>
        <div className="flex text-gray-400 w-full items-center gap-2 mt-2">
          Brain House © 2024
        </div>
      </div>
    </div>
  );
}

export default Footer;
