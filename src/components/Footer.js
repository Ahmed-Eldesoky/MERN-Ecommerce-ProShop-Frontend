import { Container, Row, Col } from "react-bootstrap";
import React from "react";

const Footer = () => {
  const myEmail = 'ahmedeldesoky026@gmail.com'
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center m-0 pt-2">Copyright &copy; ProShop </Col>
        </Row>
        <Row>
          <Col className="text-center m-0 pb-2 "> <a href={`mailto:${myEmail}`}>Ahmed El-desoky </a></Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
