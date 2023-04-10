
import Deck from './Deck';
import Error from './Error';

// provide an even number or it will be make one
const numberOfCards = 14;

export default function App() {
  return numberOfCards > 0 ? <Deck numberOfCards={numberOfCards} /> : <Error />;
}

