"use client";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";

export default function PokedexView({ data }) {
  //Setup the state for the pokemon array, sort by, pagination, and search
  const [pokemonArray, setPokemonArray] = useState([]);
  const [sortBy, setSortBy] = useState("id");
  const [search, setSearch] = useState("");
  const [num, setNum] = useState(10);

  //useEffect so that everytime there is a change in number, search or sort, the pokemon array is updated
  useEffect(() => {
    //if sortBy is id, sort the array by padid
    if (sortBy == "id") {
      //if there is a search, filter the array by the search
      if (search) {
        setPokemonArray(
          data
            .filter(
              (pokemon) =>
                pokemon.name.includes(search.toLowerCase()) ||
                pokemon.padId.includes(search),
            )
            .sort((a, b) => parseInt(a.id) - parseInt(b.id))
            .slice(0, num),
        ); //if there is no search just return the sliced array
      } else {
        setPokemonArray(
          data.sort((a, b) => parseInt(a.id) - parseInt(b.id)).slice(0, num),
        );
      } //if sortBy is name, sort the array by name
    } else {
      //the same as above but sorting by name
      if (search) {
        setPokemonArray(
          data
            .filter(
              (pokemon) =>
                pokemon.name.includes(search.toLowerCase()) ||
                pokemon.padId.includes(search),
            )
            .sort((a, b) => a.name.localeCompare(b.name))
            .slice(0, num),
        );
      } else {
        setPokemonArray(
          data.sort((a, b) => a.name.localeCompare(b.name)).slice(0, num),
        );
      }
    } //if any of the dependencies change, update the pokemon array
  }, [num, search, sortBy]);

  return (
    <div>
      <div className="flex flex-row gap-3">
        <input
          type="text"
          placeholder="Search for a Pokémon (Enter a name or ID)"
          onChange={(e) => setSearch(e.target.value)}
          className="mb-10 w-full rounded-full border border-gray-300 p-2"
        />
        <select
          className="mb-10 w-2/3 rounded-full px-4 py-2 sm:w-1/4"
          onChange={(e) => {
            setSortBy(e.target.value);
          }}
          defaultValue={sortBy}
        >
          <option value="id">Sort By ID</option>
          <option value="name">Sort By Name</option>
        </select>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {pokemonArray &&
          pokemonArray.map((pokemon) => (
            <Link key={pokemon.id} href={`/pokemon/${pokemon.id}`}>
              <Card
                className="h-full items-stretch p-4"
                id={pokemon.types.split(", ")[0].toLowerCase()}
              >
                <CardTitle className="relative text-right">
                  #{String(pokemon.id).padStart(3, "0")}
                </CardTitle>
                <CardContent className="flex flex-col items-center">
                  <Image
                    src={pokemon.image}
                    height={100}
                    width={100}
                    alt={pokemon.name}
                  />
                  <div>
                    <h1 className="text-xl font-bold">
                      {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
                    </h1>
                    <div>
                      <p>
                        Type(s):{" "}
                        {pokemon.types.split(", ").map((type) => (
                          <span
                            key={type}
                            className="rounded-md border px-1"
                            id={type.toLowerCase()}
                          >
                            {type}{" "}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
      </div>
      <div className="mt-10 text-center">
        <button
          onClick={() => setNum(num + 10)}
          className="rounded-md border px-4 py-2"
        >
          Load More
        </button>
      </div>
    </div>
  );
}
