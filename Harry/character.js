function decryptId(id) {
    return id;
}

async function loadCharacter(baseUrl, id) {
    try {
        const response = await fetch(`${baseUrl}/${id}`);
        if (!response) {
            throw new Error('Erro ao carregar o personagem');
        }
        return response.json();
    } catch (error) {
        console.error(error);
    }
}

async function loadAll() {
    const urlParam = new URLSearchParams(window.location.search);
    const idParam = urlParam.get('id');

    if (!idParam) {
        console.log('ID não encontrado na URL');
        return;
    }

    const URL = 'https://hp-api.onrender.com/api/character';

    const idDecrypted = decryptId(idParam);

    try {
        const character = await loadCharacter(URL, idDecrypted);
        console.log('Personagem: ', character);
        renderCharacter(character);
    } catch (error) {
        console.error(error);
    }
}

loadAll();

async function renderCharacter(character) {
    const img = document.querySelector('.img');
    const name = document.querySelector('.name');
    const alive = document.querySelector('.alive');
    const species = document.querySelector('.species');
    const gender = document.querySelector('.gender')
    const patronus = document.querySelector('.patronus');
    const house = document.querySelector('.house');
    const yearOfBirth = document.querySelector('.yearOfBirth');
    const ancestry = document.querySelector('.ancestry');
    const actor = document.querySelector('.actor');

    character.map((element) => {
        img.src = element.image;
        name.innerHTML = `Name: ${element.name}`;
        alive.innerHTML = element.alive === true ? 'Alive' : 'Dead';
        species.innerHTML = `Species: ${element.species}`;
        gender.innerHTML = `Gender: ${element.gender}`
        patronus.innerHTML = `Patronus: ${element.patronus === "" ? 'unknow' : element.patronus}`;
        house.innerHTML = `House: ${element.house}`;
        yearOfBirth.innerHTML = `Year Of Birth: ${element.yearOfBirth === null ? 'unknow' : element.yearOfBirth}`;
        ancestry.innerHTML = `Ancestry: ${element.ancestry}`;
        actor.innerHTML = `Actor: ${element.actor}`;
    })
    
}
