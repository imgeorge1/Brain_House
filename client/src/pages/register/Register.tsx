import { SubmitHandler, useForm } from "react-hook-form";
import API from "../../utils/API";
import { FullUser } from "../../types/Types";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FullUser>();
  const { currentUser } = useContext(UserContext);

  const onSubmit: SubmitHandler<FullUser> = async (body) => {
    try {
      const url = "/signup";
      const email = currentUser?.email;
      const bodyWithEmail = { ...body, email };
      const res = await API.post(url, bodyWithEmail);
      console.log("res: ", res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-1/3 mx-auto my-16">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8"
        noValidate
      >
        <h2 className="text-3xl font-bold mb-4">რეგისტრაცია</h2>

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

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            გაგზავნა
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
