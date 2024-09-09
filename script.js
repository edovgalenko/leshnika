const cardImages = [
    'img1.png', 'img2.png', 'img3.png', 'img4.png',
    'img5.png', 'img6.png', 'img7.png', 'img8.png',
    'img9.png', 'img10.png', 'img11.png', 'img12.png'
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchesFound = 0;
const unmatchedCardImage = 'img13.png'; // Одна непарная карта

window.onload = function() {
    const gameBoard = document.getElementById('game-board');
    const shuffledCards = createShuffledDeck();

    shuffledCards.forEach(image => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img class="back" src="img/back.png" alt="Card back">
            <img class="front" src="img/${image}" alt="Card front">
        `;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
};

function createShuffledDeck() {
    const fullDeck = [...cardImages, ...cardImages, unmatchedCardImage];
    return shuffle(fullDeck);
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.querySelector('.front').src === secondCard.querySelector('.front').src;

    if (isMatch) {
        disableCards();
        matchesFound += 1;
        if (matchesFound === 12) { // 12 пар найдены
            showLastCard();
        }
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function showLastCard() {
    const lastCard = document.querySelector(`.card:not(.flipped)`);
    lastCard.classList.add('last-card');
    lastCard.addEventListener('transitionend', showCongratsMessage);
}

function showCongratsMessage() {
    const congratsMessage = document.getElementById('congrats');
    congratsMessage.classList.remove('hidden');
}
