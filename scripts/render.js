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
}

function generateOverviewPokemonCard() {
  let pokedexContentRef = document.getElementById("mainContent");

  pokedexContentRef.innerHTML = "";

  for (pokemonID = 0; pokemonID < currentPokemonData.length; pokemonID++) {
    declareVariables(pokemonID);
    pokedexContentRef.innerHTML += getOverviewPokemonCardRef(pokemonID);
  }
}

function generatePokemonDetailCard(pokemonID) {
  let dialogContentRef = document.getElementById("pokemonDetailDialog");

  dialogContentRef.innerHTML = "";

  declareVariables(pokemonID);
  declareEvolutionVariables(pokemonID);
  dialogContentRef.innerHTML = getDetailPokemonCardRef(pokemonID);
  generateTabContentAbout();
}

function generateTabContentAbout() {
  let tabContentRef = document.getElementById("tabContent");

  tabContentRef.innerHTML = "";
  tabContentRef.innerHTML = getTabContentAboutRef();
  markedActive("tabAbout");
}

function generateTabContentBaseStats() {
  let tabContentRef = document.getElementById("tabContent");

  tabContentRef.innerHTML = "";
  tabContentRef.innerHTML = getTabContentBaseStatsRef();
  markedActive("tabBaseStats");
}

function generateTabContentEvolution(pokemonEvolutions) {
  let tabContentRef = document.getElementById("tabContent");

  tabContentRef.innerHTML = `
  <div id="evolutionContainer" class="evolution-container">
  </div>
`;

let evolutionContentRef = document.getElementById("evolutionContainer");

  for (let evolutionID = 0; evolutionID < pokemonEvolutions.length; evolutionID++) {
    evolutionContentRef.innerHTML += getTabContentEvolutionRef(evolutionID);
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
  }
}

function showNextPokemon(pokemonID) {
  if (pokemonID + 1 <= currentPokemonData.length - 1) {
    generatePokemonDetailCard(pokemonID + 1);
  }
}
