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
          className="absolute top-0 h-screen left-0 right-0 bottom-0 bg-black bg-opacity-50"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -200 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-10 justify-content-center align-items-center text-center text-black"
          >
            <div className="space-y-2 bg-white inline-block p-6 rounded-lg text-2xl">
              <h6 className="mb-4">შესვლა</h6>
              <button
                className="flex gap-5 bg-white border-b-[1px] border-b-gray-400 pb-2"
                type="submit"
                onClick={googleAuth}
              >
                <img src={google} alt="google" width={30} height={30} />
                <span>შესვლა GOOGLE ანგარიშით</span>
              </button>

              <button
                className="flex gap-5 bg-white"
                type="submit"
                onClick={facebookAuth}
              >
                <img
                  src={facebook}
                  alt="facebook logo"
                  width={30}
                  height={30}
                />
                <span>შესვლა Facebook ანგარიშით</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default SignInModal;
