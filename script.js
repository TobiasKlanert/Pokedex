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

//TODO: seperate functions -> base data, about, base stats, evolution
function declareVariables(pokemonID) {
  let baseData = currentPokemonData[pokemonID];
  let speciesData = currentSpeciesData[pokemonID];
  let evolutionData = currentEvolutionData[pokemonID];

  pokemonType1 = baseData.types[0];
  pokemonType2 = baseData.types[1];
  typePlate1 = firstLetterUpperCase(pokemonType1);
  typePlate2 = firstLetterUpperCase(pokemonType2);
  pokemonName = firstLetterUpperCase(baseData.name);
  pokemonIdent = baseData.number;
  pokemonNumber = generatePokemonNumber(baseData.number - 1);
  pokemonSpecies = speciesData.species;
  pokemonHeight = baseData.height / 10;
  pokemonWeight = baseData.weight / 10;
  pokemonAbility1 = firstLetterUpperCase(baseData.abilities[0]);
  pokemonAbility2 =
    checkIfDefined(baseData.abilities[1]) +
    firstLetterUpperCase(baseData.abilities[1]);
  pokemonAbility3 =
    checkIfDefined(baseData.abilities[2]) +
    firstLetterUpperCase(baseData.abilities[2]);
  pokemonGender = getPokemonGender(speciesData);
  pokemonEggGroup1 = firstLetterUpperCase(speciesData.egg_groups[0]);
  pokemonEggGroup2 =
    checkIfDefined(speciesData.egg_groups[1]) +
    firstLetterUpperCase(speciesData.egg_groups[1]);
  pokemonEggCycle = speciesData.egg_cycle;

  pokemonBaseStatHP = baseData.base_stats[0].value;
  pokemonBaseStatAtk = baseData.base_stats[1].value;
  pokemonBaseStatDef = baseData.base_stats[2].value;
  pokemonBaseStatSpAtk = baseData.base_stats[3].value;
  pokemonBaseStatSpDef = baseData.base_stats[4].value;
  pokemonBaseStatSpeed = baseData.base_stats[5].value;
  pokemonBaseStatTotal =
    pokemonBaseStatHP +
    pokemonBaseStatAtk +
    pokemonBaseStatDef +
    pokemonBaseStatSpAtk +
    pokemonBaseStatSpDef +
    pokemonBaseStatSpeed;

  evolutionTest = evolutionData;
  pokemonEvolution1 = evolutionData.evolutionChain[0];
  pokemonEvolution2 = evolutionData.evolutionChain[1];
  pokemonEvolution3 = evolutionData.evolutionChain[2];

  console.log(currentEvolutionData[pokemonID]);
  
}

function getPokemonGender(speciesData) {
  const male = `<img class="symbol" src="./img/male.png" alt="male">`;
  const female = `<img class="symbol" src="./img/femail.png" alt="femail">`;

  switch (speciesData.gender) {
    case -1:
      return "asexual";
    case 0:
      return `${male} 100%`;
    case 1:
      return `${male} 87.5% / ${female} 12.5%`;
    case 2:
      return `${male} 75% / ${female} 25%`;
    case 3:
      return `${male} 62.5% / ${female} 37.5%`;
    case 4:
      return `${male} 50% / ${female} 50%`;
    case 5:
      return `${male} 37.5% / ${female} 62.5%`;
    case 6:
      return `${male} 25% / ${female} 75%`;
    case 7:
      return `${male} 12.5% / ${female} 87.5%`;
    case 8:
      return `${female} 100%`;
  }
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

function generatePokemonNumber(pokemonID) {
  let pokemonNumber = pokemonID + 1;
  switch (true) {
    case pokemonNumber < 10:
      return "#000" + pokemonNumber;
    case pokemonNumber < 100:
      return "#00" + pokemonNumber;
    case pokemonNumber < 1000:
      return "#0" + pokemonNumber;
    case pokemonNumber > 1000:
      return "#" + pokemonNumber;
    default:
      return "###";
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
        generateOverviewPokemonCard();
      }
    });
});
