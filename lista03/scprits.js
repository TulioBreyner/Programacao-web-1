const searchBtn = document.getElementById("searchBtn");
const pokemonInput = document.getElementById("pokemonInput");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const pokemonCard = document.getElementById("pokemonCard");

const pokemonName = document.getElementById("pokemonName");
const pokemonNumber = document.getElementById("pokemonNumber");
const pokemonSprite = document.getElementById("pokemonSprite");
const pokemonHeight = document.getElementById("pokemonHeight");
const pokemonWeight = document.getElementById("pokemonWeight");
const pokemonTypes = document.getElementById("pokemonTypes");

searchBtn.addEventListener("click", () => {
    const query = pokemonInput.value.trim().toLowerCase();
    if (query) {
        buscarPokemon(query);
    }
});

pokemonInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});

async function buscarPokemon(query) {
    showLoading();
    hideError();
    hideCard();

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
        const data = await response.json();
        mostrarPokemon(data);
    } catch (err) {
        showError();
    } finally {
        hideLoading();
    }
}

function mostrarPokemon(data) {
    pokemonName.textContent = data.name;
    pokemonNumber.textContent = `#${data.id.toString().padStart(3, "0")}`;
    pokemonSprite.src = data.sprites.other["official-artwork"].front_default || data.sprites.front_default;
    pokemonSprite.alt = data.name;
    pokemonHeight.textContent = `${data.height / 10} m`;
    pokemonWeight.textContent = `${data.weight / 10} kg`;
    pokemonTypes.textContent = data.types.map(t => t.type.name).join(", ");

    showCard();
}

function showLoading() {
    loading.classList.remove("hidden");
}

function hideLoading() {
    loading.classList.add("hidden");
}

function showError() {
    error.classList.remove("hidden");
}

function hideError() {
    error.classList.add("hidden");
}

function showCard() {
    pokemonCard.classList.remove("hidden");
}

function hideCard() {
    pokemonCard.classList.add("hidden");
}
