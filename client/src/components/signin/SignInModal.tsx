import { useContext, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "../../index.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import google from "../../assets/google.png";

function SignInModal() {
  const [show, setShow] = useState(false);
  const { currentUser } = useContext(UserContext);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const logout = () => {
    window.open("http://localhost:3001/logout", "_self"); // https://brain-house.onrender.com/
  };

  const googleAuth = () => {
    window.open("http://localhost:3001/auth/google/callback", "_self");
  };

  const facebookAuth = () => {
    window.open("http://localhost:3001/auth/facebook", "_self");
  };

  return (
    <>
      {currentUser ? (
        <div className=" gap-4 flex justify-end p-2">
          {currentUser && (
            <Link
              to="dashboard"
              className="bg-green-500 p-2 rounded-2xl text-xl font-bold text-white"
              style={{ textDecoration: "none" }}
            >
              Dashboard
            </Link>
          )}

          <h4 className="mt-2">
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="border-0"></Modal.Header>
        <>
          <Modal.Body className=" justify-content-center align-items-center text-center ">
            <h6 className="font  fs-3 font-bold">შესვლა</h6>

            <Button
              className="w-100 btn btn-light btn-outline-secondary d-flex align-items-center justify-content-center gap-4"
              type="submit"
              onClick={googleAuth}
            >
              <img src={google} alt="google" width={30} height={30} />
              <span>შესვლა GOOGLE ანგარიშით</span>
            </Button>
            <Button
              className="w-100 btn btn-light btn-outline-secondary d-flex align-items-center justify-content-center gap-4"
              type="submit"
              onClick={facebookAuth}
            >
              <span>შესვლა Facebook ანგარიშით</span>
            </Button>
          </Modal.Body>

          {/* <Modal.Footer className="pb-4">
            <span className="mt-2 fs-5 text-secondary">
              არ ხართ დარეგისტრირებული?
            </span>
            <Link to="/register" className="mt-2 fs-5 ">
              რეგისტრაცია
            </Link>
          </Modal.Footer> */}
        </>
      </Modal>
    </>
  );
}

export default SignInModal;
