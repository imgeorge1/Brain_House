import { useState } from "react";
import { useUserContext } from "../../context/UserContext";

const useSignInModal = () => {
  const [show, setShow] = useState(false);
  const { currentUser } = useUserContext();

  const handleClose = () => {
    setShow(false);
  };

  const googleAuth = () => {
    window.open(
      `${import.meta.env.VITE_SERVER_URL}/auth/signin`,

      "_self"
    );
  };

  const facebookAuth = () => {
    window.open(`${import.meta.env.VITE_SERVER_URL}/auth/facebook`, "_self");
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
