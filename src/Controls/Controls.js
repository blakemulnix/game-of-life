import "./Controls.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function Controls(props) {
  const [dimension, setDimension] = useState(props.dimension);
  const [gameInterval, setGameInterval] = useState(props.gameInterval);
  const [density, setDensity] = useState(props.density);

  return (
    <div className="controls-container">
      <Row className="justify-content-center p-2">
        <Col className="mb-2" xs="auto">
          <ButtonGroup aria-label="Basic example">
            <Button
              variant="secondary"
              disabled={props.gamePlaying}
              onClick={() => {
                props.setGamePlaying(true);
              }}
            >
              Play
            </Button>
            <Button
              variant="secondary"
              disabled={!props.gamePlaying}
              onClick={() => {
                props.setGamePlaying(false);
              }}
            >
              Pause
            </Button>
            <Button
              variant="secondary"
              disabled={props.gamePlaying}
              onClick={() => {
                props.stepForward();
              }}
            >
              Step Forward
            </Button>
          </ButtonGroup>
        </Col>
        <Col className="mb-2" xs="auto">
          <Button
            variant="secondary"
            onClick={() => {
              props.clearBoard(dimension, density);
            }}
          >
            Clear
          </Button>
        </Col>
        <Col className="mb-2" xs="auto">
          <Button
            variant="secondary"
            onClick={() => {
              props.randomizeBoard(dimension, density);
            }}
          >
            Randomize
          </Button>
        </Col>
        <Col className="mb-2" xs="auto">
          <InputGroup>
            <Button
              variant="secondary"
              onClick={() =>
                setMinMax(dimension, 1, 100, props.setDimension, setDimension)
              }
            >
              Set Dimensions
            </Button>
            <FormControl
              htmlSize="3"
              value={dimension}
              onChange={(e) => setDimension(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col className="mb-2" xs="auto">
          <InputGroup>
            <Button
              variant="secondary"
              onClick={() =>
                setMinMax(
                  gameInterval,
                  1,
                  1000,
                  props.setGameInterval,
                  setGameInterval
                )
              }
            >
              Set Interval (in ms)
            </Button>
            <FormControl
              htmlSize="3"
              value={gameInterval}
              onChange={(e) => {
                setGameInterval(e.target.value);
              }}
            />
          </InputGroup>
        </Col>
        <Col className="mb-2" xs="auto">
          <InputGroup>
            <Button
              variant="secondary"
              onClick={() =>
                setMinMax(density, 0.01, 1, props.setDensity, setDensity)
              }
            >
              Set Life Density
            </Button>
            <FormControl
              htmlSize="3"
              value={density}
              onChange={(e) => setDensity(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>
    </div>
  );
}

function setMinMax(value, min, max, sf1, sf2) {
  if (value > max) {
    sf1(max);
    sf2(max);
  } else if (value < min) {
    sf1(min);
    sf2(min);
  } else {
    sf1(value);
    sf2(value);
  }
}

export default Controls;
