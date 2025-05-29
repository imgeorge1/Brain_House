import { SubmitHandler, useForm } from "react-hook-form";
import { NewPassForm } from "../../types/Types";
import { useNavigate } from "react-router-dom";
import API from "../../utils/API";
import { useState } from "react";

const NewPass = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<NewPassForm>();

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const password = watch("password");

  const onSubmit: SubmitHandler<NewPassForm> = async (body) => {
    try {
      const { email, password } = body;

      const res = await API.post("/newpassword", { email, password });

      if (res.status === 200) {
        console.log("NewPassed");
        navigate("/");
      }
    } catch (error) {
      console.error("Password reset failed:", error);
    }
  };

  return (
    <section>
      <div className="w-2/3 md:w-2/3 lg:w-1/3 mx-auto mb-24 mt-40">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8"
          noValidate
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">ვერიფიკაცია</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-base font-bold mb-2"
              htmlFor="email"
            >
              ელ.ფოსტა
            </label>
            <input
              autoComplete="off"
              type="email"
              id="email"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder="ელ.ფოსტა"
              {...register("email", {
                required: "ელ.ფოსტა აუცილებელია",
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4 relative">
            <label
              className="block text-gray-700 text-base font-bold mb-2"
              htmlFor="password"
            >
              ახალი პაროლი
            </label>
            <input
              autoComplete="new-password"
              type={showPassword ? "text" : "password"}
              id="password"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder="პაროლი"
              {...register("password", {
                required: "პაროლი აუცილებელია",
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-xl cursor-pointer"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
            {errors.password && (
              <p className="text-red-500 text-xs italic">
                {errors.password.message}
              </p>
            )}
          </div>
          {/* Confirm Password field */}
          <div className="mb-4 relative">
            <label
              className="block text-gray-700 text-base font-bold mb-2"
              htmlFor="confirmPassword"
            >
              გაიმეორე პაროლი
            </label>
            <input
              autoComplete="new-password"
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
              placeholder="გაიმეორე პაროლი"
              {...register("confirmPassword", {
                required: "გაიმეორე პაროლი აუცილებელია",
                validate: (value) =>
                  value === password || "პაროლები არ ემთხვევა",
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-xl cursor-pointer"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs italic">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between pb-4">
            <button
              type="submit"
              className="font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-blue-500 hover:bg-blue-700 text-white"
            >
              გაგზავნა
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewPass;
