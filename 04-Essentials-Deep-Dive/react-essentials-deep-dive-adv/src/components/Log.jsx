export default function Log({ turns }) {
  let content = <li>No turns yet</li>;
  if (turns.length > 0) {
    content = turns.map((turn, index) => (
      <li key={`${turn.square.row}${turn.square.col}`}>
        {turn.player} selected {turn.square.row}, {turn.square.col}
      </li>
    ));
  }
  return <ol id="log">{content}</ol>;
}
