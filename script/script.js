const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card"
const ICON = "icon"





startGame();

function startGame() {

    initializeCards(game.createCardsFromTechs());
}

function initializeCards(cards) {
    let gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML='';

    game.cards.forEach(card => {
        let cardElement = document.createElement('div')
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    })

}

function createCardContent(card, cardElement) {

    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);

}

function createCardFace(face, card, element) {

    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);
    if (face === FRONT) {
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "https://img.icons8.com/plasticine/80/000000/" + card.icon + ".png";
        cardElementFace.appendChild(iconElement);

    } else {
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = src = "https://img.icons8.com/pastel-glyph/80/000000/clapperboard--v2.png";
        cardElementFace.appendChild(iconElement);
    }
    element.appendChild(cardElementFace);
}


function flipCard() {

   
    if (game.setCard(this.id)) {
            this.classList.add("flip");
        if (game.secondCard) {
            if (game.checkMatch()) {
                game.clearCards();
                if(game.checkGameOver()){
                    let gameOverLayer = document.getElementById("gameOver");
                    gameOverLayer.style.display="flex";
                }
            } else {
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secondCardView = document.getElementById(game.secondCard.id);             
                    firstCardView.classList.remove('flip');
                    secondCardView.classList.remove('flip');
                    game.unflipCards();
                }, game.dificuldade);
            };

        }
    }
}

function restart(){
    game.clearCards();
    startGame();
    let gameOverLayer = document.getElementById("gameOver");
     gameOverLayer.style.display="none";

}

function difNormal(){
    let botaoNormal = document.getElementById("normal");
    let botaoHard = document.getElementById("hard");

    botaoHard.style.background ='white';
    botaoNormal.style.background='linear-gradient(white,white,green)';

   return game.dificuldade=1000;

}

function difHard(){
    let botaoNormal = document.getElementById("normal");
    let botaoHard = document.getElementById("hard");

    botaoNormal.style.background ='white' ;
    botaoHard.style.background='linear-gradient(white,white,green)';
    return game.dificuldade=400;
}