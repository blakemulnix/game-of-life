import "./Header.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Header() {
  return (
    <Container className="header">
      <Row className="justify-content-center">
        <Col xs="auto">
          <h1>Conway's Game of Life</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs="auto">
          <a href="https://github.com/blakemulnix">
            <h5>github.com/blakemulnix</h5>
          </a>
        </Col>
      </Row>
    </Container>
  );
}

export default Header;
