import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useUserContext } from "../../context/UserContext";
import lecturers from "../../data/lecturer";
import API from "../../utils/API";

const Practice = () => {
  const { currentUser, booleanPaid } = useUserContext();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      city: "",
      street: "",
      address: "",
      lecturer: "",
      phone: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await API.post("/practice", data);

      console.log("Server response:", response);

      dialogRef.current?.close();
      reset();
    } catch (error) {
      console.error("Error sending data:");
    }
  };

  const tbilisiData = lecturers.find((item) => item.city === "თბილისი");

  const filteredLecturers = tbilisiData
    ? tbilisiData.lectures.name.map((name, index) => ({
        name,
        phone: tbilisiData.lectures.phone[index],
        street: tbilisiData.street[index],
      }))
    : [];

  const openDialog = () => dialogRef.current?.showModal();

  return (
    <main className="container mt-80 mb-60 mx-auto p-4">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <div className="flex mb-4 px-4 py-2 bg-white w-fit rounded">
            <span>ქალაქები</span>
          </div>
          <div className="flex mb-4 px-4 py-2 bg-white w-fit rounded">
            <span>ქუჩები</span>
          </div>
        </div>

        {(currentUser?.email === "beka.lomsadze.1@btu.edu.ge" && booleanPaid) ||
        (currentUser?.email === "shvangiradze22giorgi@gmail.com" &&
          booleanPaid) ||
        (currentUser?.email === "ubitoz133@gmail.com" && booleanPaid) ? (
          <button
            className="bg-blue-600 px-4 py-2 rounded mb-4"
            onClick={openDialog}
          >
            Add Data
          </button>
        ) : null}
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-300">
            <th className="py-2 w-36 border">მისამართი</th>
            <th className="py-2 w-36 border">ლექტორი</th>
            <th className="py-2 w-36 border">ნომერი</th>
          </tr>
        </thead>
        <tbody>
          {filteredLecturers.map((lecturer, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 w-36">{lecturer.street}</td>
              <td className="border px-4 py-2 w-36">{lecturer.name}</td>
              <td className="border px-4 py-2 w-36">{lecturer.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <dialog
        ref={dialogRef}
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl p-6 shadow-md backdrop:bg-black/50"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="ქალაქი"
            {...register("city", { required: true })}
            className="border px-2 py-1"
          />
          <input
            type="text"
            placeholder="ქუჩა"
            {...register("street", { required: true })}
            className="border px-2 py-1"
          />
          <input
            type="text"
            placeholder="მისამართი"
            {...register("address", { required: true })}
            className="border px-2 py-1"
          />
          <input
            type="text"
            placeholder="ლექტორი"
            {...register("lecturer", { required: true })}
            className="border px-2 py-1"
          />
          <input
            type="tel"
            placeholder="ნომერი"
            {...register("phone", { required: true })}
            className="border px-2 py-1"
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-green-500 px-4 py-2 rounded text-white"
            >
              შენახვა
            </button>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="bg-red-500 px-4 py-2 rounded text-white"
            >
              დახურვა
            </button>
          </div>
        </form>
      </dialog>
    </main>
  );
};

export default Practice;
