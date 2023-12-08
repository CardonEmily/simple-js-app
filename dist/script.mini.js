const pokemonRepository = (function () {
  let t = [];
  function e() {
    return t;
  }
  function i(e) {
    t.push(e);
  }
  function n() {
    let t = document.querySelector("#load-message");
    t.className = "display";
  }
  function o() {
    let t = document.querySelector("#load-message");
    t.className = "do-not-display";
  }
  function a(t) {
    n();
    let e = t.detailsUrl;
    return fetch(e)
      .then(function (t) {
        return t.json();
      })
      .then(function (e) {
        (t.imageUrlFront = e.sprites.front_default),
          (t.imageUrlBack = e.sprites.back_default),
          (t.weight = e.weight),
          (t.height = e.height),
          (t.types = e.types.map(function (t) {
            return t.type.name;
          })),
          (t.abilities = e.abilities.map(function (t) {
            return t.ability.name;
          }));
      })
      .catch(function (t) {
        o(), console.error(t);
      });
  }
  function l(t) {
    a(t).then(function () {
      !(function t(e) {
        let i = $(".modal-body"),
          n = $(".modal-title"),
          o = $("modalBody modalTitle");
        n.empty(), i.empty();
        let a = $("<h1 class='modal-title'>" + e.name + "</h1>"),
          l = $("<p>height : " + e.height + " m </p>"),
          s = $("<p>weight : " + e.weight + " kg </p>"),
          p = $("<p>types : " + e.types.join(", ") + "</p>"),
          r = $("<p>abilities : " + e.abilities.join(", ") + "</p>"),
          d = $('<img class="modal-img" style="width:50%">');
        d.attr("src", e.imageUrlFront);
        let c = $('<img class="modal-img" style="width:50%">');
        c.attr("src", e.imageUrlBack),
          n.append(a),
          i.append(l),
          i.append(s),
          i.append(p),
          i.append(r),
          i.append(d),
          i.append(c),
          o.on("hidden.bs.modal", function () {
            $(this).find("modal").trigger("reset");
          });
      })(t);
    });
  }
  return {
    add: i,
    getAll: e,
    addListItem: function t(e) {
      let i = $(".pokemon-list"),
        n = $("<li></li>"),
        o = $("<button></button>");
      n.addClass("list-group-item", "mx-auto"),
        o.text(e.name),
        o.addClass("btn btn-default"),
        o.attr("data-target", "#pokemonModal"),
        o.attr("data-toggle", "modal"),
        n.append(o),
        i.append(n),
        o.on("click", function () {
          l(e);
        });
    },
    loadList: function t() {
      return (
        n(),
        fetch("https://pokeapi.co/api/v2/pokemon/?limit=150")
          .then(function (t) {
            return t.json();
          })
          .then(function (t) {
            t.results.forEach(function (t) {
              let e = {
                name: t.name,
                height: t.height,
                types: t.types,
                weight: t.weight,
                abilities: t.abilities,
                detailsUrl: t.url,
              };
              i(e);
            });
          })
          .catch(function (t) {
            o(), console.error(t);
          })
      );
    },
    loadDetails: a,
    showDetails: l,
  };
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (t) {
    pokemonRepository.addListItem(t);
  });
});
