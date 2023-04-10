import { useEffect, useState } from 'react';
import generateRandomCardDeck from './generateRandomCardDeck';
import Card from './Card';

export default function Deck({ numberOfCards }) {

    const [deck, setDeck] = useState([])
    const [gameStatus, setGameStatus] = useState(true);
    const [gameComplete, setGameComplete] = useState(false);
    const [selectedCard, setSelectedCard] = useState();
    const [gameMessage, setGameMessage] = useState('Click...');

    useEffect(() => {
        setDeck(generateRandomCardDeck(numberOfCards));
    }, [setDeck, numberOfCards])

    function cardClicked(index) {
        if (deck[index]['clickable'] && gameStatus) {

            const tempDeck = [...deck];

            tempDeck[index]['visible'] = true;
            tempDeck[index]['clickable'] = false;

            if (!selectedCard) {
                setSelectedCard(tempDeck[index]);
                return;
            }

            if (selectedCard) {
                if (selectedCard.cardType === tempDeck[index]['cardType']) {
                    const stillToDiscover = tempDeck.filter((card) => !card.visible).length;
                    if (stillToDiscover === 0) {
                        setGameMessage(`You won! Good job!`);
                        setGameComplete(true);
                    } else {
                        setGameMessage(`Yay! ${stillToDiscover} cards to go!`);
                    }

                    tempDeck[index]['clickable'] = false;
                    tempDeck[selectedCard.index]['clickable'] = false;
                    setSelectedCard();
                }
                else {
                    setGameStatus(false);
                    setGameMessage('Now you wait...');

                    setSelectedCard();
                    const timer = setTimeout(() => {
                        clearTimeout(timer);
                        setGameStatus(true);
                        tempDeck[index]['visible'] = false;
                        tempDeck[selectedCard.index]['visible'] = false;
                        tempDeck[index]['clickable'] = true;
                        tempDeck[selectedCard.index]['clickable'] = true;
                        setGameMessage('You can click')
                    }, 1000);
                }
            }

            setDeck(tempDeck);
        }
    }

    function newDeck() {
        setDeck(generateRandomCardDeck(numberOfCards));
        setGameComplete(false);
    }

    return (
        <div className='deck'>
            <header>
                <h1 className='gameMessage'>{gameMessage}</h1>
                {gameComplete ? <button onClick={newDeck}>New Game</button> : null}
            </header>
            {deck.map((card) => <Card key={card.index} card={card} onClick={cardClicked} />)}
        </div>
    )
}
