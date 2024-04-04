import { useState } from "react";
import { useUserContext } from "../../context/UserContext";

const useSignInModal = () => {
  const [show, setShow] = useState(false);
  const { currentUser } = useUserContext();

  const handleClose = () => {
    setShow(false);
  };

  const googleAuth = () => {
    window.open("https://brain-house-vkk7.onrender.com/auth/google", "_self");
  };

  const facebookAuth = () => {
    window.open("https://brain-house-vkk7.onrender.com/auth/facebook", "_self");
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
