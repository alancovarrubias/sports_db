import React from 'react';
import { Row, Col } from 'react-bootstrap';

import { HEADERS, KEYS } from '../../const/seasons';
import Table from '../common/Table';

const Index = ({ sport, seasons, rowClick }) => (
  <Row>
    <Col lg={12}>
      <h1>{sport.toUpperCase()} Seasons</h1>
    </Col>
    <Col lg={12}>
      <Table headers={HEADERS} keys={KEYS} rows={seasons} rowClick={rowClick} />
    </Col>
  </Row>
);


export default Index;
