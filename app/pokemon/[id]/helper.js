export var weakness = {
  Normal: ["Rock", "Ghost", "Steel"],
  Fighting: ["Flying", "Poison", "Psychic", "Bug", "Ghost", "Fairy"],
  Flying: ["Rock", "Steel", "Electric"],
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

export var strongAgainst = {
  Normal: [""],
  Fighting: ["Normal", "Rock", "Steel", "Ice", "Dark"],
  Flying: ["Fighting", "Bug", "Grass"],
  Poison: ["Grass", "Fairy"],
  Ground: ["Poison", "Rock", "Steel", "Fire", "Electric"],
  Rock: ["Flying", "Bug", "Fire", "Ice"],
  Bug: ["Grass", "Psychic", "Dark"],
  Ghost: ["Ghost", "Psychic"],
  Steel: ["Rock", "Ice", "Fairy"],
  Fire: ["Bug", "Steel", "Grass", "Ice"],
  Water: ["Ground", "Rock", "Fire"],
  Grass: ["Ground", "Rock", "Water"],
  Electric: ["Flying", "Water"],
  Psychic: ["Fighting", "Poison"],
  Ice: ["Flying", "Ground", "Grass", "Dragon"],
  Dragon: ["Dragon"],
  Dark: ["Ghost", "Psychic"],
  Fairy: ["Fighting", "Dragon", "Dark"],
};