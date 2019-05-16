import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Table from '../common/Table';
import './Show.css';
import { Link } from '@curi/react-dom';
// import { PERIODS } from "../../const/periods";

const Show = ({ season, game, period }) => {
  const away_team = game.away_team || { players: {} }
  const home_team = game.home_team || { players: {} }
  const away_players = away_team.players[period] || []
  const home_players = home_team.players[period] || []
  const seasonId = season.id || "1"
  const headers = [
    { width: "16%", text: "Name" },
    "MP", "FGM", "FGA", "THPM", "THPA", "FTM", "FTA", "ORB", "DRB", "AST", "STL", "BLK", "TOV", "PF", "PTS", "ORTG", "DRTG"
  ]
  const keys = ["name", "mp", "fgm", "fga", "thpm", "thpa", "ftm", "fta", "orb", "drb", "ast", "stl", "blk", "tov", "pf", "pts", "ortg", "drtg"]
  const away_table = <Table headers={headers} keys={keys} rows={away_players} maxHeight="300px"/>
  const home_table = <Table headers={headers} keys={keys} rows={home_players} maxHeight="300px"/>
  // const options = Object.keys(PERIODS).map(period => <option key={period} value={period}>{PERIODS[period]}</option>);
  return (
        <div className="game-show">
          <Row>
            <Col lg={12}>
              <div>
                <Link to="Games" params={{ seasonId }}>{season.year} Games</Link>
              </div>
              <h1>{away_team.name} @ {home_team.name}</h1>
            </Col>
          </Row>
          <Row>
            <Col className="away-table" lg={12}>
              <p>{away_team.name} Player Stats</p>
              { away_table }
            </Col>
          </Row>
          <Row>
            <Col className="home-table" lg={12}>
              <p>{home_team.name} Player Stats</p>
              { home_table }
            </Col>
          </Row>
        </div>
      );
};

export default Show;
