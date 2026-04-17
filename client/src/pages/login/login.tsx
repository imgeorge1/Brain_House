import { SubmitHandler, useForm } from "react-hook-form";
import { FullUser } from "../../types/Types";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import { useState } from "react";

const LogIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FullUser>();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<FullUser> = async (body) => {
    try {
      const { email, password } = body;

      const res = await API.post("/login", { email, password });

      if (res.status === 200) {
        const accessToken = res.data.accessToken;

        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
          console.log("Access token saved to localStorage");
          window.location.replace("/");
        } else {
          console.log("No access token returned from backend");
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">ავტორიზაცია</h2>
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
              პაროლი
            </label>
            <input
              autoComplete="off"
              type={showPassword ? "text" : "password"}
              id="password"
              className={`shadow appearance-none border rounded w-full py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
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
              className="absolute top-[38px] right-3 text-xl text-gray-600"
              tabIndex={-1}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
            {errors.password && (
              <p className="text-red-500 text-xs italic">
                {errors.password.message}
              </p>
            )}{" "}
            <Link to={"/verify"} className="text-sm text-blue-400">
              დაგავიწყდა პაროლი?
            </Link>
          </div>

          <div className="flex items-center justify-between pb-4">
            <button
              type="submit"
              className={`font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-blue-500 hover:bg-blue-700 text-white`}
            >
              შესვლა
            </button>
            <Link
              to={"/register"}
              className={`text-blue-500 border-b-2  border-blue-500`}
            >
              რეგისტრაცია
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LogIn;
