const pokemonImg = document.getElementById('pokemon-image');
const palpite = document.getElementById('guess-input');
const btnPalpite = document.getElementById('submit-btn');
const btnNext = document.getElementById('next-btn');
let pokemonNome = '';

function getRandomId() {
    return Math.floor(Math.random() * 250) + 1;
}

async function carregarPokemon() {
    const id = getRandomId();
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        pokemonImg.src = data.sprites.front_default;
        pokemonNome = data.name;
    } catch (error) {
        console.error('Erro ao carregar Pokémon:', error);
        pokemonName.textContent = 'Erro ao carregar Pokémon';
        pokemonImg.src = '';
    }

    mostrarNome();
}

function mostrarNome(){
    console.log(pokemonNome)
}

function revelarImagem() {
  pokemonImg.classList.add('revealed');
}

btnPalpite.addEventListener('click', () => {
    if (palpite.value.toLowerCase().trim() !== pokemonNome.toLowerCase()){
        alert('Ops! Tente novamente.');
        palpite.value = '';
        return;
    }

    alert('Parabéns! Você acertou!');
    revelarImagem();
    btnNext.disabled = false;
});

btnNext.addEventListener('click', () => {
    carregarPokemon();
    palpite.value = '';
    btnNext.disabled = true;
    pokemonImg.classList.remove('revealed');
});

carregarPokemon();