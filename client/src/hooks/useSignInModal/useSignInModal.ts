import { useState } from "react";
import { useUserContext } from "../../context/UserContext";

const DEV_MODE = "developer"; // change for production

const useSignInModal = () => {
  const [show, setShow] = useState(false);
  const { currentUser } = useUserContext();

  const handleClose = () => {
    setShow(false);
  };

  const googleAuth = () => {
    window.open(
      DEV_MODE
        ? "http://localhost:3001/auth/google"
        : "https://brain-house-api.onrender.com/auth/google",
      "_self"
    );
  };

  const facebookAuth = () => {
    window.open(
      DEV_MODE
        ? "http://localhost:3001/auth/facebook"
        : "https://brain-house-api.onrender.com/auth/facebook",
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
