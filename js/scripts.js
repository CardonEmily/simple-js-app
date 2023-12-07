const pokemonRepository = (function () {
  const pokemonList = [];
  //pokemon API
  const apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  //function to return pokemonList-array
  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function addListItem(pokemon) {
    //selecting the pokemon-list
    const pokemonList = $(".pokemon-list");
    const listItem = $("<li></li>");
    const btn = $("<button></button>");
    listItem.addClass("list-group-item", "mx-auto");

    //Button text is the name of the pokemon
    btn.text(pokemon.name);
    btn.addClass("btn btn-default");

    btn.attr("data-target", "#pokemonModal");
    btn.attr("data-toggle", "modal");

    //allows buttons and list to show on page
    listItem.append(btn);
    pokemonList.append(listItem);

    btn.on("click", function () {
      showDetails(pokemon);
    });
  }

  function showSearchBar() {
    const searchBar = $("searchBar");
    searchBar.on("keyup", function () {
      const searchString = target.value;
      const filteredPokemon = pokemonList.filter((pokemon) => {
        return pokemon.name.includes(searchString);
      });
      displayPokemon(filteredPokemon);
    });
  }

  function showLoadingMessage() {
    const loadingMessage = document.querySelector("#load-message");
    loadingMessage.className = "display";
  }

  function hideLoadingMessage() {
    const loadingMessage = document.querySelector("#load-message");
    loadingMessage.className = "do-not-display";
  }

  function showModal(pokemon) {
    const modalBody = $(".modal-body");
    const modalTitle = $(".modal-title");
    const modal = $("modalBody modalTitle");

    //Clears existing modal content
    modalTitle.empty();
    modalBody.empty();

    const nameElement = $("<h1 class='modal-title'>" + pokemon.name + "</h1>");
    const heightElement = $("<p>" + "height : " + pokemon.height + "</p>");
    const weightElement = $("<p>" + "weight : " + pokemon.weight + "</p>");
    const typesElement = $(
      "<p>" + "types : " + pokemon.types.join(", ") + "</p>"
    );
    const abilitiesElement = $(
      "<p>" + "abilities : " + pokemon.abilities.join(", ") + "</p>"
    );
    const imageElementFront = $('<img class="modal-img" style="width:50%">');
    imageElementFront.attr("src", pokemon.imageUrlFront);
    const imageElementBack = $('<img class="modal-img" style="width:50%">');
    imageElementBack.attr("src", pokemon.imageUrlBack);

    modalTitle.append(nameElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);

    modal.on("hidden.bs.modal", function () {
      $(this).find("modal").trigger("reset");
    });
  }

  function loadList() {
    showLoadingMessage(); //show load message
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          const pokemon = {
            name: item.name,
            height: item.height,
            types: item.types,
            weight: item.weight,
            abilities: item.abilities,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        hideLoadingMessage(); //hide load message in case of an error
        console.error(e);
      });
  }

  function loadDetails(pokemon) {
    showLoadingMessage(); //show load message
    const url = pokemon.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        pokemon.imageUrlFront = details.sprites.front_default;
        pokemon.imageUrlBack = details.sprites.back_default;
        pokemon.weight = details.weight;
        pokemon.height = details.height;
        pokemon.types = details.types.map(function (type) {
          return type.type.name;
        });
        pokemon.abilities = details.abilities.map(function (ability) {
          return ability.ability.name;
        });
      })
      .catch(function (e) {
        hideLoadingMessage(); //hide load message in case of an error
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
