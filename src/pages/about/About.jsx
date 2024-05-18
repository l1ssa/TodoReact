import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const About = () => {
  return (
    <Container>
      <h1 className="mt-4">Об авторе</h1>
      <Row className="mt-4">
        <Col md={4}>
          <img
            src="cat.jpg"
            alt="Фото автора"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </Col>
        <Col md={8}>
          <div>
            <p>В маленьком уголке большого города обитал котик по имени Коди. Он был необычным котиком — программистом! Каждый день он сидел за компьютером, писал строки кода своими ловкими лапками. Его любимым языком программирования был "MeowScript", который он сам разработал.</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
