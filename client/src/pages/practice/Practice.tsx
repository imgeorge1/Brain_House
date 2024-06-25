import { useState } from "react";

const Practice = () => {
  const data = [
    { city: "New York", street: "Broadway" },
    { city: "New York", street: "5th Avenue" },
    { city: "Los Angeles", street: "Sunset Boulevard" },
    { city: "Los Angeles", street: "Hollywood Boulevard" },
    { city: "Chicago", street: "Michigan Avenue" },
  ];

  const [selectedCity, setSelectedCity] = useState("New York");
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
        <select
          className="border p-2"
          value={selectedStreet}
          onChange={(e) => setSelectedStreet(e.target.value)}
          disabled={!selectedCity}
        >
          {streetsForCity.map((street, index) => (
            <option key={index} value={street}>
              {street}
            </option>
          ))}
        </select>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">City</th>
            <th className="py-2">Street</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{item.city}</td>
              <td className="border px-4 py-2">{item.street}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default Practice;
