import { useState, useRef } from "react";

export default function Player() {
  const playerName = useRef();
  const [enteredPlayerName, setEnteredPlayerName] = useState(null);

  function handleClick() {
    let inputValue = playerName.current.value;
    if (!inputValue) {
      inputValue = null;
    }
    setEnteredPlayerName(inputValue);
    playerName.current.value = "";
  }
  console.log("log", enteredPlayerName ?? "unknown entity");
  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ?? "unknown entity"}</h2>
      <p>
        <input type="text" ref={playerName} />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
