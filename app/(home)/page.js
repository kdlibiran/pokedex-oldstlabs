import PokedexView from "@/components/pokedexView";

//Fetch the types of the pokemon based on the id of the pokemon
const fetchTypes = async (id) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();
  return data.types
    .map((type) => type.type.name[0].toUpperCase() + type.type.name.slice(1))
    .join(", ");
};

//Fetch the pokemon data from the pokeapi 1 - 1010
const fetchPokemon = async () => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${1010}`);
  const data = await res.json();
  const pokemons = data.results;
  //For each pokemon, add the id, image and types
  for (const pokemon of pokemons) {
    //Get the id of the pokemon from the url
    pokemon.id = String(pokemon.url.split("/")[6]);
    //Use the id and add some padding to get the image of the pokemon
    pokemon.image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${String(pokemon.id).padStart(3, "0")}.png`;
    //Fetch the types of the pokemon
    pokemon.types = await fetchTypes(pokemon.id);
  }

  return pokemons;
};

export default async function Home() {
  const data = await fetchPokemon();
  return (
    <main className="min-h-screen items-center justify-between p-5 pt-5 sm:px-24">
      <h1 className="mb-10 text-center text-4xl font-bold">
        Welcome to your Pokédex
      </h1>
      {data && <PokedexView data={data} />}
    </main>
  );
}
