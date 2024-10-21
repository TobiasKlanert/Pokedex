let counterID = 1;
let counterDataset = 41;

let currentPokemonData = [];
let currentSpeciesData = [];
let currentEvolutionData = [];

async function init() {
  toggleDisplayNone("loadButton");
  showLoadingSpinner();

  await loadData();

  currentPokemonData = pokemonBaseData;
  currentSpeciesData = pokemonSpeciesData;
  currentEvolutionData = pokemonEvolutionData;

  generateOverviewPokemonCard();
  toggleDisplayNone("loadButton");
}

async function loadData() {
  for (pokemonID = counterID; pokemonID < counterDataset; pokemonID++) {
    await getPokemonBaseData(pokemonID);
    await getPokemonSpeciesData(pokemonID);
    await getPokemonEvolutionData(pokemonID);
  }
}

async function loadMore() {
  counterID = counterDataset;
  counterDataset += 20;

  await init();

  window.scrollTo(0, document.body.scrollHeight);
  document.getElementById("pokemonSearch").value = "";
}

function filterPokemonByName(pokemonName) {
  currentPokemonData = pokemonBaseData.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(pokemonName.toLowerCase())
  );

  currentSpeciesData = currentPokemonData.map((pokemon) => {
    return (
      pokemonSpeciesData.find((species) => species.number === pokemon.number) ||
      {}
    );
  });

  currentEvolutionData = currentPokemonData.map((pokemon) => {
    return (
      pokemonEvolutionData.find(
        (evolution) => evolution.pokemonID === pokemon.number
      ) || {}
    );
  });

  generateOverviewPokemonCard();
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("pokemonSearch")
    .addEventListener("input", function (event) {
      const searchQuery = event.target.value;
      if (searchQuery.length >= 3) {
        filterPokemonByName(searchQuery);
      } else if (searchQuery.length === 0) {
        currentPokemonData = pokemonBaseData;
        currentSpeciesData = pokemonSpeciesData;
        currentEvolutionData = pokemonEvolutionData;
        generateOverviewPokemonCard();
      }
    });
});

function declareBaseDataVariables(pokemonID) {
  let baseData = currentPokemonData[pokemonID];

  return {
    pokemonType1: baseData.types[0],
    pokemonType2: baseData.types[1],
    typePlate1: firstLetterUpperCase(baseData.types[0]),
    typePlate2: firstLetterUpperCase(baseData.types[1]),
    pokemonName: firstLetterUpperCase(baseData.name),
    pokemonNumber: generatePokemonNumber(baseData.number - 1),
    pokemonIdent: baseData.number,
  };
}

function declareExtendedBaseDataVariables(pokemonID) {
  let baseData = currentPokemonData[pokemonID];

  return {
    pokemonHeight: baseData.height / 10,
    pokemonWeight: baseData.weight / 10,
    pokemonAbility1: firstLetterUpperCase(baseData.abilities[0]),
    pokemonAbility2:
      checkIfDefined(baseData.abilities[1]) +
      firstLetterUpperCase(baseData.abilities[1]),
    pokemonAbility3:
      checkIfDefined(baseData.abilities[2]) +
      firstLetterUpperCase(baseData.abilities[2]),
  };
}

function declareSpeciesDataVariables(pokemonID) {
  let speciesData = currentSpeciesData[pokemonID];

  return {
    pokemonSpecies: speciesData.species,
    pokemonGender: getPokemonGender(speciesData),
    pokemonEggGroup1: firstLetterUpperCase(speciesData.egg_groups[0]),
    pokemonEggGroup2:
      checkIfDefined(speciesData.egg_groups[1]) +
      firstLetterUpperCase(speciesData.egg_groups[1]),
    pokemonEggCycle: speciesData.egg_cycle,
  };
}

function declareBaseStatsVariables(pokemonID) {
  let baseData = currentPokemonData[pokemonID];

  return {
    pokemonBaseStatHP: baseData.base_stats[0].value,
    pokemonBaseStatAtk: baseData.base_stats[1].value,
    pokemonBaseStatDef: baseData.base_stats[2].value,
    pokemonBaseStatSpAtk: baseData.base_stats[3].value,
    pokemonBaseStatSpDef: baseData.base_stats[4].value,
    pokemonBaseStatSpeed: baseData.base_stats[5].value,
    pokemonBaseStatTotal: function () {
      let baseStatTotal = 0;
      for (let index = 0; index < baseData.base_stats.length; index++) {
        baseStatTotal += baseData.base_stats[index].value;
      }
      return baseStatTotal;
    },
  };
}

function declareEvolutionVariables(pokemonID) {
  let evolutionData = currentEvolutionData[pokemonID];
  let pokemonEvolutions = [];

  for (let index = 0; index < evolutionData.evolutionChain.length; index++) {
    let evolution = {
      pokemonEvolutionID: evolutionData.evolutionChain[index].pokemonID,
      pokemonEvolutionName: firstLetterUpperCase(
        evolutionData.evolutionChain[index].name
      ),
      pokemonEvolutionImage: evolutionData.evolutionChain[index].imageUrl,
    };
    pokemonEvolutions.push(evolution);
  }
  return pokemonEvolutions;
}

function getBarWidth(value, maxValue) {
  const maxBarWidth = 100;
  return (value / maxValue) * maxBarWidth;
}

function checkIfDefined(element) {
  if (element) {
    return ", ";
  } else {
    return "";
  }
}

function firstLetterUpperCase(word) {
  if (word != undefined) {
    let parts = word.split("-");
    let capitalizedParts = parts.map(
      (part) => part.charAt(0).toUpperCase() + part.slice(1)
    );
    return capitalizedParts.join("-");
  } else {
    return "";
  }
}

function stopEventBubbling(event) {
  event.stopPropagation();
}
