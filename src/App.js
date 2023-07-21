import React from "react";
import Dice from "./dice";
import Confetti from "react-confetti";

import { nanoid } from "nanoid";

function App() {
  const [isnum, setIsNum] = React.useState(newNum());

  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = isnum.every((num) => num.isHeld);
    const referValue = isnum[0].value;
    const sameValue = isnum.every((num) => num.value === referValue);

    if (allHeld && sameValue) {
      setTenzies(true);
      console.log("You won");
    }
  }, [isnum]);

  function generatenewDie(params) {
    const random = Math.ceil(Math.random() * 6);

    return { value: random, isHeld: false, id: nanoid() };
  }

  function newNum() {
    const num = [];
    for (let i = 0; i < 10; i++) {
      num.push(generatenewDie());
    }
    return num;
  }

  function holdDice(id) {
    return setIsNum((prevState) =>
      prevState.map((val) => {
        return id === val.id ? { ...val, isHeld: !val.isHeld } : val;
      })
    );
  }

  function rollDice(params) {
    if (!tenzies) {
      setIsNum((prevState) =>
        prevState.map((state) => {
          return state.isHeld ? state : generatenewDie();
        })
      );
    } else {
      setTenzies(false);
      setIsNum(newNum());
    }
  }

  const randomValue = isnum.map((value) => {
    return (
      <Dice
        value={value.value}
        key={value.id}
        color={value.isHeld}
        id={value.id}
        holdDice={() => holdDice(value.id)}
      />
    );
  });
  return (
    <main className="main containner">
      {tenzies && <Confetti />}
      <div className="main-div">
        <h1 className="header">Tenzies</h1>
        <p className="instruction">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-div">{randomValue}</div>

        <button className="btn-roll" onClick={rollDice}>
          {" "}
          {tenzies ? "New Game" : "Roll"}
        </button>
      </div>
    </main>
  );
}

export default App;
