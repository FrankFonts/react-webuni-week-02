import CARD_BACK from './cards/card-back-1.png';
import CARD_HEARTS_1 from './cards/card-hearts-1.png';
import CARD_CLUBS_1 from './cards/card-clubs-1.png';
import CARD_DIAMONDS_1 from './cards/card-diamonds-1.png';
import CARD_SPADES_1 from './cards/card-spades-1.png';


export default function Card({ card, onClick }) {
    let cardImage;

    switch (card.cardType) {
        case 0:
            cardImage = CARD_HEARTS_1;
            break;
        case 1:
            cardImage = CARD_CLUBS_1;
            break;
        case 2:
            cardImage = CARD_DIAMONDS_1;
            break;
        default:
            cardImage = CARD_SPADES_1;
    }

    return (
        <div className='card' onClick={() => onClick(card.index)}>
            <img src={card.visible ? cardImage : CARD_BACK} alt='A card' />
            {card.cardType}
        </div>)
}
