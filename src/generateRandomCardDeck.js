export default function generateRandomCardDeck(numberOfCards) {

    if (numberOfCards <= 0) return; //die early

    // Playing with an odd number of cards is just silly so make sure it won't happen
    numberOfCards = (numberOfCards % 2 !== 0) ? ++numberOfCards : numberOfCards;

    const cardTypes = [0, 1, 2, 3];
    const numberOfCardTypes = cardTypes.length;
    let cardPairs = numberOfCards / 2;
    let testDeck = [];

    if (cardPairs < numberOfCardTypes) {
        let c = cardPairs;

        while (c > 0) {
            const randomIndex = Math.round(Math.random() * (cardTypes.length - 1));
            const card = cardTypes.splice(randomIndex, 1);
            testDeck.push(...card);
            c--;
        }
        testDeck = [...testDeck, ...testDeck];
    }

    if (cardPairs === numberOfCardTypes) {
        testDeck = [...cardTypes, ...cardTypes];
    }

    if (cardPairs > numberOfCardTypes) {

        let remainder = numberOfCards % numberOfCardTypes;
        let modulo = Math.floor(numberOfCards / numberOfCardTypes);

        console.log(`modulo is ${modulo}`)
        console.log(`remainder is ${remainder}`)

        for (let i = modulo; i > 0; i--) {
            testDeck.push(...cardTypes);
        };

        testDeck.push(...cardTypes.splice(0, remainder));
    }

    // fill up cards
    testDeck = testDeck.map((card, i) => {
        return {
            cardType: card,
            clickable: true,
            visible: false,
            index: i
        }
    });

    // scramble deck
    let deckSize = numberOfCards;

    while (deckSize > 0) {
        const randomIndex = Math.round(Math.random() * (deckSize - 1));
        const card = testDeck.splice(randomIndex, 1)[0];
        testDeck.push(card);

        deckSize--;
    }

    // add index to cards
    testDeck = testDeck.map((card, i) => {
        return {
            ...card, index: i
        }
    });


    return testDeck;














    // let deck = [];

    // const generateOneCard = () => {
    //     return {
    //         cardType: Math.round(Math.random() * (NUMBER_OF_CARD_TYPES - 1)),
    //         clickable: true,
    //         visible: false
    //     }
    // }

    // for (let i = 0; i < numberOfCards / 2; i++) {
    //     deck.push(generateOneCard());
    // }

    // // duplicate so there are pairs
    // deck = [...deck, ...deck];

    // // scramble deck
    // let deckSize = numberOfCards;

    // while (deckSize > 0) {
    //     const randomIndex = Math.round(Math.random() * (deckSize - 1));
    //     const card = deck.splice(randomIndex, 1)[0];
    //     deck.push(card);

    //     deckSize--;
    // }

    // // add index 
    // deck = deck.map((card, i) => {
    //     return {
    //         ...card, index: i
    //     }
    // });

    // return deck;
}