import { useState } from 'react';
import generateRandomCardDeck from './generateRandomCardDeck';
import Card from './Card';


export default function Deck({ numberOfCards, numberOfCardTypes }) {

    const [deck, setDeck] = useState(generateRandomCardDeck(numberOfCards, numberOfCardTypes))
    const [gameStatus, setGameStatus] = useState(true);
    const [selectedCard, setSelectedCard] = useState();
    const [gameMessage, setGameMessage] = useState('Click...');

    function cardClicked(index) {
        if (deck[index]['clickable'] && gameStatus) {

            console.log('clicked')

            const tempDeck = [...deck];

            tempDeck[index]['visible'] = true;
            tempDeck[index]['clickable'] = false;

            if (!selectedCard) {
                setSelectedCard(tempDeck[index]);
                return;
            }

            if (selectedCard) {
                if (selectedCard.cardType === tempDeck[index]['cardType']) {
                    setGameMessage('Yay!')
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


            // TODO: send message when deck is DONE
            const stillToDiscover = tempDeck.map((card) => !card.visible).length;
            console.log(`stillToDiscover: ${stillToDiscover} card`)


        }
    }

    if (!deck) return (
        <div className='deck'>
            <h1 className='gameMessage'>No cards, no fun</h1>
        </div>
    )

    return (
        <div className='deck'>
            <h1 className='gameMessage'>{gameMessage}</h1>
            {deck.map((card) => <Card key={card.index} card={card} onClick={cardClicked} />)}
        </div>
    )
}
