import { useState } from "react";

export default function UserInput() {
  const [userIntput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1201,
    expectedReturn: 6,
    duration: 10,
  });

  function handleUserInput(inputElement, event) {
    setUserInput((prevState) => ({
      ...prevState,
      [inputElement]: event.target.value,
    }));
  }
  return (
    <section id="user-input">
      <div className="input-group">
        <p>
          <label htmlFor="initial-investment">Initial investment</label>
          <input
            type="number"
            value={userIntput.initialInvestment}
            required
            id="initial-investment"
            onChange={(event) => handleUserInput("initialInvestment", event)}
          />
        </p>
        <p>
          <label htmlFor="annual-investment">Annual investment</label>
          <input
            type="number"
            value={userIntput.annualInvestment}
            required
            id="annual-investment"
            onChange={(event) => handleUserInput("annualInvestment", event)}
          />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label htmlFor="expected-return">Expected Return</label>
          <input
            type="number"
            value={userIntput.expectedReturn}
            required
            id="expected-return"
            onChange={(event) => handleUserInput("expectedReturn", event)}
          />
        </p>
        <p>
          <label htmlFor="duration">Duration</label>
          <input
            type="number"
            value={userIntput.duration}
            required
            id="duration"
            onChange={(event) => handleUserInput("duration", event)}
          />
        </p>
      </div>
    </section>
  );
}
