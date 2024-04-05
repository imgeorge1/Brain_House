import { useState } from "react";
import SignUp from "../../components/register/SignUp";
import Success from "./Success";

const Register = () => {
  const [success, setSuccess] = useState(false);

  return <>{success ? <Success /> : <SignUp setSuccess={setSuccess} />}</>;
};

export default Register;
