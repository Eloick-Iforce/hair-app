"use client";

import { useState, useEffect } from "react";
import { Data, Feature } from "../../public/type";
import Link from "next/link";

function App() {
  const [data, setData] = useState<Feature | null>(null);

  const fetchHairdresser = () => {
    fetch("/coiffeurs.json")
      .then((response) => response.json())
      .then((json: Data) => {
        const randomIndex = Math.floor(
          Math.random() * json.data.features.length
        );
        setData(json.data.features[randomIndex]);
      });
  };

  useEffect(() => {
    fetchHairdresser();
  }, []);

  return (
    <div className="p-10 bg-blue-400 min-h-screen flex flex-col items-center justify-center">
      <Link href="/">
        <p className="p-2 bg-blue-500 text-white rounded">
          La liste de tous les établisements
        </p>
      </Link>
      {data && (
        <div className="w-96 card m-5 p-5 rounded shadow-lg text-center leading-10">
          <h2 className="text-2xl mb-4">{data.properties.nom}</h2>
          <p>Latitude: {data.properties.lat}</p>
          <p>Longitude: {data.properties.lng}</p>
          <p>Numéro de Rue: {data.properties.num}</p>
          <p>Rue: {data.properties.voie}</p>
          <p>Ville: {data.properties.ville}</p>
          <p>Code Postal: {data.properties.codepostal}</p>
          <div
            dangerouslySetInnerHTML={{
              __html: data.properties.markerinnerhtml,
            }}
          />
          <p>Address: {data.properties.addresse}</p>
          <p>Coordinates: {data.geometry.coordinates.join(", ")}</p>
        </div>
      )}
      <button
        className="mt-5 p-2 bg-blue-500 text-white rounded"
        onClick={fetchHairdresser}
      >
        Un autre ?
      </button>
    </div>
  );
}

export default App;
