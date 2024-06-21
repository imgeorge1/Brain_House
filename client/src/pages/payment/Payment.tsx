import { SubmitHandler, useForm } from "react-hook-form";
import API from "../../utils/API";
import { FullUser } from "../../types/Types";
import { useUserContext } from "../../context/UserContext";

const Payment = () => {
  const { currentUser } = useUserContext();

  return (
    <div className="w-1/3 mx-auto mb-24 mt-40 ">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h2 className="text-3xl font-bold mb-4">კურსის შეძენა</h2>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-base font-bold mb-2"
            htmlFor="age"
          >
            ანგარიშის ნომერი
          </label>
          <input
            type="text"
            id="age"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
            readOnly
            value="010010908323123"
          />
        </div>
        <p className="text-red-500" style={{ fontSize: "12px" }}>
          ვიდეო ლექციებზე წვდომა მოგეცემათ თანხის ანგარიშზე ასახვის შემდეგ
        </p>
      </form>
    </div>
  );
};

export default Payment;
