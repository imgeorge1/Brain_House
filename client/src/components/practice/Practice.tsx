import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useUserContext } from "../../context/UserContext";
import API from "../../utils/API";
import { PracticeCity, PracticeFormData } from "../../types/Types";

const Practice = () => {
  const { currentUser, booleanPaid } = useUserContext();

  useEffect(() => {
    console.log("User data:", currentUser);
    console.log("Has paid:", booleanPaid);
  }, [currentUser, booleanPaid]);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const editRef = useRef<HTMLDialogElement>(null);

  const { register, handleSubmit, reset, setValue } = useForm<PracticeFormData>(
    {
      defaultValues: {
        city: "",
        street: "",
        address: "",
        lecturer: "",
        phone: "",
      },
    }
  );

  const [practiceData, setPracticeData] = useState<PracticeCity[]>([]);
  const [selectedCity, setSelectedCity] = useState("თბილისი");
  const [selectedStreet, setSelectedStreet] = useState("გლდანი");
  const [editingItem, setEditingItem] = useState<
    (PracticeFormData & { _id: string }) | null
  >(null);

  const fetchPracticeData = async () => {
    try {
      const res = await API.get("/practice_get");
      setPracticeData(res.data || []);
    } catch (err) {
      console.error("Failed to fetch practice data:", err);
    }
  };

  useEffect(() => {
    fetchPracticeData();
  }, []);

  const selectedCityData = practiceData.find((c) => c.city === selectedCity);
  const selectedStreetData = selectedCityData?.streets.find(
    (s) => s.street === selectedStreet
  );
  const fullinfo = selectedStreetData?.fullinfo || [];

  const hasAccess =
    currentUser?.isPaid &&
    currentUser?.purchased_locations?.includes(selectedStreet);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCity = e.target.value;
    setSelectedCity(newCity);
    const firstStreet =
      practiceData.find((c) => c.city === newCity)?.streets?.[0]?.street || "";
    setSelectedStreet(firstStreet);
  };

  const handleStreetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStreet(e.target.value);
  };

  const onSubmit = async (data: PracticeFormData) => {
    try {
      await API.post("/practice", data);
      fetchPracticeData();
      dialogRef.current?.close();
      reset();
    } catch (err) {
      console.error("Error sending data:", err);
    }
  };

  const openDialog = () => {
    dialogRef.current?.showModal();
    setValue("city", selectedCity);
    setValue("street", selectedStreet);
  };

  const openEditDialog = (info: any & { _id: string }) => {
    setEditingItem(info);
    setValue("address", info.address);
    setValue("lecturer", info.lecturer);
    setValue("phone", info.phone);
    setValue("city", selectedCity);
    setValue("street", selectedStreet);
    editRef.current?.showModal();
  };

  const onSubmitEdit = async (data: PracticeFormData) => {
    if (!editingItem?._id) return console.error("No item selected for editing");
    try {
      await API.put(`/practice/${editingItem._id}`, data);
      fetchPracticeData();
      editRef.current?.close();
    } catch (err) {
      console.error("Failed to update:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("ნამდვილად გსურს წაშლა?")) return;
    try {
      await API.delete(`/practice/${id}`);
      fetchPracticeData();
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  };

  return (
    <main className="container mt-80 mb-60 mx-auto p-4">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <select
            className="px-4 py-2 rounded bg-white"
            value={selectedCity}
            onChange={handleCityChange}
          >
            {practiceData.map((c) => (
              <option key={c.city} value={c.city}>
                {c.city}
              </option>
            ))}
          </select>

          <select
            className="px-4 py-2 rounded bg-white"
            value={selectedStreet}
            onChange={handleStreetChange}
          >
            {selectedCityData?.streets.map((s) => (
              <option key={s.street} value={s.street}>
                {s.street}
              </option>
            ))}
          </select>
        </div>

        {currentUser?.email &&
          [
            "beka.lomsadze.1@btu.edu.ge",
            "shvangiradze22giorgi@gmail.com",
            "ubitoz133@gmail.com",
          ].includes(currentUser.email) &&
          booleanPaid && (
            <button
              className="bg-blue-600 px-4 py-2 rounded mb-4 text-white"
              onClick={openDialog}
            >
              Add Data
            </button>
          )}
      </div>

      <div className="relative mt-6">
        <table className={`min-w-full bg-white transition-all duration-300`}>
          <thead>
            <tr className="bg-gray-300">
              <th className="py-2 w-36 border">მისამართი</th>
              <th className="py-2 w-36 border">ლექტორი</th>
              <th className="py-2 w-36 border">ნომერი</th>
              {currentUser?.email &&
                [
                  "beka.lomsadze.1@btu.edu.ge",
                  "shvangiradze22giorgi@gmail.com",
                  "ubitoz133@gmail.com",
                ].includes(currentUser.email) &&
                booleanPaid && (
                  <th className="py-2 w-36 border">რედაქტირება</th>
                )}
            </tr>
          </thead>
          <tbody>
            {hasAccess ? (
              fullinfo.map((info, idx) => (
                <tr key={idx} className="w-full">
                  <td className="border px-4 py-2">{info.address}</td>
                  <td className="border px-4 py-2">{info.lecturer}</td>
                  <td className="border px-4 py-2">{info.phone}</td>
                  {currentUser?.email &&
                    [
                      "beka.lomsadze.1@btu.edu.ge",
                      "shvangiradze22giorgi@gmail.com",
                      "ubitoz133@gmail.com",
                    ].includes(currentUser.email) &&
                    booleanPaid && (
                      <td className="grid gap-2 grid-cols-2 border px-4 py-2">
                        <button
                          className="bg-blue-600 px-4 py-2 rounded text-white"
                          onClick={() => openEditDialog(info)}
                        >
                          Edit Data
                        </button>
                        <button
                          className="bg-red-600 px-4 py-2 rounded text-white"
                          onClick={() => handleDelete(info._id)}
                        >
                          Delete
                        </button>
                      </td>
                    )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center p-4 text-gray-500">
                  შეძენის შემდეგ გაგეხსნებათ წვდომა ამ ქუჩის მონაცემებზე.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Dialogs */}
      <dialog
        ref={dialogRef}
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl p-6 shadow-md backdrop:bg-black/50"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="ქალაქი"
            {...register("city")}
            className="border px-2 py-1"
          />
          <input
            type="text"
            placeholder="ქუჩა"
            {...register("street")}
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

      <dialog
        ref={editRef}
        className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl p-6 shadow-md backdrop:bg-black/50"
      >
        <form
          onSubmit={handleSubmit(onSubmitEdit)}
          className="flex flex-col gap-4"
        >
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
              onClick={() => editRef.current?.close()}
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
