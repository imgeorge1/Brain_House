import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import API from "../../utils/API";
import { FullUser } from "../../types/Types";
import { useUserContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FullUser>();
  const { currentUser } = useUserContext();
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FullUser> = async (body) => {
    try {
      const url = "/signup";
      const email = currentUser?.email;
      const bodyWithEmail = { ...body, email };

      const res = await API.post(url, bodyWithEmail);
      console.log("res: ", res);
      navigate("/payment");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-2/3 md:w-2/3 lg:w-1/3 mx-auto mb-24 mt-40">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8"
        noValidate
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">რეგისტრაცია</h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-base font-bold mb-2"
            htmlFor="fullName"
          >
            სახელი გვარი
          </label>
          <input
            type="text"
            id="fullName"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.fullName ? "border-red-500" : ""
            }`}
            placeholder="სახელი გვარი"
            {...register("fullName", {
              required: "სახელი და გვარი აუცილებელია",
            })}
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs italic">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-base font-bold mb-2"
            htmlFor="age"
          >
            ასაკი
          </label>
          <input
            type="text"
            id="age"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.age ? "border-red-500" : ""
            }`}
            placeholder="ასაკი"
            {...register("age", {
              required: "ასაკი აუცილებელია",
            })}
          />
          {errors.age && (
            <p className="text-red-500 text-xs italic">{errors.age.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-base font-bold mb-2"
            htmlFor="city"
          >
            ქალაქი
          </label>
          <input
            type="text"
            id="city"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.city ? "border-red-500" : ""
            }`}
            placeholder="ქალაქი"
            {...register("city", {
              required: "ქალაქი აუცილებელია",
              minLength: { value: 2, message: "Min length is 2 characters" },
            })}
          />
          {errors.city && (
            <p className="text-red-500 text-xs italic">{errors.city.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-base font-bold mb-2"
            htmlFor="phone"
          >
            ტელეფონი ნომერი
          </label>
          <input
            type="tel"
            id="phone"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.phone ? "border-red-500" : ""
            }`}
            placeholder="ტელეფონი ნომერი"
            {...register("phone", {
              required: "ტელეფონი ნომერი აუცილებელია",
            })}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs italic">
              {errors.phone.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between pb-4">
          <button
            type="submit"
            className={`font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isCheckboxChecked
                ? "bg-blue-500 hover:bg-blue-700 text-white"
                : "bg-blue-300 text-white cursor-not-allowed"
            }`}
            disabled={!isCheckboxChecked}
          >
            გაგზავნა
          </button>
        </div>
        <Link to="/policy" className="text-blue-500 underline">
          კონფიდენციალურობის პოლიტიკა
        </Link>
        <div className="flex gap-5 items-center mt-5">
          <input
            className="h-4 w-4 border border-gray-300 rounded-md bg-white checked:bg-blue-600 checked:rotate-[360deg] checked:border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 cursor-pointer"
            type="checkbox"
            onChange={(e) => setIsCheckboxChecked(e.target.checked)}
          />
          <span
            className={`text-xs ${
              isCheckboxChecked ? "text-green-500" : "text-red-500"
            }`}
          >
            გავეცანი და ვეთანხმები კონფიდენციალურობის პოლიტიკას
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
