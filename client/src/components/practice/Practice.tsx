import { useState } from "react";

const Practice = () => {
  const data = [
    { city: "თბილისი", street: "ვარკეთილი" },
    { city: "თბილისი", street: "ისანი" },
    { city: "თბილისი", street: "გლდანი" },
    { city: "თბილისი", street: "საბურთალო" },
    { city: "თბილისი", street: "ნაძალადევი" },
    { city: "თელავი", street: "" },
    { city: "რუსთავი", street: "" },
    { city: "გორი", street: "" },
    { city: "ბათუმი", street: "" },
    { city: "ზუგდიდი", street: "" },
    { city: "ოზურგეთი", street: "" },
    { city: "ქუთაისი", street: "" },
    { city: "ახალციხე", street: "" },
    { city: "საჩხერე", street: "" },
  ];

  const [selectedCity, setSelectedCity] = useState("თბილისი");
  const [selectedStreet, setSelectedStreet] = useState("");

  const uniqueCities = [...new Set(data.map((item) => item.city))];

  const streetsForCity = data
    .filter((item) => item.city === selectedCity)
    .map((item) => item.street);

  const filteredData = data.filter((item) => {
    return (
      (!selectedCity || item.city === selectedCity) &&
      (!selectedStreet || item.street === selectedStreet)
    );
  });

  return (
    <main className="container mt-80 mb-60 mx-auto p-4">
      <div className="flex mb-4">
        <select
          className="border p-2 mr-4"
          value={selectedCity}
          onChange={(e) => {
            setSelectedCity(e.target.value);
            setSelectedStreet(""); // Reset street when city changes
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
          <tr>
            <th className="py-2">ქალაქი</th>
            {streetsForCity.length > 1 && <th className="py-2">ქუჩა</th>}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{item.city}</td>
              {streetsForCity.length > 1 && (
                <td className="border px-4 py-2">{item.street}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default Practice;
