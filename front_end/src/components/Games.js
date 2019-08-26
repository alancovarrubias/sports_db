import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import './Games.css'
import Table from './common/Table'
import BetRows from './common/BetRows'

const GamesComponent = ({ headers, keys, season, games, period, range, sport, gameClick, onChange, seasonLink }) => {
  return (
    <div className="game-index">
      <Row>
        <Col lg={12}>
          <div>
            <Link to={seasonLink}>Seasons</Link>
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
}

export default GamesComponent

