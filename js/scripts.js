let pokemonRepository = (function () {
  let pokemonList = [];
  let apiURL = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsURL" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("Invalid Pokemon");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
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

  function showLoadingMessage() {
    const loadingMessage = document.querySelector("#load-message");
    loadingMessage.className = "display";
  }

  function hideLoadingMessage() {
    const loadingMessage = document.querySelector("#load-message");
    loadingMessage.className = "do-not-display";
  }

  function loadList() {
    showLoadingMessage(); //show load message
    return fetch(apiURL)
      .then(function (response) {
        setTimeout(() => {
          hideLoadingMessage(); //hide load message
        }, 500);
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsURL: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        hideLoadingMessage(); //hide load message in case of an error
        console.error(e);
      });
  }

  function loadDetails(item) {
    showLoadingMessage(); //show load message
    let url = item.detailsURL;
    return fetch(url)
      .then(function (response) {
        setTimeout(() => {
          hideLoadingMessage(); //hide load message
        }, 500);
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        hideLoadingMessage(); //hide load message in case of an error
        console.error(e);
      });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
