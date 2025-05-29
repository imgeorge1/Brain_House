import lecturers from "../../data/lecturer";

const Practice = () => {
  // Only find data for "თბილისი"
  const tbilisiData = lecturers.find((item) => item.city === "თბილისი");

  const filteredLecturers = tbilisiData
    ? tbilisiData.lectures.name.map((name, index) => ({
        name,
        phone: tbilisiData.lectures.phone[index],
        street: tbilisiData.street[index],
      }))
    : [];

  return (
    <main className="container mt-80 mb-60 mx-auto p-4">
      <div className="flex mb-4 px-4 py-2 bg-white w-fit rounded">
        <span>თბილისი</span>
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
    </main>
  );
};

export default Practice;
