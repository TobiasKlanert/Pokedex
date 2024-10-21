function getOverviewPokemonCardRef(pokemonID) {
  return `
      <div onclick="generatePokemonDetailCard(${pokemonID})" class="card-wrapper">
          <img
              class="card-background"
              src="./img/transparent-pokeball.png"
              alt=""
          />
          <div class="pokemon-card ${pokemonType1}">
              <div class="pokemon-header">
                  <h2 class="pokemon-name">${pokemonName}</h2>
                  <span class="pokemon-number">${pokemonNumber}</span>
              </div>
              <div class="pokemon-body">
                  <div class="pokemon-types">
                      <span class="type ${pokemonType1}">${typePlate1}</span>
                      <span class="type ${pokemonType2}">${typePlate2}</span>
                  </div>
                  <img
                      class="pokemon-image"
                      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonIdent}.png"
                      alt="${pokemonName}"
                  />
              </div>
          </div>
      </div>
      <div id="pokemonDetailDialog"></div>`;
}

function getDetailPokemonCardRef(pokemonID) {
  return `
      <div
        onclick="toggleDisplayNone('pokemonDetailBody')"
        id="pokemonDetailBody"
        class="dialog-wrapper"
      >
        <div onclick="stopEventBubbling(event)" class="dialog detail-${pokemonType1}">
          <div class="dialog-intro">
            <div class="dialog-intro-background"></div>
            <div class="dialog-header">
              <div class="dialog-header-number">
                <span>${pokemonNumber}</span>
                <span
                  onclick="toggleDisplayNone('pokemonDetailBody')"
                  class="close-dialog"
                  >&times;</span
                >
              </div>
              <div class="dialog-header-name">
                <h2 class="dialog-pokemon-name">${pokemonName}</h2>
                <div class="pokemon-types flex-direction-row">
                  <span class="type ${pokemonType1} margin-right-10px z-index-2">${typePlate1}</span>
                  <span class="type ${pokemonType2} z-index-2">${typePlate2}</span>
                </div>
              </div>
            </div>
            <div class="dialog-artwork">
              <img
                class="dialog-artwork-image"
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonIdent}.png"
                alt="${pokemonName}"
              />

            </div>
          </div>
          <div class="dialog-data">
            <div class="dialog-tabs">
              <button
                id="tabAbout"
                class="dialog-tablink activeTab"
                onclick="generateTabContentAbout()"
              >
                About
              </button>
              <button
                id="tabBaseStats"
                class="dialog-tablink"
                onclick="generateTabContentBaseStats()"
              >
                Base Stats
              </button>
              <button
                id="tabEvolution"
                class="dialog-tablink"
                onclick="generateTabContentEvolution(pokemonEvolutions)"
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

function getTabContentAboutRef() {
  return `
          <table class="pokemon-info-table">
              <tr>
                  <td>Species:</td>
                  <td>${pokemonSpecies}</td>
              </tr>
              <tr>
                  <td>Height:</td>
                  <td>${pokemonHeight} m</td>
              </tr>
              <tr>
                  <td>Weight:</td>
                  <td>${pokemonWeight} kg</td>
              </tr>
              <tr>
                  <td>Abilities:</td>
                  <td>${pokemonAbility1}${pokemonAbility2}${pokemonAbility3}</td>
              </tr>
          </table>
          <h4>Breeding</h4>
          <table class="pokemon-info-table">
              <tr>
                  <td>Gender:</td>
                  <td>${pokemonGender}</td>
              </tr>
              <tr>
                  <td>Egg Groups:</td>
                  <td>${pokemonEggGroup1}${pokemonEggGroup2}</td>
              </tr>
              <tr>
                  <td>Egg Cycle:</td>
                  <td>${pokemonEggCycle} cycles</td>
              </tr>
          </table>`;
}

function getTabContentBaseStatsRef() {
  const maxHP = 255;
  const maxAttack = 190;
  const maxDefense = 250;
  const maxSpAtk = 194;
  const maxSpDef = 250;
  const maxSpeed = 200;
  const maxTotal = 1125;

  function getBarWidth(value, maxValue) {
    const maxBarWidth = 100; // maximale Breite des Balkens in Prozent
    return (value / maxValue) * maxBarWidth;
  }

  return `
          <table class="pokemon-info-table">
          <tr>
            <td>HP</td>
            <td class="text-right">${pokemonBaseStatHP}</td>
            <td>
              <div class="bar-container">
                <div class="bar" style="width: ${getBarWidth(
                  pokemonBaseStatHP,
                  maxHP
                )}%; background-color: #FF5959;"></div>
              </div>
            </td>
          </tr>
          <tr>
            <td>Attack</td>
            <td class="text-right">${pokemonBaseStatAtk}</td>
            <td>
              <div class="bar-container">
                <div class="bar" style="width: ${getBarWidth(
                  pokemonBaseStatAtk,
                  maxAttack
                )}%; background-color: #F5AC78;"></div>
              </div>
            </td>
          </tr>
          <tr>
            <td>Defense</td>
            <td class="text-right">${pokemonBaseStatDef}</td>
            <td>
              <div class="bar-container">
                <div class="bar" style="width: ${getBarWidth(
                  pokemonBaseStatDef,
                  maxDefense
                )}%; background-color: #FAE078;"></div>
              </div>
            </td>
          </tr>
          <tr>
            <td>Sp. Atk.</td>
            <td class="text-right">${pokemonBaseStatSpAtk}</td>
            <td>
              <div class="bar-container">
                <div class="bar" style="width: ${getBarWidth(
                  pokemonBaseStatSpAtk,
                  maxSpAtk
                )}%; background-color: #9DB7F5;"></div>
              </div>
            </td>
          </tr>
          <tr>
            <td>Sp. Def.</td>
            <td class="text-right">${pokemonBaseStatSpDef}</td>
            <td>
              <div class="bar-container">
                <div class="bar" style="width: ${getBarWidth(
                  pokemonBaseStatSpDef,
                  maxSpDef
                )}%; background-color: #A7DB8D;"></div>
              </div>
            </td>
          </tr>
          <tr>
            <td>Speed</td>
            <td class="text-right">${pokemonBaseStatSpeed}</td>
            <td>
              <div class="bar-container">
                <div class="bar" style="width: ${getBarWidth(
                  pokemonBaseStatSpeed,
                  maxSpeed
                )}%; background-color: #FA92B2;"></div>
              </div>
            </td>
          </tr>
          <tr>
            <td>Total</td>
            <td class="text-right">${pokemonBaseStatTotal}</td>
            <td>
              <div class="bar-container">
                <div class="bar" style="width: ${getBarWidth(
                  pokemonBaseStatTotal,
                  maxTotal
                )}%; background-color: #D3D3D3;"></div>
              </div>
            </td>
          </tr>
        </table>
        `;
}

function getTabContentEvolutionRef(evolutionID) {
  let evolution = pokemonEvolutions[evolutionID];
  return `
      <div class="pokemon-evolution-info">
        <img class="pokemon-evolution-image" src="${evolution.pokemonEvolutionImage}" alt="">
        <span>#${evolution.pokemonEvolutionID}: ${evolution.pokemonEvolutionName}</span>
      </div>
          `;
}
