import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Tickets from "../tickets/Tickets";

const LicenseTest = () => {
  const { currentUser } = useContext(UserContext);

  // console.log(currentUser);

  return (
    <>
      {!currentUser ? (
        <Tickets />
      ) : (
        <h1 className="text-red-500 font-bold text-8xl ">ჩარიცხე თანხა!!!</h1>
      )}
    </>
  );
};

export default LicenseTest;
