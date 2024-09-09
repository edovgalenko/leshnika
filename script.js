const cardImages = [
    'img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg',
    'img5.jpg', 'img6.jpg', 'img7.jpg', 'img8.jpg',
    'img9.jpg', 'img10.jpg', 'img11.jpg', 'img12.jpg'
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchesFound = 0;
const unmatchedCardImage = 'img13.jpg';

window.onload = function() {
    const gameBoard = document.getElementById('game-board');
    const shuffledCards = createShuffledDeck();

    shuffledCards.forEach(image => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img class="back" src="img/back.jpg" alt="Card back">
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
        if (matchesFound === 12) {
            showFinalCard();
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

function showFinalCard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.classList.add('hidden-grid');

    const finalCardContainer = document.getElementById('final-card-container');
    finalCardContainer.classList.remove('hidden');

    const finalCard = document.getElementById('final-card');
    setTimeout(() => {
        finalCard.classList.remove('hidden-initial');
        setTimeout(() => {
            finalCard.classList.add('flipped');
        }, 500);
    }, 100);

    setTimeout(() => {
        gameBoard.innerHTML = '';
    }, 500);

    finalCard.addEventListener('transitionend', () => {
        const congratsText = document.getElementById('congrats-text');
        congratsText.classList.remove('hidden');
    });
}
