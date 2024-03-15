import Image from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const weakness = {
  Normal: ["Rock", "Ghost", "Steel"],
  Fighting: ["Flying", "Poison", "Psychic", "Bug", "Ghost", "Fairy"],
  Flying: "Rock, Steel, Electric",
  Poison: ["Poison", "Ground", "Rock", "Ghost", "Steel"],
  Ground: ["Flying", "Bug", "Grass"],
  Rock: ["Fighting", "Ground", "Steel"],
  Bug: ["Fighting", "Flying", "Poison", "Ghost", "Steel", "Fire", "Fairy"],
  Ghost: ["Normal", "Dark"],
  Steel: ["Steel", "Fire", "Water", "Electric"],
  Fire: ["Rock", "Fire", "Water", "Dragon"],
  Water: ["Water", "Grass", "Dragon"],
  Grass: ["Flying", "Poison", "Bug", "Steel", "Fire", "Grass", "Dragon"],
  Electric: ["Ground", "Grass", "Electric", "Dragon"],
  Psychic: ["Steel", "Psychic", "Dark"],
  Ice: ["Steel", "Fire", "Water", "Ice"],
  Dragon: ["Steel", "Fairy"],
  Dark: ["Fighting", "Dark", "Fairy"],
  Fairy: ["Poison", "Steel", "Fire"],
};
const getEvolutions = (evol) => {
  let evolutions = [];
  let evo = evol.chain;
  do {
    evolutions.push({
      name: evo.species.name,
      id: evo.species.url.split("/")[6],
    });
    evo = evo.evolves_to[0];
  } while (!!evo && evo.hasOwnProperty("evolves_to"));
  return evolutions;
};

//get the pokemon info and the evolution info from the api
async function getPokemonInfo(id) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();
  const species = await fetch(data.species.url);
  const speciesData = await species.json();
  const evolLink = speciesData.evolution_chain.url;
  const evol = await fetch(evolLink);
  const evolData = await evol.json();
  data.evolutions = getEvolutions(evolData);
  return data;
}

export default async function Index({ params }) {
  const info = await getPokemonInfo(params.id);
  if (info) {
    return (
      <div className="flex h-[100vh] flex-col items-center overflow-hidden overscroll-none  border">
        <div
          className="flex w-full flex-col items-center  pt-10 md:w-1/2"
          id={info.types && info.types[0].type.name}
        >
          <div className="flex w-full justify-between">
            <Link href={`/`} className="ml-10">
              <ArrowBack />
            </Link>
            <h1 className="mr-10 text-right text-4xl">
              {info.id && "#" + String(info.id).padStart(3, "0")}
            </h1>
          </div>
          <Image
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${String(info.id).padStart(3, "0")}.png`}
            alt={info.name}
            width={200}
            height={200}
          />
          <div className="flex h-[100vh] w-[100vh] flex-col items-center overflow-hidden rounded-full bg-white">
            <div className="flex w-1/3 flex-col items-center">
              <div className="mb-12 mt-12 flex flex-row gap-4 text-3xl">
                {info.id > 1 && (
                  <Link href={`/pokemon/${info.id - 1}`}>
                    <ArrowBack />
                  </Link>
                )}
                {info.name && info.name[0].toUpperCase() + info.name.slice(1)}
                {info.id < 1010 && (
                  <Link href={`/pokemon/${info.id + 1}`}>
                    <ArrowForward />
                  </Link>
                )}
              </div>
              <div className="text-center text-xl">
                <Tabs defaultValue="info" className="h-[100px]">
                  <TabsContent value="info" className="h-[230px]">
                    <p>
                      Base Experience:{" "}
                      <span className="font-bold">{info.base_experience}</span>
                    </p>
                    <p>
                      Height: <span className="font-bold">{info.height}</span>{" "}
                      Weight: <span className="font-bold">{info.weight}</span>
                    </p>
                    <p>
                      Types:{" "}
                      {info.types &&
                        info.types.map((type) => (
                          <span
                            className="mr-2 rounded-lg border px-1"
                            id={type.type.name.toLowerCase()}
                          >
                            {type.type.name[0].toUpperCase() +
                              type.type.name.slice(1)}
                          </span>
                        ))}
                    </p>
                    <p>
                      Abilities:{" "}
                      <span className="font-bold">
                        {info.abilities &&
                          info.abilities
                            .map(
                              (ability) =>
                                ability.ability.name[0].toUpperCase() +
                                ability.ability.name.slice(1),
                            )
                            .join(", ")}
                      </span>
                    </p>
                  </TabsContent>
                  <TabsContent value="stats" className="h-[230px]">
                    {info.stats &&
                      info.stats.map((stat) => (
                        <p key={stat.stat.name}>
                          {stat.stat.name[0].toUpperCase() +
                            stat.stat.name.slice(1)}
                          : <span className="font-bold">{stat.base_stat}</span>
                        </p>
                      ))}
                  </TabsContent>
                  <TabsContent value="moves" className="h-[230px]">
                    <h1>Moves (scroll):</h1>
                    <ScrollArea className="h-[170px]">
                      {info.moves &&
                        info.moves.map((move) => (
                          <p key={move.move.name} className="font-bold">
                            {move.move.name[0].toUpperCase() +
                              move.move.name.slice(1)}
                          </p>
                        ))}
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="weakness" className="h-[230px]">
                    <h1>Weaknesses (scroll):</h1>
                    <ScrollArea className="h-[170px]">
                      {info.types &&
                        info.types
                          .map(
                            (type) =>
                              weakness[
                                type.type.name[0].toUpperCase() +
                                  type.type.name.slice(1)
                              ],
                          )
                          .flat()
                          .filter((v, i, a) => a.indexOf(v) === i)
                          .map((type) => (
                            <p key={type}>
                              <span
                                className="mr-2 scroll-px-2 rounded-lg border"
                                id={type.toLowerCase()}
                              >
                                {type}
                              </span>
                            </p>
                          ))}
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="evolutions" className="h-[230px]">
                    <h1>Evolutions:</h1>
                    <div className="mt-10 flex flex-row justify-center gap-4">
                      {info.evolutions &&
                        info.evolutions.map((evo) => (
                          <div className="flex flex-col items-center justify-center">
                            <Image
                              src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${String(evo.id).padStart(3, "0")}.png`}
                              alt={evo.name}
                              width={50}
                              height={50}
                            />
                            <p>
                              {evo.name[0].toUpperCase() + evo.name.slice(1)}
                            </p>
                          </div>
                        ))}
                    </div>
                  </TabsContent>
                  <div className="">
                    <TabsList className=" border bg-gray-100">
                      <TabsTrigger
                        value="info"
                        className="data-[state=active]:bg-gray-100 data-[state=active]:shadow-lg"
                      >
                        Info
                      </TabsTrigger>
                      <TabsTrigger
                        value="stats"
                        className="data-[state=active]:bg-gray-100 data-[state=active]:shadow-lg"
                      >
                        Stats
                      </TabsTrigger>
                      <TabsTrigger
                        value="moves"
                        className="data-[state=active]:bg-gray-100 data-[state=active]:shadow-lg"
                      >
                        Moves
                      </TabsTrigger>
                      <TabsTrigger
                        value="weakness"
                        className="data-[state=active]:bg-gray-100 data-[state=active]:shadow-lg"
                      >
                        Weakness
                      </TabsTrigger>
                      <TabsTrigger
                        value="evolutions"
                        className="data-[state=active]:bg-gray-100 data-[state=active]:shadow-lg"
                      >
                        Evolutions
                      </TabsTrigger>
                    </TabsList>
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
