import Header from "./components/Header.jsx";
import UserInput from "./components/UserInput.jsx";
import { useState } from "react";
import Results from "./components/Results.jsx";

function App() {
  const [userIntput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1201,
    expectedReturn: 6,
    duration: 10,
  });

  function handleUserInputChange(inputElement, event) {
    setUserInput((prevState) => ({
      ...prevState,
      [inputElement]: parseInt(event.target.value), // sai +event.target.value
    }));
  }

  return (
    <>
      <Header />
      <UserInput
        userInput={userIntput}
        onUserInputChange={handleUserInputChange}
      />
      <Results input={userIntput} />
    </>
  );
}

export default App;
