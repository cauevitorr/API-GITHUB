const urlBase02 = "https://api.github.com/users/cauevitorr";

const loadMe = async () => {
    try {
        const res = await fetch(urlBase02);
        if (!res.ok) {
            throw new Error(`Erro na requisição: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Erro ao carregar dados:", error);
        return null;
    }
};

const loadMyPromise = async () => {
    const divEu = document.getElementById('eu-container')

    const eu = await loadMe();
    if (eu) {
        console.log("Id: ", eu.id)
        console.log("Avatar URL:", eu.avatar_url);
        console.log("Nome:", eu.name);
        console.log("Empresa:", eu.company);
        console.log("Localização:", eu.location);
        console.log("Bio:", eu.bio);
    }
            const divFollow = document.createElement('div');
        divFollow.id = `Eu-${eu.id}`;
        divFollow.innerHTML = `
            <img class="imagemDoCaue" src="${eu.avatar_url}" alt="Imagem do Cauê">
            <article class="eu-info">
                <h1>${eu.name}</h1>
                <h2 class="bio">${eu.bio}</h2>
            </article>
        `;
        divFollow.classList.add('eu-box');
        divEu.appendChild(divFollow);
};

loadMyPromise();


//!----------------------------------------------------------------------------!//

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
            <article class="follower-info">
                <h2>${follower.login}</h2>
            </article>
        `;
        divFollow.classList.add('follower-box');
        followersContainer.appendChild(divFollow);
        divFollow.addEventListener('click', () => {
            followerDetails(follower.login);
        });
    });
}

function followerDetails(login){
    window.location.href = `https://api.github.com/users/${login}`
}
