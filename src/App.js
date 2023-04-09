
import Deck from './Deck';

// provide an even number or it will be make one
const numberOfCards = 13;
const numberOfCardTypes = 4


export default function App() {
  return <Deck numberOfCards={numberOfCards} numberOfCardTypes={numberOfCardTypes} />;
}

