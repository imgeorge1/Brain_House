import { useState } from "react";
import lecturers from "../../data/lecturer";
import { useUserContext } from "../../context/UserContext";

const Practice = () => {
  const { currentUser } = useUserContext();

  console.log("from usecontext", currentUser);

  const [selectedCity, setSelectedCity] = useState("თბილისი");
  const [selectedStreet, setSelectedStreet] = useState("");

  const uniqueCities = [...new Set(lecturers.map((item) => item.city))];

  const selectedCityData = lecturers.find((item) => item.city === selectedCity);
  // console.log("CITY", selectedCity);

  const streetsForCity = selectedCityData ? selectedCityData.street : [];

  const filteredLecturers = selectedCityData
    ? selectedCityData.lectures.name.map((name, index) => ({
        name,
        phone: selectedCityData.lectures.phone[index],
        street: streetsForCity[index],
      }))
    : [];

  return (
    <main className="container mt-80 mb-60 mx-auto p-4">
      <div className="flex mb-4">
        <select
          className="border p-2 mr-4"
          value={selectedCity}
          onChange={(e) => {
            setSelectedCity(e.target.value);
            setSelectedStreet("");
          }}
        >
          {uniqueCities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>

        {streetsForCity.length > 1 && (
          <select
            className="border p-2"
            value={selectedStreet}
            onChange={(e) => setSelectedStreet(e.target.value)}
            disabled={!selectedCity}
          >
            <option value="">ყველა</option>
            {streetsForCity.map((street, index) => (
              <option key={index} value={street}>
                {street}
              </option>
            ))}
          </select>
        )}
      </div>

      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-300">
            <th className="py-2 w-36 border maxw">ქუჩა</th>
            <th className="py-2 w-36 border">ლექტორი</th>
            <th className="py-2 w-36 border">ნომერი</th>
          </tr>
        </thead>
        <tbody>
          {filteredLecturers
            .filter((lecturer) =>
              selectedStreet ? lecturer.street === selectedStreet : true
            )
            .map((lecturer, index) => (
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
