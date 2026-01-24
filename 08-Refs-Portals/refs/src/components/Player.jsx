import { useState, useRef } from "react";

export default function Player() {
  const playerRef = useRef();
  const [enteredPlayerName, setEnteredPlayerName] = useState(null);

  function handleClick() {
    let inputValue = playerRef.current.value;
    if (!inputValue) {
      inputValue = null;
    }
    setEnteredPlayerName(inputValue);
  }
  console.log("log", enteredPlayerName ?? "unknown entity");
  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ?? "unknown entity"}</h2>
      <p>
        <input type="text" ref={playerRef} />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
