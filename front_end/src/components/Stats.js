import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Table from './common/Table'
import './Stats.css'

const Show = ({ headers, keys, sport, season, awayTeam, homeTeam, awayStats, homeStats, rowClick }) => {
  return (
        <div className="game-show">
          <Row>
            <Col lg={12}>
              <div>
                <Link to={`/seasons/${season.id}/games`}>{season.year} {sport.toUpperCase()} Games</Link>
              </div>
              <h1>{awayTeam.name} @ {homeTeam.name}</h1>
            </Col>
          </Row>
          <Row>
            <Col className="away-table" lg={12}>
              <p>{awayTeam.name} Player Stats</p>
              <Table headers={headers} keys={keys} rows={awayStats} rowClick={rowClick} maxHeight="300px" />
            </Col>
          </Row>
          <Row>
            <Col className="home-table" lg={12}>
              <p>{homeTeam.name} Player Stats</p>
              <Table headers={headers} keys={keys} rows={homeStats} rowClick={rowClick} maxHeight="300px" />
            </Col>
          </Row>
        </div>
      )
}

export default Show
