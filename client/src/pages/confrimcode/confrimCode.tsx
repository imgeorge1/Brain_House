import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import API from "../../utils/API";

type VerificationForm = {
  code: string;
};

const Verify = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerificationForm>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<VerificationForm> = async ({ code }) => {
    const token = localStorage.getItem("verifyToken");

    if (!token) {
      console.error("Missing email or token in localStorage");
      return;
    }

    try {
      const res = await API.post("/confirm", {
        code,
        token,
      });

      if (res.status === 200) {
        console.log("Verified ✅");
        localStorage.removeItem("verifyToken");
        navigate("/newpassword");
      }
    } catch (error) {
      console.error("Verification failed:", error);
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
              htmlFor="code"
            >
              კოდი
            </label>
            <input
              autoComplete="off"
              type="number"
              id="code"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.code ? "border-red-500" : ""
              }`}
              placeholder="კოდი"
              {...register("code", {
                required: "კოდი აუცილებელია",
              })}
            />
            {errors.code && (
              <p className="text-red-500 text-xs italic">
                {errors.code.message}
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

export default Verify;
