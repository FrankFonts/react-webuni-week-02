export default function generateRandomCardDeck(numberOfCards, NUMBER_OF_CARD_TYPES) {

    if (numberOfCards <= 0) return; //die early

    // TODO: add more card type diversity

    // Playing with an odd number of cards is just silly so make sure it won't happen
    numberOfCards = (numberOfCards % 2 !== 0) ? ++numberOfCards : numberOfCards;

    let deck = [];

    const generateOneCard = () => {
        return {
            cardType: Math.round(Math.random() * (NUMBER_OF_CARD_TYPES - 1)),
            clickable: true,
            visible: false
        }
    }

    for (let i = 0; i < numberOfCards / 2; i++) {
        deck.push(generateOneCard());
    }

    // duplicate so there are pairs
    deck = [...deck, ...deck];

    // scramble deck
    let deckSize = numberOfCards;

    while (deckSize > 0) {
        const randomIndex = Math.round(Math.random() * (deckSize - 1));
        const card = deck.splice(randomIndex, 1)[0];
        deck.push(card);

        deckSize--;
    }

    // add index 
    deck = deck.map((card, i) => {
        return {
            ...card, index: i
        }
    });

    return deck;
}