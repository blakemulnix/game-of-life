import "./Cell.css";

let aliveColor = "#77ff38";
let deadColor = "#3b3b3b";

function Cell(props) {
  let cellColor = props.alive ? aliveColor : deadColor;

  return (
    <div
      className="cell"
      style={{ backgroundColor: cellColor }}
      onClick={() => {
        props.toggleCell(props.coords.x, props.coords.y);
      }}
    />
  );
}

export default Cell;
