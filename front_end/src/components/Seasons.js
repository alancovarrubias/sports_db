import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Table from './common/Table'

const SeasonsComponent = ({ sport, seasons, headers, keys, rowClick }) => (
  <Row>
    <Col lg={12}>
      <h1>{sport.toUpperCase()} Seasons</h1>
    </Col>
    <Col lg={12}>
      <Table headers={headers} keys={keys} rows={seasons} rowClick={rowClick} />
    </Col>
  </Row>
)

export default SeasonsComponent
