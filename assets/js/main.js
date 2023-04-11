const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 251;
const limit = 151;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
    <li id="${pokemon.name}"class="pokemon ${pokemon.type}" onclick="returnPokemon(${pokemon.number-1})"> 
      
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            
        </li>
    `
}

function convertPokemonToStats(pokemon){
    console.log(pokemon.stats,pokemon.weight,pokemon.height,pokemon.moves)
}

function returnPokemon(numero){
    pokeApi.getPokemons(numero, 1).then((pokemons=[])=>{
        pokemons.map(convertPokemonToStats)
    })
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}


loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})