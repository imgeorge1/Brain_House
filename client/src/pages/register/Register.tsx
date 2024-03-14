import { SubmitHandler, useForm } from "react-hook-form";
import API from "../../utils/API";
// import { useContext } from "react";
// import { UserContext } from "../../context/UserContext";
import { FullUser } from "../../types/Types";
function Register() {
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<FullUser>();
  // const { currentUser } = useContext(UserContext);

  const onSubmit: SubmitHandler<FullUser> = async (body) => {
    // in here we had options
    try {
      // body.userId = currentUser;
      const url = "/signup";
      const res = await API.post(url, body);
      console.log("res: ", res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container w-full d-flex justify-content-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-50 p-2 d-flex flex-column align-items-center justify-content-center bg-white gap-4 mt-4 mb-4 
        rounded-lg shadow-2xl"
        noValidate
      >
        <h2 className="text-4xl font-bold mt-4">რეგისტრაცია</h2>

        <div className="w-50 d-flex flex-col  form-floating">
          <input
            type="text"
            className="form-control rounded-3"
            placeholder="ასაკი"
            {...register("age", {
              required: "ასაკი აუცილებელია",
            })}
          />
          {errors.age && (
            <div className="text-danger">{errors.age.message}</div>
          )}
          <label className="fw-light">ასაკი</label>
        </div>
        <div className="w-50 d-flex flex-col  form-floating">
          <input
            type="text"
            className="form-control rounded-3"
            placeholder="ქალაქი"
            {...register("city", {
              required: "ქალაქი აუცილებელია",
              minLength: { value: 2, message: "Min length is 2 characters" },
            })}
          />
          {errors.city && (
            <div className="text-danger">{errors.city.message}</div>
          )}
          <label className="fw-light">ქალაქი </label>
        </div>
        <div className="w-50 d-flex flex-col form-floating">
          <input
            type="tel"
            className="form-control rounded-3"
            placeholder="ტელეფონი ნომერი"
            {...register("phone", {
              required: "ტელეფონი ნომერი აუცილებელია",
            })}
          />

          {errors.phone && (
            <div className="text-danger">{errors.phone.message}</div>
          )}
          <label className="fw-light">ტელეფონი ნომერი </label>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-50 rounded-md p-2 text-white fs-4 font-bold mb-4"
        >
          გაგზავნა
        </button>
      </form>
    </div>
  );
}

export default Register;
