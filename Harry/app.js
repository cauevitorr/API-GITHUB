// const urlBase = 'https://hp-api.onrender.com/api/characters';

const loadCharacters = async () => {
    const res = await fetch(urlBase);
    const data = await res.json();
    const limitData = data.slice(0, 25);
    return { results: limitData };
};

const loadAllWithPromiseAll = async () => {
    const [characters] = await Promise.all([loadCharacters()]);
    console.log('Character: ', characters.results);
    showCharacter(characters.results);
};

loadAllWithPromiseAll();

function showCharacter(characters) {
    const characterContainer = document.getElementById('character-container');
    characters.forEach((character) => {
        const divCharacter = document.createElement('div');
        divCharacter.id = `character-${character.id}`;
        divCharacter.innerHTML = `
            <img src="${character.image}" alt="Imagem do personagem">
            <article class="character-info">
                <h3>${character.name}</h3>
                <span class="${character.alive}">${character.alive === true ? 'Alive' : 'Dead'}</span>
                <span class="${character.species}">Specie - ${character.species}</span>
                <span class="${character.gender}">Gender - ${character.gender}</span>
                <span class="${character.patronus}">Patronus - ${character.patronus === "" ? 'unknow' : character.patronus}</span>
                <span class="${character.house}">House - ${character.house === "" ? 'unknow' : character.house}</span>
                <span class="${character.yearOfBirth}">Year Of Birth - ${character.yearOfBirth === null ? 'unknow' : character.yearOfBirth}</span>
                <span class="${character.ancestry}">Ancestry - ${character.ancestry}</span>
                <span class="${character.actor}">Actor - ${character.actor}</span>

            </article>
        `;
        divCharacter.classList.add('character-box');
        characterContainer.appendChild(divCharacter);
        divCharacter.addEventListener('click', () => {
            characterDetails(character.id);
        });
    });
}

function characterDetails(id) {
    console.log(id);
    const idEncrypted = encryptId(id);
    console.log(idEncrypted);
    window.location.href = `character.html?id=${idEncrypted}`;
}

function encryptId(id) {
    return id;
}
