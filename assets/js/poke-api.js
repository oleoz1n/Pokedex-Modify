
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other['official-artwork'].front_default
    pokemon.weight = pokeDetail.weight
    pokemon.height = pokeDetail.height
    const abilities = pokeDetail.abilities.map((abilitiesSlot)=> abilitiesSlot.ability.name)
    const ability = abilities[abilities.length - 1]
    pokemon.ability = ability
    pokemon.abilities = abilities
    pokemon.xp = pokeDetail.base_experience
    
    const stats = pokeDetail.stats.map((statsSlot)=> statsSlot.base_stat)
    pokemon.hp = stats[0]
    pokemon.attack = stats[1]
    pokemon.defense = stats[2]
    pokemon.spatk = stats[3]
    pokemon.spdef = stats[4]
    pokemon.speed = stats[5]
    pokemon.total = stats[0] + stats[1] + stats[2] + stats[3] + stats[4] + stats[5]
    
    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset, limit) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
