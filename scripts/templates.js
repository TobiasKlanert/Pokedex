function getOverviewPokemonCardRef(pokemonID, pokemonData) {
  return `
      <div onclick="generatePokemonDetailCard(${pokemonID})" class="card-wrapper">
          <img
              class="card-background"
              src="./img/transparent-pokeball.png"
              alt=""
          />
          <div class="pokemon-card ${pokemonData.pokemonType1}">
              <div class="pokemon-header">
                  <h2 class="pokemon-name">${pokemonData.pokemonName}</h2>
                  <span class="pokemon-number">${pokemonData.pokemonNumber}</span>
              </div>
              <div class="pokemon-body">
                  <div class="pokemon-types">
                      <span class="type ${pokemonData.pokemonType1}">${pokemonData.typePlate1}</span>
                      <span class="type ${pokemonData.pokemonType2}">${pokemonData.typePlate2}</span>
                  </div>
                  <img
                      class="pokemon-image"
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.pokemonIdent}.png"
                      alt="${pokemonData.pokemonName}"
                  />
              </div>
          </div>
      </div>
      <div id="pokemonDetailDialog"></div>`;
}

function getDetailPokemonCardRef(pokemonID, pokemonData) {
  return `
      <div
        onclick="toggleDisplayNone('pokemonDetailBody')"
        id="pokemonDetailBody"
        class="dialog-wrapper"
      >
        <div onclick="stopEventBubbling(event)" class="dialog detail-${pokemonData.pokemonType1}">
          <div class="dialog-intro">
            <div class="dialog-intro-background"></div>
            <div class="dialog-header">
              <div class="dialog-header-number">
                <span>${pokemonData.pokemonNumber}</span>
                <span
                  onclick="toggleDisplayNone('pokemonDetailBody')"
                  class="close-dialog"
                  >&times;</span
                >
              </div>
              <div class="dialog-header-name">
                <h2 class="dialog-pokemon-name">${pokemonData.pokemonName}</h2>
                <div class="pokemon-types flex-direction-row">
                  <span class="type ${pokemonData.pokemonType1} margin-right-10px z-index-2">${pokemonData.typePlate1}</span>
                  <span class="type ${pokemonData.pokemonType2} z-index-2">${pokemonData.typePlate2}</span>
                </div>
              </div>
            </div>
            <div class="dialog-artwork">
              <img
                class="dialog-artwork-image"
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.pokemonIdent}.png"
                alt="${pokemonData.pokemonName}"
              />

            </div>
          </div>
          <div class="dialog-data">
            <div class="dialog-tabs">
              <button
                id="tabAbout"
                class="dialog-tablink activeTab"
                onclick="generateTabContentAbout(${pokemonID})"
              >
                About
              </button>
              <button
                id="tabBaseStats"
                class="dialog-tablink"
                onclick="generateTabContentBaseStats(${pokemonID})"
              >
                Base Stats
              </button>
              <button
                id="tabEvolution"
                class="dialog-tablink"
                onclick="generateTabContentEvolution(${pokemonID})"
              >
                Evolution
              </button>
            </div>
            <div id="tabContent" class="dialog-tab-content">
            </div>
            <div class="dialog-footer">
            <button
              onclick="showPreviousPokemon(${pokemonID})"
              class="nav-button"
            >
              <img src="./img/arrow-left.png" alt="Previous" class="arrow-img" />
            </button>
            <button onclick="showNextPokemon(${pokemonID})" class="nav-button">
              <img src="./img/arrow-right.png" alt="Next" class="arrow-img" />
            </button>
          </div>
          </div>
        </div>
      </div>`;
}

function getTabContentAboutRef(pokemonData, speciesData) {
  return `
          <table class="pokemon-info-table">
              <tr>
                  <td>Species:</td>
                  <td>${speciesData.pokemonSpecies}</td>
              </tr>
              <tr>
                  <td>Height:</td>
                  <td>${pokemonData.pokemonHeight} m</td>
              </tr>
              <tr>
                  <td>Weight:</td>
                  <td>${pokemonData.pokemonWeight} kg</td>
              </tr>
              <tr>
                  <td>Abilities:</td>
                  <td>${pokemonData.pokemonAbility1}${pokemonData.pokemonAbility2}${pokemonData.pokemonAbility3}</td>
              </tr>
          </table>
          <h4>Breeding</h4>
          <table class="pokemon-info-table">
              <tr>
                  <td>Gender:</td>
                  <td>${speciesData.pokemonGender}</td>
              </tr>
              <tr>
                  <td>Egg Groups:</td>
                  <td>${speciesData.pokemonEggGroup1}${speciesData.pokemonEggGroup2}</td>
              </tr>
              <tr>
                  <td>Egg Cycle:</td>
                  <td>${speciesData.pokemonEggCycle} cycles</td>
              </tr>
          </table>`;
}

function getTabContentBaseStatsRef(baseStats) {
  const maxHP = 255;
  const maxAttack = 190;
  const maxDefense = 250;
  const maxSpAtk = 194;
  const maxSpDef = 250;
  const maxSpeed = 200;
  const maxTotal = 1125;

  return `
          <table class="pokemon-info-table">
          <tr>
            <td>HP</td>
            <td class="text-right">${baseStats.pokemonBaseStatHP}</td>
            <td>
              <div class="bar-container">
                <div class="bar" style="width: ${getBarWidth(
                  baseStats.pokemonBaseStatHP,
                  maxHP
                )}%; background-color: #FF5959;"></div>
              </div>
            </td>
          </tr>
          <tr>
            <td>Attack</td>
            <td class="text-right">${baseStats.pokemonBaseStatAtk}</td>
            <td>
              <div class="bar-container">
                <div class="bar" style="width: ${getBarWidth(
                  baseStats.pokemonBaseStatAtk,
                  maxAttack
                )}%; background-color: #F5AC78;"></div>
              </div>
            </td>
          </tr>
          <tr>
            <td>Defense</td>
            <td class="text-right">${baseStats.pokemonBaseStatDef}</td>
            <td>
              <div class="bar-container">
                <div class="bar" style="width: ${getBarWidth(
                  baseStats.pokemonBaseStatDef,
                  maxDefense
                )}%; background-color: #FAE078;"></div>
              </div>
            </td>
          </tr>
          <tr>
            <td>Sp. Atk.</td>
            <td class="text-right">${baseStats.pokemonBaseStatSpAtk}</td>
            <td>
              <div class="bar-container">
                <div class="bar" style="width: ${getBarWidth(
                  baseStats.pokemonBaseStatSpAtk,
                  maxSpAtk
                )}%; background-color: #9DB7F5;"></div>
              </div>
            </td>
          </tr>
          <tr>
            <td>Sp. Def.</td>
            <td class="text-right">${baseStats.pokemonBaseStatSpDef}</td>
            <td>
              <div class="bar-container">
                <div class="bar" style="width: ${getBarWidth(
                  baseStats.pokemonBaseStatSpDef,
                  maxSpDef
                )}%; background-color: #A7DB8D;"></div>
              </div>
            </td>
          </tr>
          <tr>
            <td>Speed</td>
            <td class="text-right">${baseStats.pokemonBaseStatSpeed}</td>
            <td>
              <div class="bar-container">
                <div class="bar" style="width: ${getBarWidth(
                  baseStats.pokemonBaseStatSpeed,
                  maxSpeed
                )}%; background-color: #FA92B2;"></div>
              </div>
            </td>
          </tr>
          <tr>
            <td>Total</td>
            <td class="text-right">${baseStats.pokemonBaseStatTotal()}</td>
            <td>
              <div class="bar-container">
                <div class="bar" style="width: ${getBarWidth(
                  baseStats.pokemonBaseStatTotal(),
                  maxTotal
                )}%; background-color: #D3D3D3;"></div>
              </div>
            </td>
          </tr>
        </table>
        `;
}

function getTabContentEvolutionRef(evolutionID, evolutions) {
  let evolution = evolutions[evolutionID];
  return `
      <div class="pokemon-evolution-info">
        <img class="pokemon-evolution-image" src="${evolution.pokemonEvolutionImage}" alt="">
        <span>#${evolution.pokemonEvolutionID}: ${evolution.pokemonEvolutionName}</span>
      </div>
          `;
}