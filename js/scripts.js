const pokemonRepository = (function () {
  const pokemonList = [];
  const apiURL = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function addListItem(pokemon) {
    const pokemonList = document.querySelector(".pokemon-list");
    const listItem = document.createElement("li");
    const button = document.createElement("button");
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
        });
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          const pokemon = {
            name: item.name,
            detailsURL: item.url,
            imageUrl: item.img,
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
    const url = item.detailsURL;
    return fetch(url)
      .then(function (response) {
        setTimeout(() => {
          hideLoadingMessage(); //hide load message
        });
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        item.abilities = details.abilities;
      })
      .catch(function (e) {
        hideLoadingMessage(); //hide load message in case of an error
        console.error(e);
      });
  }

  function showModal(pokemon) {
    const modalContainer = document.querySelector("#modal-container");
    modalContainer.innerHTML = "";

    const modal = document.createElement("div");
    modal.classList.add("modal");

    const closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";
    closeButtonElement.addEventListener("click", hideModal);

    const titleElement = document.createElement("h2");
    titleElement.innerText = "Pokemon" + ": " + pokemon.name;

    const contentElement = document.createElement("p");
    contentElement.innerText = "Pokemon height" + ": " + pokemon.height + "m.";

    const myImage = document.createElement("img");
    myImage.src = pokemon.imageUrl;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(myImage);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add("is-visible");

    modalContainer.addEventListener("click", (e) => {
      // Close the modal if there is a click off the
      const target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
  }

  function hideModal() {
    const modalContainer = document.querySelector("#modal-container");
    modalContainer.classList.remove("is-visible");
  }

  window.addEventListener("keydown", (e) => {
    const modalContainer = document.querySelector("#modal-container");
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  document.querySelector("#show-modal").addEventListener("click", () => {
    showModal("title", "text");
  });

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
      showModal(pokemon);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
  };
})();

console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
