import React from "react";
import { Row, Col } from "react-bootstrap";
import "./Index.css";
import { Link } from "@curi/react-dom"

// Components
import Table from "../common/Table";
import BetRows from "./index/BetRows";

// Constants
// import { PERIODS } from "../../const/periods";


const Index = ({ season, games, period, range, rowClick, onChange, selectPeriod }) => {
  const gameHeaders = [
    { text: "Date", width: "16%" },
    "Away Team", "Home Team", "Away Predicted Score", "Home Predicted Score", "Away Score", "Home Score", "Spread", "Total"
  ];
  const gameKeys = ["date", "away_team", "home_team", "away_pred", "home_pred", "away_score", "home_score", "spread", "total"];
  const gameRows = games[period] || [];
  return (
    <div className="game-index">
      <Row>
        <Col lg={12}>
          <div>
            <Link to="Seasons">Seasons</Link>
          </div>
          <h1>{season.year} NBA Games </h1>
        </Col>
      </Row>
      <BetRows games={games[period]} />
      <Row>
        <Col lg={12}>
          <Table headers={gameHeaders} rows={gameRows} keys={gameKeys} rowClick={rowClick} /> 
        </Col>
      </Row>
    </div>
  );
};

export default Index;

