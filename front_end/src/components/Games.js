import React from 'react'
import { Row, Col } from 'react-bootstrap'

import './Games.css'
import Table from './common/Table'
import BetRows from './common/BetRows'

const GamesComponent = ({ headers, keys, season, games, period, range, sport, gameClick, backClick }) => (
  <div className="game-index">
    <Row>
      <Col lg={12}>
        <div onClick={backClick}>
          Seasons
        </div>
        <h1>{season.year} {sport} Games </h1>
      </Col>
    </Row>
    <BetRows games={games} />
    <Row>
      <Col lg={12}>
        <Table headers={headers} keys={keys} rows={games} rowClick={gameClick} /> 
      </Col>
    </Row>
  </div>
)

export default GamesComponent

