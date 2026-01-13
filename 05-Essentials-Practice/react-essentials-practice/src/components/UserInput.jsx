export default function UserInput({ userInput, onUserInputChange }) {
  return (
    <section id="user-input">
      <div className="input-group">
        <p>
          <label htmlFor="initial-investment">Initial investment</label>
          <input
            type="number"
            value={userInput.initialInvestment}
            required
            id="initial-investment"
            onChange={(event) => onUserInputChange("initialInvestment", event)}
          />
        </p>
        <p>
          <label htmlFor="annual-investment">Annual investment</label>
          <input
            type="number"
            value={userInput.annualInvestment}
            required
            id="annual-investment"
            onChange={(event) => onUserInputChange("annualInvestment", event)}
          />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label htmlFor="expected-return">Expected Return</label>
          <input
            type="number"
            value={userInput.expectedReturn}
            required
            id="expected-return"
            onChange={(event) => onUserInputChange("expectedReturn", event)}
          />
        </p>
        <p>
          <label htmlFor="duration">Duration</label>
          <input
            type="number"
            value={userInput.duration}
            required
            id="duration"
            onChange={(event) => onUserInputChange("duration", event)}
          />
        </p>
      </div>
    </section>
  );
}
