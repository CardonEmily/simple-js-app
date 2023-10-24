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

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener("click", () => showDetails(pokemon));
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
  };
})();

console.log(pokemonRepository.getAll());

pokemonRepository.add({ name: "Pikachu" });

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
