
// Patrón módulo
// Funcion autoinvocada

miModulo = (() => {
    'use strict';

    let deck = [];

    const typesOfCards = ['C', 'D', 'H', 'S'];
    const especialCards = ['A', 'J', 'Q', 'K'];

    let pointsPlayers = [];

    // HTML
    const btnNewGame = document.querySelector('#btnNewGame');
    const btnsGame = document.querySelectorAll('.btnGame');
    const pointsHTML = document.querySelectorAll('small'),
        divsCard = document.querySelectorAll('.divCard');


    const createDeck = () => {
        deck = [];
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

        return _.shuffle(deck);
    };

    const getCard = () => {

        if (!deck.length)
        {
            throw ('No hay cartas en el deck');
        }
        return deck.pop();
    };


    const valueCard = (card) => {
        const value = card.substring(0, card.length - 1);

        if (isNaN(value))
        {
            return (value === 'A') ? 11 : 10;
        }
        return value * 1;
    };

    //turno 0 primer jugador; ultimo la computadora
    const acumulatePoints = (card, turno) => {
        pointsPlayers[turno] = pointsPlayers[turno] + valueCard(card);
        pointsHTML[turno].innerText = pointsPlayers[turno];
        return pointsPlayers[turno];
    };

    const createCard = (card, turn) => {
        const imgCard = document.createElement('img');
        imgCard.classList.add('carta');
        imgCard.src = `assets/cartas/${card}.png`;
        divsCard[turn].append(imgCard);
    };

    const turnComputer = (minimumPoints) => {
        let computerPoints = 0;
        do
        {
            const card = getCard();
            let player = pointsPlayers.length - 1;
            computerPoints = acumulatePoints(card, player);

            createCard(card, player);
            if (minimumPoints > 21)
            {
                break;
            }

        } while (computerPoints < minimumPoints);

    };

    const initializeGame = (numPlayers = 2) => {
        deck = createDeck();

        pointsPlayers = [];
        for (let i = 0; i < numPlayers; i++)
        {
            pointsPlayers.push(0);
        }

        btnsGame.forEach(btn => btn.disabled = false);
        pointsHTML.forEach(elem => elem.innerText = 0);
        divsCard.forEach(div => div.innerHTML = '');
    };

    btnGetCard.addEventListener('click', () => {
        const card = getCard();
        let playerPoints = acumulatePoints(card, 0);

        createCard(card, 0);

        if (playerPoints >= 21)
        {
            const message = (playerPoints === 21) ? '21, genial!!!' : 'Lo siento mucho, perdiste!!';
            console.warn(message);
            btnsGame.forEach(btn => btn.disabled = true);
            turnComputer(playerPoints);
        }
    });

    btnStop.addEventListener('click', () => {

        btnsGame.forEach(btn => btn.disabled = true);
        turnComputer(pointsPlayers[0]);
    });

    btnNewGame.addEventListener('click', () => {
        console.clear();
        initializeGame();

    });


    return {
        nuevoJuego: initializeGame
    };

})();