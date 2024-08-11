import { useReducer } from "react";

const initialState = {
  scorePlayer1: 0,
  scorePlayer2: 0,
  currentPlayer: 0,
  currentScore: 0,
  dice: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "reset":
      return initialState;

    case "rollDice": {
      // Wrap the case in curly braces to create a block scope
      const newDice = Math.trunc(Math.random() * 6) + 1; // store the new dice value in a variable before updating state.
      return {
        ...state,
        dice: newDice,
        currentScore: state.currentScore + newDice,
      };
    }

    case "hold":
      return {
        ...state,
        scorePlayer1: state.scorePlayer1 + state.currentScore,
        currentScore: 0,
      };

    default:
      return state;
  }
}

function App() {
  // const [dice, setDice] = useState(0);
  // function RollDice() {
  //   setDice(Math.trunc(Math.random() * 6) + 1);
  // }

  const [
    { scorePlayer1, scorePlayer2, currentPlayer, currentScore, dice },
    dispatch,
  ] = useReducer(reducer, initialState);

  const reset = function () {
    dispatch({ type: "reset" });
  };

  const rollDice = function () {
    dispatch({ type: "rollDice" });
  };

  const hold = function () {
    dispatch({ type: "hold" });
  };

  return (
    <main>
      <section className="player">
        <h2 className="name">Player 1</h2>
        <p className="score">{scorePlayer1}</p>
        <div className="current">
          <p className="current-label">Current</p>
          <p className="current-score">{currentScore}</p>
        </div>
      </section>
      <section className="player">
        <h2 className="name">Player 2</h2>
        <p className="score">34</p>
        <div className="current">
          <p className="current-label">Current</p>
          <p className="current-score">0</p>
        </div>
      </section>

      <>
        {dice ? (
          <img
            src={`/images/dice-${dice}.png`}
            alt="Playing dice"
            className="dice"
          />
        ) : null}
        <button className="btn btn--new" onClick={reset}>
          🔄 New game
        </button>
        <button className="btn btn--roll" onClick={rollDice}>
          🎲 Roll dice
        </button>
        {dice ? (
          <button className="btn btn--hold" onClick={hold}>
            📥 Hold
          </button>
        ) : null}
      </>
    </main>
  );
}

export default App;
