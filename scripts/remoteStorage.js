let pokemonBaseData = [];
let pokemonSpeciesData = [];
let pokemonEvolutionData = [];

async function getPokemonBaseData(pokemonID) {
  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonID}`;

  try {
    const pokemonResponse = await fetch(pokemonUrl);
    const pokemonData = await pokemonResponse.json();
    console.log("Pokemon loaded: ", pokemonID);

    const newPokemon = generatePokemonBaseDataArr(pokemonData);
    pokemonBaseData.push(newPokemon);
  } catch (error) {
    console.error("Error when retrieving Pokémon data: ", error);
  }
}

async function getPokemonSpeciesData(pokemonID) {
  const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonID}`;

  try {
    const speciesResponse = await fetch(speciesUrl);
    const speciesData = await speciesResponse.json();

    const newPokemon = generatePokemonSpeciesDataArr(speciesData, pokemonID);
    pokemonSpeciesData.push(newPokemon);
  } catch (error) {
    console.error("Error when retrieving species data: ", error);
  }
}

async function getPokemonEvolutionData(pokemonID) {
  const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonID}`;

  try {
    const speciesResponse = await fetch(speciesUrl);
    const speciesData = await speciesResponse.json();

    const evolutionChainUrl = speciesData.evolution_chain.url;

    const evolutionChainResponse = await fetch(evolutionChainUrl);
    const evolutionChainData = await evolutionChainResponse.json();

    const evolutionArray = generateEvolutionDataArr(evolutionChainData.chain);
    pokemonEvolutionData.push({
      pokemonID: pokemonID,
      evolutionChain: evolutionArray,
    });
  } catch (error) {
    console.error("Error when retrieving the evolutionary chain: ", error);
  }
}

function generatePokemonBaseDataArr(pokemonData) {
  const pokemonBaseData = {
    number: pokemonData.id,
    name: pokemonData.name,
    types: pokemonData.types.map((typeInfo) => typeInfo.type.name),
    height: pokemonData.height,
    weight: pokemonData.weight,
    abilities: pokemonData.abilities.map(
      (abilityInfo) => abilityInfo.ability.name
    ),
    base_stats: pokemonData.stats.map((stat) => ({
      name: stat.stat.name,
      value: stat.base_stat,
    })),
  };
  return pokemonBaseData;
}

function generatePokemonSpeciesDataArr(speciesData, pokemonID) {
  const pokemonSpeciesData = {
    number: pokemonID,
    species: speciesData.genera.find((gen) => gen.language.name === "en").genus,
    gender: speciesData.gender_rate,
    egg_groups: speciesData.egg_groups.map((group) => group.name),
    egg_cycle: speciesData.hatch_counter,
  };
  return pokemonSpeciesData;
}

function generateEvolutionDataArr(chain) {
  let evolutions = [];
  let currentChain = chain;

  while (currentChain) {
    evolutions.push(currentChain.species.name);
    if (currentChain.evolves_to.length > 0) {
      currentChain = currentChain.evolves_to[0];
    } else {
      currentChain = null;
    }
  }
  return evolutions;
}