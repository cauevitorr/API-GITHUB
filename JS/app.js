const urlBase02 = "https://api.github.com/users/cauevitorr"

const loadMe = async () => {
    const res = await fetch(urlBase02);
    const data = await res.json();
    return {results: data}
};

const loadMyPromisse = async () => {
    const eu = await Promise.all(loadMe());
    console.log('Me: ', eu.results);
    showMe(eu.results);
    // return
};

loadMe()

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
            followerDetails(follower.id);
        });
    });
}

function followerDetails(id) {
    console.log(id);
    const idEncrypted = encryptId(id);
    console.log(idEncrypted);
    window.location.href = `follower.html?id=${idEncrypted}`;
}

function encryptId(id) {
    return id;
}
