const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const expandpokemon = document.getElementById('expandpokemon')
const content = document.getElementById('content');


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
  return`
    <div id="pokemonExpand" class="pokemonData ${pokemon.type}">
    <div class="header">
      <div class="margin2">
        <img id="back" src="assets/svg/backarrow.svg" onclick="back()" alt="back" />
        <div class="space-between margin-height pokemon-nome">
          <span class="name font-white">${pokemon.name}</span><span class="font-white">#${pokemon.number}</span>
        </div>
        <ol class="typesA">
        ${pokemon.types.map((type) => `<li class="typeA ${type}">${type}</li>`).join('')}
        </ol>
      </div>
      <div class="grid-pokedex">
        <div id="arrow-left" class="arrows">
          <img id="leftarrow" src="assets/svg/leftarrow.svg" alt="left" onclick="prepokemon(${pokemon.number-2})" />
        </div>
        <img
          class="Pokeimg"
          src="${pokemon.photo}"
          alt="${pokemon.name}"
        />
        <div id="arrow-right" class="arrows alt="right" onclick="propokemon(${pokemon.number})">
          <img
            class="arrows"
            id="rightarrow"
            src="assets/svg/rightarrow.svg"
            alt="right"
          />
        </div>
      </div>
    </div>
    <div id="divabout" class="about infos-display" >
      <ul class="informations">
        <li id="click-about" class="information select" onclick="about()">About</li>
        <li id="click-stats" class="information" onclick="stats()">Stats</li>
    </ul>
      <div class="infos-grid ">
      <div class="especificacoes">
        <ol class="olmod">
          <li>Base exp</li>
        <li>Height</li>
        <li>Weight</li>
        <li>Abilities</li>
        <li>Type</li>
      </ol>
      </div>
      <div class="dados">
        <ol class="olmod">
          <li>${pokemon.xp} xp</li>
      <li>${pokemon.height/10} m</li>
      <li>${pokemon.weight/10} kg</li>
      <li>${pokemon.abilities.map((abilitie) => `<span>${abilitie}, </span>`).slice(0, -1).join('')}${`<span>${pokemon.ability}</span>`}</li>
      <li>${pokemon.type}</li>
    </ol>
    </div>
    </div>
  </div>
  <div id="divstats" class="infos-display none">
  <ul class="informations">
        <li id="click-about" class="information" onclick="about()">About</li>
        <li id="click-stats" class="information select" onclick="stats()">Stats</li>
    </ul>
  <div class="infos-grid stats">
    <div class="especificacoes">
      <ol class="olmod">
      <li>HP</li>
      <li>Attack</li>
      <li>Defense</li>
      <li>SP. Atk</li>
      <li>SP. Def</li>
      <li>Speed</li>
      <li>Total</li>
    </ol>
    </div>
    <div class="dados">
      <ol class="olmod">
      <div class="align-center gap-5 espaco"><li><span>${pokemon.hp}</span></li><div class="progress-bar" > <div style="width: ${pokemon.hp}%;--widthA:${pokemon.hp};"></div>  </div></div>
      <div class="align-center gap-5 espaco"><li><span>${pokemon.attack}</span></li><div class="progress-bar" > <div style="width: ${pokemon.attack}%;--widthA:${pokemon.attack};"></div> </div></div>
      <div class="align-center gap-5 espaco"><li><span>${pokemon.defense}</span></li><div class="progress-bar" > <div style="width: ${pokemon.defense}%;--widthA:${pokemon.defense};"></div> </div></div>
      <div class="align-center gap-5 espaco"><li><span>${pokemon.spatk}</span></li><div class="progress-bar" > <div style="width: ${pokemon.spatk}%;--widthA:${pokemon.spatk};"></div> </div></div>
      <div class="align-center gap-5 espaco"><li><span>${pokemon.spdef}</span></li><div class="progress-bar" > <div style="width: ${pokemon.spdef}%;--widthA:${pokemon.spdef};"></div> </div></div>
      <div class="align-center gap-5 espaco"><li><span>${pokemon.speed}</span></li><div class="progress-bar" > <div style="width: ${pokemon.speed}%;--widthA:${pokemon.speed};"></div> </div></div>
      <div class="align-center gap-5 espaco"><li><span>${pokemon.total}</span></li><div class="progress-bar" > <div style="width: ${pokemon.total/6}%;--widthA:${pokemon.total/6};"></div> </div></div>
    </ol>
    </div>  
  </div>
</div>
</div>`
}

function returnPokemon(numero){
    pokeApi.getPokemons(numero, 1).then((pokemons=[])=>{
        const newinspec = pokemons.map(convertPokemonToStats).join('')
        expandpokemon.classList.remove('none')
        content.classList.add('none')
        expandpokemon.innerHTML = newinspec
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

function back() {
  expandpokemon.classList.add('none')
  content.classList.remove('none')
}

function about(){
  var divabout = document.getElementById('divabout')
  var divstats = document.getElementById('divstats')
  divabout.classList.remove('none');
  divstats.classList.add('none');
}

function stats(){
  var divabout = document.getElementById('divabout')
  var divstats = document.getElementById('divstats')
  divabout.classList.add('none');
  divstats.classList.remove('none');
}

function prepokemon(numero){
  if(numero == -1){
    numero = 250
    pokeApi.getPokemons(numero, 1).then((pokemons=[])=>{
      const newinspec = pokemons.map(convertPokemonToStats).join('')
      expandpokemon.classList.remove('none')
      content.classList.add('none')
      expandpokemon.innerHTML = newinspec
  })
}
  else {
  pokeApi.getPokemons(numero, 1).then((pokemons=[])=>{
    const newinspec = pokemons.map(convertPokemonToStats).join('')
    expandpokemon.classList.remove('none')
    content.classList.add('none')
    expandpokemon.innerHTML = newinspec
})
}
}
function propokemon(numero){
  if(numero == 251){
    numero = 0
    pokeApi.getPokemons(numero, 1).then((pokemons=[])=>{
      const newinspec = pokemons.map(convertPokemonToStats).join('')
      expandpokemon.classList.remove('none')
      content.classList.add('none')
      expandpokemon.innerHTML = newinspec
  })
}
else {
  pokeApi.getPokemons(numero, 1).then((pokemons=[])=>{
    const newinspec = pokemons.map(convertPokemonToStats).join('')
    expandpokemon.classList.remove('none')
    content.classList.add('none')
    expandpokemon.innerHTML = newinspec
})
}
}