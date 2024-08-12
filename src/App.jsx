import { useReducer } from "react";

const initialState = {
  scorePlayer1: 0,
  scorePlayer2: 0,
  isActivePlayer1: true,
  currentScorePlayer1: 0,
  currentScorePlayer2: 0,
  dice: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "reset":
      return initialState;

    case "rollDice": {
      // Wrap the case in curly braces to create a block scope

      // store the new dice value in a variable before updating state.
      const newDice = Math.trunc(Math.random() * 6) + 1;

      // check active player
      const currentScore = state.isActivePlayer1
        ? "currentScorePlayer1"
        : "currentScorePlayer2";

      if (newDice !== 1) {
        // if rolled not 1,  and add dice to currentScorePlayerX
        return {
          ...state,
          dice: newDice,
          [currentScore]: state[currentScore] + newDice,
        };
      } else {
        // Switch player when rolled 1
        return {
          ...state,
          dice: newDice,
          isActivePlayer1: !state.isActivePlayer1,
          [currentScore]: 0,
        };
      }
    }

    case "hold": {
      const PlayerScore = state.isActivePlayer1
        ? "scorePlayer1"
        : "scorePlayer2";

      const currentScore = state.isActivePlayer1
        ? "currentScorePlayer1"
        : "currentScorePlayer2";

      return {
        ...state,
        [PlayerScore]: state[PlayerScore] + state[currentScore],
        [currentScore]: 0,
        isActivePlayer1: !state.isActivePlayer1,
      };
    }

    default:
      return state;
  }
}

function App() {
  const [
    {
      scorePlayer1,
      scorePlayer2,
      isActivePlayer1,
      currentScorePlayer1,
      currentScorePlayer2,
      dice,
    },
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
      <section className={`player ${isActivePlayer1 ? "player--active" : ""}`}>
        <h2 className="name">Player 1</h2>
        <p className="score">{scorePlayer1}</p>
        <div className="current">
          <p className="current-label">Current</p>
          <p className="current-score">{currentScorePlayer1}</p>
        </div>
      </section>
      <section className={`player ${!isActivePlayer1 ? "player--active" : ""}`}>
        <h2 className="name">Player 2</h2>
        <p className="score">{scorePlayer2}</p>
        <div className="current">
          <p className="current-label">Current</p>
          <p className="current-score">{currentScorePlayer2}</p>
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
