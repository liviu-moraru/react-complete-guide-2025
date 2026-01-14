import { calculateInvestmentResults } from "../util/investment.js";

export default function Results({ input }) {
  console.log(input);
  const result = calculateInvestmentResults(input);
  console.log(result);
  return <p>Results...</p>;
}
