function showLoadingSpinner() {
  let mainContent = document.getElementById("mainContent");
  mainContent.innerHTML = "";
  mainContent.innerHTML = `
    <div id="loadingSpinner" class="loading-spinner">
        <img class="spinner" src="./img/pokeball.png" alt="" />
    </div>`;
}

function toggleDisplayNone(element) {
  document.getElementById(element).classList.toggle("d-none");

  if (element === 'pokemonDetailBody') {
    document.body.classList.remove("hide-scrollbar");
  }
}

function generateOverviewPokemonCard() {
  let pokedexContentRef = document.getElementById("mainContent");

  pokedexContentRef.innerHTML = "";

  for (pokemonID = 0; pokemonID < currentPokemonData.length; pokemonID++) {
    let pokemonData = declareBaseDataVariables(pokemonID);
    pokedexContentRef.innerHTML += getOverviewPokemonCardRef(pokemonID, pokemonData);
  }
}

function generatePokemonDetailCard(pokemonID) {
  let dialogContentRef = document.getElementById("pokemonDetailDialog");
  let pokemonData = declareBaseDataVariables(pokemonID);

  dialogContentRef.innerHTML = "";

  dialogContentRef.innerHTML = getDetailPokemonCardRef(pokemonID, pokemonData);
  generateTabContentAbout(pokemonID);
  
  document.body.classList.add("hide-scrollbar");
}

function generateTabContentAbout(pokemonID) {
  let tabContentRef = document.getElementById("tabContent");
  let pokemonData = declareExtendedBaseDataVariables(pokemonID);
  let speciesData = declareSpeciesDataVariables(pokemonID);

  tabContentRef.innerHTML = "";
  tabContentRef.innerHTML = getTabContentAboutRef(pokemonData, speciesData);
  markedActive("tabAbout");
}

function generateTabContentBaseStats(pokemonID) {
  let tabContentRef = document.getElementById("tabContent");
  let baseStats = declareBaseStatsVariables(pokemonID);

  tabContentRef.innerHTML = "";
  tabContentRef.innerHTML = getTabContentBaseStatsRef(baseStats);
  markedActive("tabBaseStats");
}

function generateTabContentEvolution(pokemonID) {
  let tabContentRef = document.getElementById("tabContent");
  const evolutions = declareEvolutionVariables(pokemonID);

  tabContentRef.innerHTML = `
  <div id="evolutionContainer" class="evolution-container">
  </div>
`;

let evolutionContentRef = document.getElementById("evolutionContainer");

  for (let evolutionID = 0; evolutionID < evolutions.length; evolutionID++) {
    evolutionContentRef.innerHTML += getTabContentEvolutionRef(evolutionID, evolutions);
  }

  markedActive('tabEvolution');
}

function markedActive(tab) {
  let tabClass = document.getElementById(tab);

  document.getElementById("tabAbout").classList.remove("activeTab");
  document.getElementById("tabBaseStats").classList.remove("activeTab");
  document.getElementById("tabEvolution").classList.remove("activeTab");

  tabClass.classList.add("activeTab");
}

function showPreviousPokemon(pokemonID) {
  if (pokemonID - 1 >= 0) {
    generatePokemonDetailCard(pokemonID - 1);
  } else {
    generatePokemonDetailCard(pokemonBaseData.length-1);
  }
}

function showNextPokemon(pokemonID) {
  if (pokemonID + 1 <= currentPokemonData.length - 1) {
    generatePokemonDetailCard(pokemonID + 1);
  } else {
    generatePokemonDetailCard(0);
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