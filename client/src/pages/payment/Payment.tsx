import { Link } from "react-router-dom";

const Payment = () => {
  return (
    <div className="w-[100%] md:w-1/2 lg:w-[40%] mx-auto mb-24 mt-40 ">
    <Link
      to="/"
      className="inline-block mb-4 text-blue-600 hover:text-blue-800 font-semibold transition duration-200"
    >
      ← მთავარ გვერდზე დაბრუნება
    </Link>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <div className="mb-6">
          <label
            className="block text-gray-700 text-base font-bold mb-2"
            htmlFor="age"
          >
            ანგარიშის ნომერი
          </label>
          <div className="sm:flex items-center justify-start pl-2 gap-2 ">
            <span style={{ fontSize: "15px" }}>TBC ბანკი</span>
            <input
              type="text"
              id="iban"
              className="shadow appearance-none border rounded sm:w-9/12 py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
              readOnly
              value="GE26TB7765836020100010"
            />
          </div>
          <div className="sm:flex items-center justify-start gap-5 pl-2 mt-2 ">
            <span style={{ fontSize: "15px" }}>მიმღები</span>{" "}
            <input
              type="text"
              id="recipient"
              className="shadow appearance-none border rounded sm:w-9/12 py-2 px-3 pl-2 text-gray-500 leading-tight focus:outline-none focus:shadow-outline"
              readOnly
              value="შ.პ.ს. ბრეინ ჰაუსი 2021"
            />
          </div>

          <p className="text-red-500 mt-2" style={{ fontSize: "12px" }}>
            ვიდეო ლექციებზე წვდომა მოგეცემათ თანხის ანგარიშზე ასახვის შემდეგ
          </p>
        </div>
      </form>
    </div>
  );
};

export default Payment;
