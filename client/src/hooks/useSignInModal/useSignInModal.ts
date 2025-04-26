import { useState } from "react";
import { useUserContext } from "../../context/UserContext";

const DEV_MODE = true; // change for production

const useSignInModal = () => {
  const [show, setShow] = useState(false);
  const { currentUser } = useUserContext();

  const handleClose = () => {
    setShow(false);
  };

  const googleAuth = () => {
    window.open(
      DEV_MODE
        ? "http://localhost:3000/auth/signin"
        : "https://brain-house.onrender.com/auth/signin",
      "_self"
    );
  };

  const facebookAuth = () => {
    window.open(
      DEV_MODE
        ? "http://localhost:3000/auth/facebook"
        : "https://brain-house.onrender.com/auth/facebook",
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
