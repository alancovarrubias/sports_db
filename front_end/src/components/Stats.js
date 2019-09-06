import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Table from './common/Table'
import './Stats.css'

const Stats = ({ headers, keys, sport, season, awayTeam, homeTeam, awayStats, homeStats, backClick }) => (
  <div className="game-show">
    <Row>
      <Col lg={12}>
        <div>
          <Link onClick={backClick}>{season.year} {sport} Games</Link>
        </div>
        <h1>{awayTeam.name} @ {homeTeam.name}</h1>
      </Col>
    </Row>
    <Row>
      <Col className="away-table" lg={12}>
        <p>{awayTeam.name} Player Stats</p>
        <Table headers={headers} keys={keys} rows={awayStats} maxHeight="300px" />
      </Col>
    </Row>
    <Row>
      <Col className="home-table" lg={12}>
        <p>{homeTeam.name} Player Stats</p>
        <Table headers={headers} keys={keys} rows={homeStats} maxHeight="300px" />
      </Col>
    </Row>
  </div>
)

export default Stats
