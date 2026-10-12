const startGameButton = document.querySelector('#start-game');
const mobileGameShell = document.querySelector('#mobile-game-shell');
const mobileGameFrame = document.querySelector('#mobile-game-frame');
const exitMobileGameButton = document.querySelector('#exit-mobile-game');
const isMobile = window.matchMedia('(max-width: 760px)').matches;

function closeMobileGame() {
    mobileGameFrame.removeAttribute('src');
    mobileGameShell.hidden = true;
    document.body.classList.remove('mobile-game-open');

    if (document.fullscreenElement === mobileGameShell && document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
    }
}

function openMobileGame(event) {
    if (!isMobile) return;

    event.preventDefault();
    mobileGameShell.hidden = false;
    document.body.classList.add('mobile-game-open');
    mobileGameFrame.src = startGameButton.href;

    if (mobileGameShell.requestFullscreen) {
        mobileGameShell.requestFullscreen().catch(() => {});
    }
}

startGameButton.addEventListener('click', openMobileGame);
exitMobileGameButton.addEventListener('click', closeMobileGame);

document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement && !mobileGameShell.hidden) {
        closeMobileGame();
    }
});
