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
    getValues,
  } = useForm<FullUser>();
  const { currentUser } = useUserContext();
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalValue, setModalValue] = useState<number | null>(null);

  const navigate = useNavigate();
  console.log("currentUser", currentUser);
  // const onSubmit: SubmitHandler<FullUser> = async (body) => {
  //   console.log(body);

  //   try {
  //     const { firstName, lastName, email, password, age, city, phone } = body;

  //     const res = await API.post("/signup", {
  //       firstName,
  //       lastName,
  //       email,
  //       password,
  //       age,
  //       city,
  //       phone,
  //     });
  //     console.log("res: ", res);
  //     navigate("/login");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const onSubmit: SubmitHandler<FullUser> = async (body) => {
    try {
      const { email, firstName } = body;

      const res = await API.post("/verifysignup", { email, firstName });

      if (res.status === 200) {
        console.log("verifyed");
        localStorage.setItem("verifyToken", res.data.token);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Login failed:", error);
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
            htmlFor="firstName"
          >
            სახელი
          </label>
          <input
            type="text"
            id="firstName"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.firstName ? "border-red-500" : ""
            }`}
            placeholder="სახელი"
            {...register("firstName", {
              required: "სახელი აუცილებელია",
            })}
          />
          {errors.firstName && (
            <p className="text-red-500 text-xs italic">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-base font-bold mb-2"
            htmlFor="lastName"
          >
            გვარი
          </label>
          <input
            type="text"
            id="lastName"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.lastName ? "border-red-500" : ""
            }`}
            placeholder="გვარი"
            {...register("lastName", {
              required: "გვარი აუცილებელია",
            })}
          />
          {errors.lastName && (
            <p className="text-red-500 text-xs italic">
              {errors.lastName.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-base font-bold mb-2"
            htmlFor="email"
          >
            ელ.ფოსტა
          </label>
          <input
            type="email"
            id="email"
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.email ? "border-red-500" : ""
            }`}
            placeholder="ელ.ფოსტა"
            {...register("email", {
              required: "ელ.ფოსტა აუცილებელია",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                message: "ელ.ფოსტა არასწორია",
              },
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

        <div className="mb-4">
          <label
            className="block text-gray-700 text-base font-bold mb-2"
            htmlFor="age"
          >
            ასაკი
          </label>
          <input
            type="number"
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
            ტელეფონის ნომერი
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
              pattern: {
                value: /^[+]?[\d\s\-()]{7,20}$/,
                message: "ტელეფონის ნომერი არასწორია",
              },
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
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4">
              შეიყვანე ელ.ფოსტაზე მიღებული კოდი
            </h3>
            <input
              type="number"
              value={modalValue === null ? "" : modalValue}
              onChange={(e) => {
                const value = e.target.value;
                setModalValue(value === "" ? null : Number(value));
              }}
              className="w-full border px-3 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="რიცხვი"
            />

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                გაუქმება
              </button>
              <button
                onClick={async () => {
                  try {
                    const token = localStorage.getItem("verifyToken");
                    if (!token) {
                      console.error("Verify token is missing");
                      return;
                    }

                    const formData = getValues();

                    const payload = {
                      ...formData,
                      code: modalValue,
                      token,
                    };

                    const res = await API.post("/signup", payload);

                    if (res.status === 201) {
                      setIsModalOpen(false);
                      navigate("/login");
                      localStorage.removeItem("verifyToken");
                    } else {
                      alert("Registration failed.");
                    }
                  } catch (err) {
                    console.error(err);
                    alert("An error occurred during registration.");
                  }
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                გაგზავნა
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
