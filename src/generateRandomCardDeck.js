export default function generateRandomCardDeck(numberOfCards) {

    // Playing with an odd number of cards is just silly so make sure it won't happen
    numberOfCards = (numberOfCards % 2 !== 0) ? ++numberOfCards : numberOfCards;

    const cardTypes = [0, 1, 2, 3];
    const numberOfCardTypes = cardTypes.length;
    let cardPairs = numberOfCards / 2;
    let deck = [];

    if (cardPairs < numberOfCardTypes) {
        for (let i = cardPairs; i > 0; i--) {
            const randomIndex = Math.round(Math.random() * (cardTypes.length - 1));
            const card = cardTypes.splice(randomIndex, 1);
            deck.push(...card);
        }
    }

    if (cardPairs === numberOfCardTypes) {
        deck = [...cardTypes];
    }

    if (cardPairs > numberOfCardTypes) {

        let modulo = Math.floor(cardPairs / numberOfCardTypes);
        let remainder = cardPairs % numberOfCardTypes;

        for (let i = modulo; i > 0; i--) {
            deck.push(...cardTypes);
        };

        for (let i = remainder; i > 0; i--) {
            const randomIndex = Math.round(Math.random() * (cardTypes.length - 1));
            const card = cardTypes.splice(randomIndex, 1);
            deck.push(...card);
        }
    }

    // create pairs
    deck = [...deck, ...deck];

    // scramble deck
    let deckSize = numberOfCards;

    for (let i = numberOfCards; deckSize > 0; deckSize--) {
        const randomIndex = Math.round(Math.random() * (i - 1));
        const card = deck.splice(randomIndex, 1)[0];
        deck.push(card);
    }

    // fill up cards
    deck = deck.map((card, i) => {
        return {
            cardType: card,
            clickable: true,
            visible: false,
            index: i
        }
    });

    return deck;
}