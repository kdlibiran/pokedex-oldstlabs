"use client";

import { useEffect, useState } from "react";

export default function Index({ params }) {
  //setup the state for the pokemon info
  const [info, setInfo] = useState([]);
  //get the pokemon info from the api
  const getPokemonInfo = async (id) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    return data;
  };

  //setup a useEffect to get the pokemon info when the page loads
  useEffect(() => {
    getPokemonInfo(params.id).then((data) => {
      setInfo(data);
    });
  }, []);

  return (
    <div>
      <h1>Id: {info.id}</h1>
      <p>Name: {info.name}</p>
      <p>Height: {info.height}</p>
      <p>Weight: {info.weight}</p>
      <p>Base Experience: {info.base_experience}</p>
      <p>
        Abilities:{" "}
        {info.abilities &&
          info.abilities.map((ability) => ability.ability.name).join(", ")}
      </p>
      <p>
        Types:{" "}
        {info.types && info.types.map((type) => type.type.name).join(", ")}
      </p>
      <p>
        Moves:{" "}
        {info.moves && info.moves.map((move) => move.move.name).join(", ")}
      </p>
    </div>
  );
}
