import React from "react";

function Dice(props) {
  const style = {
    backgroundColor: props.color ? "#59E391" : "#ffffff",
  };

  return (
    <h2 onClick={props.holdDice} className="dice" style={style}>
      {props.value}
    </h2>
  );
}

export default Dice;
