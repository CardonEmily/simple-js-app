let pokemonRepository = (function () {
  let pokemonList = [
    {
      name: "Ninetales",
      height: 1.1,
      type: ["Fire"],
      abilities: ["Flash-Fire", "Drought"],
    },

    {
      name: "Dewgong",
      height: 1.7,
      type: ["Ice", "Water"],
      abilities: ["Thick-Fat", "Hydration", "Ice-Body"],
    },

    {
      name: "Tropius",
      height: 2,
      type: ["Grass", "Flying"],
      abilities: ["Chlorophyll", "Solar Power", "Harvest"],
    },

    {
      name: "Reshiram",
      height: 3.2,
      type: ["Fire", "Dragon"],
      abilities: ["Turboblaze"],
    },

    {
      name: "Gardevoir",
      height: 1.6,
      type: ["Fairy", "Psychic"],
      abilities: ["Synchronize", "Trace", "Telepathy"],
    },
  ];
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll,
  };
})();

console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: "Pikachu" });

pokemonRepository
  .getAll()
  .forEach((pokemon) =>
    document.write(
      pokemon.name +
        " (" +
        pokemon.type +
        ")," +
        " has a height of " +
        pokemon.height +
        "m. <br> "
    )
  );
