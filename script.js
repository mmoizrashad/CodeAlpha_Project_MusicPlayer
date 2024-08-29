const audioPlayers = [
    document.getElementById('audioPlayer'),
    document.getElementById('audioPlayer2'),
    document.getElementById('audioPlayer3')
];
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const trackName = document.getElementById('trackName');
const trackArtist = document.getElementById('trackArtist');
const musicPlayerContainer = document.querySelector('.music-player-container');
const showPlayerBtn = document.getElementById('showPlayerBtn');

let currentIndex = 0;
let isPlaying = false;

function updateTrackInfo() {
    switch (currentIndex) {
        case 0:
            trackName.innerHTML = '<span class="track-text">O Mahi O Mahi <i class="fas fa-music"></i></span><br>';
            trackArtist.innerHTML = '<span class="artist-text">Arjit Singh <i class="fas fa-user"></span></i>';
            break;
        case 1:
            trackName.innerHTML = '<span class="track-text">Man Jogia <i class="fas fa-music"></i></span><br>';
            trackArtist.innerHTML = '<span class="artist-text">Arjit Singh <i class="fas fa-user"></span></i>';
            break;
        case 2:
            trackName.innerHTML = '<span class="track-text">Dekha Tanu Phli Bar <i class="fas fa-music"></i></span><br>'; // Update as needed
            trackArtist.innerHTML = '<span class="artist-text">M Faiz <i class="fas fa-user"></span></i>'; // Update as needed
            break;
    }
}


function playTrack(index) {
    audioPlayers.forEach((player, i) => {
        if (i === index) {
            player.play();
        } else {
            player.pause();
        }
    });
    updateTrackInfo();
}

playPauseBtn.addEventListener('click', () => {
    const currentPlayer = audioPlayers[currentIndex];
    if (isPlaying) {
        currentPlayer.pause();
        playPauseBtn.textContent = '▶️';
    } else {
        currentPlayer.play();
        playPauseBtn.textContent = '⏸️';
    }
    isPlaying = !isPlaying;
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + audioPlayers.length) % audioPlayers.length;
    playTrack(currentIndex);
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % audioPlayers.length;
    playTrack(currentIndex);
});

audioPlayers.forEach(player => {
    player.addEventListener('timeupdate', () => {
        const value = (player.currentTime / player.duration) * 100;
        progressBar.value = value;
    });
});

progressBar.addEventListener('input', () => {
    const currentPlayer = audioPlayers[currentIndex];
    const value = progressBar.value;
    currentPlayer.currentTime = (value / 100) * currentPlayer.duration;
});

showPlayerBtn.addEventListener('click', () => {
    if (musicPlayerContainer.classList.contains('hidden')) {
        musicPlayerContainer.classList.remove('hidden');
        showPlayerBtn.textContent = 'Hide Player';
    } else {
        musicPlayerContainer.classList.add('hidden');
        showPlayerBtn.textContent = 'Play Music';
    }
});
