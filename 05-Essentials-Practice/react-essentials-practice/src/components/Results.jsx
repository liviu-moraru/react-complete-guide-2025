import { calculateInvestmentResults, formatter } from "../util/investment.js";

export default function Results({ input }) {
  //console.log(input);
  const result = calculateInvestmentResults(input);
  console.log(result);
  let totalInterest = 0;
  let investedCapital = input.initialInvestment;

  return (
    <table id="result">
      <thead>
        <tr>
          <th>Year</th>
          <th>Investment Value</th>
          <th>Interest (Year)</th>
          <th>Total interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {result.map((yearData, index) => {
          totalInterest += yearData.interest;
          investedCapital += input.annualInvestment;
          return (
            <tr key={yearData.year}>
              <td>{formatter.format(yearData.year)}</td>
              <td>{formatter.format(yearData.valueEndOfYear)}</td>
              <td>{formatter.format(yearData.interest)}</td>
              <td>{formatter.format(totalInterest)}</td>
              <td>{formatter.format(investedCapital)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
