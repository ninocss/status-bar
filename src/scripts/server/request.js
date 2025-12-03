const SERVER_URL = 'canstein-berlin.de';
const API_URL = `https://api.mcsrvstat.us/3/${SERVER_URL}`;

const elements = {
    reloadBtn: document.querySelector('.reload-btn'),
    playersGrid: document.getElementById('players-grid'),
    playerCount: document.querySelector('.player-count')
};

function createPlayerEntry(player) {
    const playerName = player.name || player;
    const entry = document.createElement('div');
    entry.className = 'player-entry';
    
    entry.innerHTML = `
        <div class="player-head" style="background-image: url(https://mc-heads.net/avatar/${playerName}/16.webp)"></div>
        <div class="player-name">${playerName}</div>
        <button class="namemc-btn" title="NameMC Profile" data-player="${playerName}">
            <img src="https://canstein-berlin.de/wp-content/Server-Status/img/user-svgrepo-com.svg" alt="reload" width="16" height="16" style="display:block; filter: invert(85%) sepia(3%) saturate(4%) hue-rotate(347deg) brightness(106%) contrast(0.85); pointer-events:none;">
        </button>
    `;

    return entry;
}

function updatePlayerList(data) {
    const { players } = data;
    elements.playerCount.textContent = `${players?.online || 0}/${players?.max || 0}`;
    elements.playersGrid.innerHTML = '';

    if (players?.list?.length) {
        const fragment = document.createDocumentFragment();
        players.list.forEach(player => {
            fragment.appendChild(createPlayerEntry(player));
        });
        elements.playersGrid.appendChild(fragment);
    } else {
        elements.playersGrid.innerHTML = '<div class="player-entry">No players online</div>';
    }

    const serverInfo = document.querySelector('.server-info');
        
    if (data.icon) {
        let serverIcon = document.querySelector('.server-icon');
        serverInfo.insertBefore(serverIcon, serverInfo.firstChild);
    
        serverIcon.src = data.icon;
    }

    if (data.motd.clean) {
        let motdElement = document.querySelector('.server-motd');
        document.querySelector('.tab-list-header').appendChild(motdElement);
    
        motdElement.textContent = data.motd.clean.join(' ');
    }
    if (data.motd.clean) {
        let motdElement = document.querySelector('.server-motd');
        document.querySelector('.tab-list-header').appendChild(motdElement);
    
        const motdText = data.motd.clean.join(' ').replace(/canstein-berlin\.de/gi, '').trim();
        motdElement.textContent = motdText;
    }
    if (data.online) {
        let statusElement = document.querySelector('.server-status');
        statusElement.className = 'server-status online';
        statusElement.textContent = 'Online';
    } else {
        let statusElement = document.querySelector('.server-status');
        statusElement.className = 'server-status offline';
        statusElement.textContent = 'Offline';
    }
}

async function fetchPlayerData() {
    elements.playersGrid.innerHTML = '<div class="player-entry">Loading...</div>';
    
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log('Server data:', data);
        
        updatePlayerList(data);
    } catch (error) {
        console.error('Error fetching server data:', error);
        elements.playersGrid.innerHTML = '<div class="player-entry">Error loading data</div>';
    }
}

elements.playersGrid.addEventListener('click', (e) => {
    if (e.target.classList.contains('namemc-btn')) {
        const playerName = e.target.dataset.player;
        window.open(`https://namemc.com/profile/${playerName}`, '_blank');
    }
});

elements.reloadBtn.addEventListener('click', fetchPlayerData);

fetchPlayerData();

// Search functionality
(function(){
    const searchInput = document.getElementById('player-search');
    const clearBtn = document.getElementById('search-clear');

    function getPlayersGrid() {
    return document.getElementById('players-grid');
    }

    function escapeRegExp(s){ return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); }

    function filterPlayersList(){
    const playersGrid = getPlayersGrid();
    if (!playersGrid) return;

    const term = (searchInput.value || '').trim();
    const termLower = term.toLowerCase();
    const entries = Array.from(playersGrid.querySelectorAll('.player-entry'));
    let found = 0;

    const prevNoResults = playersGrid.querySelector('.no-results');
    if (prevNoResults) prevNoResults.remove();

    entries.forEach(entry => {
        const nameEl = entry.querySelector('.player-name');
        if (!nameEl) {
        entry.style.display = '';
        return;
        }

        if (!nameEl.dataset.orig) nameEl.dataset.orig = nameEl.textContent;
        const orig = nameEl.dataset.orig;
        const lower = orig.toLowerCase();

        if (!term || lower.includes(termLower)) {
        entry.style.display = '';
        if (term) {
            const re = new RegExp('(' + escapeRegExp(term) + ')', 'ig');
            nameEl.innerHTML = orig.replace(re, '<span style="background:rgba(255,210,77,0.16);padding:0 2px;border-radius:2px;">$1</span>');
        } else {
            nameEl.textContent = orig;
        }
        found++;
        } else {
        entry.style.display = 'none';
        }
    });

    if (found === 0) {
        const el = document.createElement('div');
        el.className = 'player-entry no-results';
        el.textContent = 'No matching players';
        playersGrid.appendChild(el);
    }
    }

    searchInput.addEventListener('input', filterPlayersList);
    clearBtn.addEventListener('click', () => { searchInput.value = ''; filterPlayersList(); searchInput.focus(); });

    (function patchUpdate(){
    if (typeof window.updatePlayerList === 'function') {
        const orig = window.updatePlayerList;
        window.updatePlayerList = function(data){
        orig(data);
        setTimeout(filterPlayersList, 10);
        };
    } else {
        const id = setInterval(() => {
        if (typeof window.updatePlayerList === 'function') {
            clearInterval(id);
            const orig = window.updatePlayerList;
            window.updatePlayerList = function(data){
            orig(data);
            setTimeout(filterPlayersList, 10);
            };
        }
        }, 50);
    }
    })();
})();