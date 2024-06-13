import "../../index.css";
import google from "../../assets/google.png";
import facebook from "../../assets/facebook.png";
import Dashboard from "./Dashboard";
import useSignInModal from "../../hooks/useSignInModal/useSignInModal";
import { motion } from "framer-motion";

const SignInModal = () => {
  const { show, setShow, currentUser, handleClose, googleAuth, facebookAuth } =
    useSignInModal();

  return (
    <>
      <Dashboard currentUser={currentUser} setShow={setShow} />
      {show && (
        <div
          className="absolute top-0 left-0 right-0 bottom-0 h-screen bg-black bg-opacity-50"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -200 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-24 justify-content-center align-items-center text-center text-black"
          >
            <div className="space-y-2 bg-white inline-block text-center p-6 rounded-lg">
              <h6 className="font-semibold mb-12 font-roboto border-b-[1px] border-b-gray-200 w-32 mx-auto text-lg sm:text-xl">
                შესვლა
              </h6>
              <button
                className="flex gap-5 border-solid border-[#2d2862] border rounded-lg bg-white py-2 p-1 mx-auto hover:-translate-y-1 hover:shadow-md
                hover:shadow-gray-300 hover:bg-[#2d286215] duration-200 text-sm sm:text-lg"
                type="submit"
                onClick={googleAuth}
              >
                <img
                  src={google}
                  alt="google"
                  width={20}
                  height={20}
                  className="sm:w-7 sm:h-7"
                />
                <span className="font-roboto w-60 sm:w-72">
                  შესვლა <span className="text-[#0086F9]">G</span>
                  <span className="text-[#FF4131]">o</span>
                  <span className="text-[#FEBD00]">o</span>
                  <span className="text-[#0086F9]">g</span>
                  <span className="text-[#00AA4A]">l</span>
                  <span className="text-[#FF4131]">e</span> ანგარიშით
                </span>
              </button>
              <hr />
              <button
                className="flex gap-5 border-solid border-[#2d2862] border rounded-lg bg-white py-2 p-1 hover:-translate-y-1 hover:shadow-md
                hover:shadow-gray-300 hover:bg-[#2d286215] duration-200 text-sm sm:text-lg"
                type="submit"
                onClick={facebookAuth}
              >
                <img
                  src={facebook}
                  alt="facebook logo"
                  width={20}
                  height={20}
                  className="sm:w-7 sm:h-7 rounded-xl"
                />
                <span className="font-roboto w-60 sm:w-72">
                  {" "}
                  შესვლა <span className="text-[#0866FF]">facebook</span>{" "}
                  ანგარიშით{" "}
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default SignInModal;
