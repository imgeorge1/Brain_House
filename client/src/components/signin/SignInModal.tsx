import { useContext, useState } from "react";
import "../../index.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import google from "../../assets/google.png";
import facebook from "../../assets/facebook.png";

function SignInModal() {
  const [show, setShow] = useState(false);
  const { currentUser } = useContext(UserContext);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const logout = () => {
    window.open("https://brain-house-vkk7.onrender.com/logout", "_self");
    localStorage.removeItem("token");
  };

  const googleAuth = () => {
    window.open("https://brain-house-vkk7.onrender.com/auth/google", "_self");
  };

  const facebookAuth = () => {
    window.open("https://brain-house-vkk7.onrender.com/auth/facebook", "_self");
  };

  return (
    <>
      {currentUser ? (
        <div className=" gap-4 flex justify-end p-2">
          {currentUser &&
            false && ( // temporarily
              <Link
                to="dashboard"
                className="bg-green-500 p-2 rounded-2xl text-xl font-bold text-white"
                style={{ textDecoration: "none" }}
              >
                Dashboard
              </Link>
            )}

          <h4 className="mt-2 text-xl">
            {currentUser.firstName + " " + currentUser.lastName}
          </h4>
          <button
            className="buttonBorder px-6 py-2 rounded-3xl hover:bg-orange-500 text-xl text-white"
            onClick={logout}
          >
            გამოსვლა
          </button>
        </div>
      ) : (
        <button
          className="buttonBorder px-6 py-2 rounded-3xl hover:bg-orange-500 text-xl text-white"
          onClick={handleShow}
        >
          შესვლა
        </button>
      )}

      {show && (
        <div
          className="absolute top-0 h-screen left-0 right-0 bottom-0 bg-black bg-opacity-50"
          onClick={handleClose}
        >
          <>
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

            {/* <Modal.Footer className="pb-4">
            <span className="mt-2 fs-5 text-secondary">
              არ ხართ დარეგისტრირებული?
            </span>
            <Link to="/register" className="mt-2 fs-5 ">
              რეგისტრაცია
            </Link>
          </Modal.Footer> */}
          </>
        </div>
      )}
    </>
  );
}

export default SignInModal;
