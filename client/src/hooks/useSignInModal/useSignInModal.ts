import { useState } from "react";
import { useUserContext } from "../../context/UserContext";

const DEV_MODE = false; // change for production

const useSignInModal = () => {
  const [show, setShow] = useState(false);
  const { currentUser } = useUserContext();

  const handleClose = () => {
    setShow(false);
  };

  const googleAuth = () => {
    window.open(
      DEV_MODE
        ? "http://localhost:3000/api/auth/signin"
        : "https://brainhouse.onrender.com/api/auth/google",
      "_self"
    );
  };

  const facebookAuth = () => {
    window.open(
      DEV_MODE
        ? "http://localhost:3000/auth/facebook"
        : "https://brainhouse.onrender.com/auth/facebook",
      "_self"
    );
  };

  return {
    show,
    setShow,
    currentUser,
    handleClose,
    googleAuth,
    facebookAuth,
  };
};

export default useSignInModal;
