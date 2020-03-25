

let deck = [];

const typesOfCards = ['C', 'D', 'H', 'S'];
const especialCards = ['A', 'J', 'Q', 'K'];

let playerPoints = 0,
    computerPoints = 0;

// HTML
const btnGetCard = document.querySelector('#btnGetCard');
const btnNewGame = document.querySelector('#btnNewGame');
const btnStop = document.querySelector('#btnStop');
const playerPointsText = document.querySelectorAll('small')[0];
const computerPointsText = document.querySelectorAll('small')[1];
const jugador_cartas = document.querySelector('#jugador-cartas');
const computadora_cartas = document.querySelector('#computadora-cartas');

const createDeck = () => {
    for (let i = 2; i <= 10; i++)
    {
        for (let type of typesOfCards)
        {
            deck.push(i + type);
        }
    }

    for (const type of typesOfCards)
    {
        for (const esp of especialCards)
        {
            deck.push(esp + type);
        }
    }

    deck = _.shuffle(deck);
    console.log(deck);
};

createDeck();

const getCard = () => {

    if (!deck.length)
    {
        throw ('No hay cartas en el deck');
    }
    const card = deck.pop();
    return card;
};


const valueCard = (card) => {
    const value = card.substring(0, card.length - 1);

    if (isNaN(value))
    {
        return (value === 'A') ? 11 : 10;
    }
    return value * 1;
};

const turnComputer = (minimumPoints) => {

    do
    {
        const card = getCard();
        computerPoints = computerPoints + valueCard(card);
        computerPointsText.innerText = computerPoints;

        const imgCard = document.createElement('img');
        imgCard.classList.add('carta');
        imgCard.src = `assets/cartas/${card}.png`;
        computadora_cartas.append(imgCard);

        if (minimumPoints > 21)
        {
            break;
        }

    } while (computerPoints < minimumPoints);



};

btnGetCard.addEventListener('click', () => {
    const card = getCard();
    playerPoints = playerPoints + valueCard(card);
    playerPointsText.innerText = playerPoints;

    const imgCard = document.createElement('img');
    imgCard.classList.add('carta');
    imgCard.src = `assets/cartas/${card}.png`;

    jugador_cartas.append(imgCard);

    if (playerPoints > 21)
    {
        console.warn('Lo siento mucho, perdiste!!');
        btnGetCard.disabled = true;
        btnStop.disabled = true;
        turnComputer(playerPoints);
    } else if (playerPoints === 21)
    {
        console.warn('21, genial!!!');
        btnGetCard.disabled = true;
        btnStop.disabled = true;
        turnComputer(playerPoints);
    }
});

btnStop.addEventListener('click', () => {
    btnGetCard.disabled = true;
    btnStop.disabled = true;

    turnComputer(playerPoints);
});

btnNewGame.addEventListener('click', () => {
    console.clear();
    deck = [];
    createDeck();
    btnGetCard.disabled = false;
    btnStop.disabled = false;
    playerPoints = 0;
    computerPoints = 0;
    playerPointsText.innerText = 0;
    computerPointsText.innerText = 0;
    jugador_cartas.innerHTML = '';
    computadora_cartas.innerHTML = '';
});