"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const [name, setName] = useState("");
  const [num, setNum] = useState(10);
  const [pokemonArray, setPokemonArray] = useState([]);
  const fa = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // Fetch all pokemon id, name, type, image

  const fetchType = async (id) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();
    return data.types[0].type.name;
  };

  const fetchPokemon = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000`);
    const data = await res.json();
    const pokemons = data.results;
    console.log(pokemons);
    pokemons.map((pokemon) => {
      pokemon.id = pokemon.url.split("/")[6];
      pokemon.image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${String(pokemon.id).padStart(3, "0")}.png`;
      pokemon.type = fetchType(pokemon.id);
    });
    return pokemons;
  };
  useEffect(() => {
    if (name) {
      fetchPokemon().then((data) => {
        setPokemonArray(
          data.filter((pokemon) => pokemon.name.includes(name.toLowerCase())),
        );
      });
    } else {
      fetchPokemon().then((data) => {
        //limit to 10
        setPokemonArray(data.slice(0, num));
      });
    }
  }, [name, num]);

  return (
    <main className="min-h-screen items-center justify-between p-24 pt-10">
      <h1 className="mb-10 text-center text-4xl font-bold">
        Welcome to your Pokédex
      </h1>
      <input
        type="text"
        placeholder="Search for a Pokémon"
        className="mb-10 w-full rounded-full border border-gray-300 p-2"
        onChange={(e) => setName(e.target.value)}
      />

      <div className="grid grid-cols-5 gap-4">
        {pokemonArray.length > 0 &&
          pokemonArray.map((pokemon) => {
            return (
              <Card key={pokemon.id}>
                <CardContent className="flex flex-col items-center p-2">
                  <Image
                    src={pokemon.image}
                    alt={pokemon.name}
                    width={100}
                    height={100}
                  />
                  <div>
                    <p>Id: {pokemon.id}</p>
                    <p>
                      Name:{" "}
                      {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
                    </p>
                    <p>Type: {pokemon.type}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        {pokemonArray.length == 0 &&
          fa.map((i) => (
            <Card key={i}>
              <CardContent className="flex flex-col items-center p-2">
                <Skeleton className="h-[100px] w-full rounded-xl bg-gray-400" />
                <Skeleton className="mt-3 h-10 w-full rounded-xl bg-gray-400" />
              </CardContent>
            </Card>
          ))}
      </div>
      <div className="mt-10 flex flex-row justify-center">
        <button
          onClick={() => setNum(num + 10)}
          className="rounded-md border p-2"
        >
          {" "}
          Load More{" "}
        </button>
      </div>
    </main>
  );
}
