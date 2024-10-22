let pokemonBaseData = [];
let pokemonSpeciesData = [];
let pokemonEvolutionData = [];

async function getPokemonData(pokemonID) {
  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonID}`;
  const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonID}`;

  try {
    const [pokemonResponse, speciesResponse] = await Promise.all([
      fetch(pokemonUrl),
      fetch(speciesUrl),
    ]);

    const [pokemonData, speciesData] = await Promise.all([
      pokemonResponse.json(),
      speciesResponse.json(),
    ]);

    const newPokemonBase = generatePokemonBaseDataArr(pokemonData);
    pokemonBaseData.push(newPokemonBase);

    const newPokemonSpecies = generatePokemonSpeciesDataArr(
      speciesData,
      pokemonID
    );
    pokemonSpeciesData.push(newPokemonSpecies);

    const evolutionChainUrl = speciesData.evolution_chain.url;
    const evolutionChainResponse = await fetch(evolutionChainUrl);
    const evolutionChainData = await evolutionChainResponse.json();

    const evolutionArray = await generateEvolutionDataArr(
      evolutionChainData.chain
    );
    pokemonEvolutionData.push({
      pokemonID: pokemonID,
      evolutionChain: evolutionArray,
    });
  } catch (error) {
    console.error("Fehler beim Abrufen der Pokémon-Daten:", error);
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

async function generateEvolutionDataArr(chain) {
  let evolutions = [];

  function traverseEvolutionChain(chain) {
    const speciesUrl = chain.species.url;
    const pokemonIdent = extractPokemonIDFromURL(speciesUrl);

    evolutions.push({
      name: chain.species.name,
      pokemonID: pokemonIdent,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonIdent}.png`,
    });

    if (chain.evolves_to.length > 0) {
      for (const nextEvolution of chain.evolves_to) {
        traverseEvolutionChain(nextEvolution);
      }
    }
  }

  traverseEvolutionChain(chain);
  return evolutions;
}

function extractPokemonIDFromURL(url) {
  const urlParts = url.split("/");
  return urlParts[urlParts.length - 2];
}