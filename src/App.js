
import Deck from './Deck';

// provide an even number or it will be make one
const numberOfCards = 6;

export default function App() {
  return <Deck numberOfCards={numberOfCards} />;
}

