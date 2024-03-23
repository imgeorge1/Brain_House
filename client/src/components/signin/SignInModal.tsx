import { useContext, useState } from "react";
import "../../index.css";
import { UserContext } from "../../context/UserContext";
import google from "../../assets/google.png";
import facebook from "../../assets/facebook.png";
import Dashboard from "./Dashboard";

function SignInModal() {
  const [show, setShow] = useState(false);
  const { currentUser } = useContext(UserContext);

  const handleClose = () => {
    setShow(false);
  };

  const googleAuth = () => {
    window.open("http://localhost:3001/auth/google", "_self"); // https://brain-house-vkk7.onrender.com
  };

  const facebookAuth = () => {
    window.open("http://localhost:3001/auth/facebook", "_self");
  };

  return (
    <>
      <Dashboard currentUser={currentUser} setShow={setShow} />
      {show && (
        <div
          className="absolute top-0 h-screen left-0 right-0 bottom-0 bg-black bg-opacity-50"
          onClick={handleClose}
        >
          <div className="mt-10 justify-content-center align-items-center text-center text-black">
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
          </div>
        </div>
      )}
    </>
  );
}

export default SignInModal;
