const urlBase = "https://api.github.com/users/cauevitorr/followers";

const loadfollowers = async () => {
    const res = await fetch(urlBase);
    const data = await res.json();
     const limitData = data.slice(0, 18);
     return { results: limitData };
};

const loadAllWithPromiseAll = async () => {
    const [followers] = await Promise.all([loadfollowers()]);
    console.log('Followers: ', followers.results);
    showCharacter(followers.results);
};

loadAllWithPromiseAll();

function showCharacter(followers) {
    const followersContainer = document.getElementById('followers-container');
    followers.forEach((follower) => {
        const divFollow = document.createElement('div');
        divFollow.id = `Follow-${follower.id}`;
        divFollow.innerHTML = `
            <img src="${follower.avatar_url}" alt="Imagem do personagem">
            <article class="character-info">
                <h2>${follower.login}</h2>
            </article>
        `;
        divFollow.classList.add('character-box');
        followersContainer.appendChild(divFollow);
        divFollow.addEventListener('click', () => {
            characterDetails(follower.id);
        });
    });
}

function characterDetails(id) {
    console.log(id);
    const idEncrypted = encryptId(id);
    console.log(idEncrypted);
    window.location.href = `follower.html?id=${idEncrypted}`;
}

function encryptId(id) {
    return id;
}

//                 <span class="${character.alive}">${character.alive === true ? 'Alive' : 'Dead'}</span>
//<span class="${character.species}">Specie - ${character.species}</span>
//<span class="${character.gender}">Gender - ${character.gender}</span>
//<span class="${character.patronus}">Patronus - ${character.patronus === "" ? 'unknow' : character.patronus}</span>
//<span class="${character.house}">House - ${character.house === "" ? 'unknow' : character.house}</span>
//<span class="${character.yearOfBirth}">Year Of Birth - ${character.yearOfBirth === null ? 'unknow' : character.yearOfBirth}</span>
//<span class="${character.ancestry}">Ancestry - ${character.ancestry}</span>
//<span class="${character.actor}">Actor - ${character.actor}</span>