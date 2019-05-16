import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Table from '../common/Table';

const Index = ({ seasons, rowClick }) => {
  const headers = ["Year"];
  const keys = ["year"];
  return (
      <Row>
        <Col lg={12}>
          <h1>NBA Seasons</h1>
        </Col>
        <Col lg={12}>
          <Table headers={headers} keys={keys} rows={seasons} rowClick={rowClick} />
        </Col>
      </Row>
    );
}


export default Index;
