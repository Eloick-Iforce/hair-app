"use client";

import { useState, useEffect } from "react";
import { Data, Feature } from "../public/type";

function App() {
  const [data, setData] = useState<Feature[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 200;

  useEffect(() => {
    fetch("/coiffeurs.json")
      .then((response) => response.json())
      .then((json: { data: Data }) => setData(json.data.features));
  }, []);

  const filteredData = data
    .filter((item) =>
      item.properties.nom.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => a.properties.nom.localeCompare(b.properties.nom));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="p-10 bg-blue-400 min-h-screen">
      <div className="flex justify-center mb-4 items-center text-white">
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded mr-2 card "
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <p className="text-white">{filteredData.length} résultats</p>
      </div>
      <div className="flex flex-wrap justify-around">
        {currentItems.map((item, index) => (
          <div key={index} className="w-96 card m-5">
            <div className="px-6 py-4 flex-grow">
              <div className="font-bold text-xl mb-2 text-white">
                {item.properties.nom}
              </div>
              <p className="text-white text-base">{item.properties.addresse}</p>
            </div>
            <div className="px-6 py-4">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${item.geometry.coordinates[1]},${item.geometry.coordinates[0]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Voir sur Google Maps
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center space-x-2 flex-wrap mb-5">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className="px-3 py-2 card text-white"
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
