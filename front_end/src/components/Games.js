import React from 'react'
import { Row, Col } from 'react-bootstrap'

import './Games.css'
import Table from './common/Table'
import Bets from './Bets'

const GamesComponent = ({ headers, keys, season, games, bets, sport, statsClick, seasonsClick }) => (
  <div className="game-index">
    <Row>
      <Col lg={12}>
        <div className="back-click" onClick={seasonsClick}>
          Seasons
        </div>
        <h1>{season.year} {sport} Games </h1>
      </Col>
    </Row>
    <Bets bets={bets} />
    <Row>
      <Col lg={12}>
        <Table headers={headers} keys={keys} rows={games} rowClick={statsClick} /> 
      </Col>
    </Row>
  </div>
)

export default GamesComponent

