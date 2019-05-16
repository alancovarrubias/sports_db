import fetch from 'cross-fetch';
import {NBA, MLB} from '../const/sports';

const URLS = {
  [NBA]: 'http://localhost:3001/nba',
  [MLB]: 'http://localhost:3002/mlb',
};

export default class Api {
  constructor(sport) {
    this.setUrl(sport);
  }

  setUrl(sport) {
    this.url = URLS[sport];
  }

  getSeasons() {
    return this.fetch('/seasons');
  }

  getGames({seasonId}) {
  }

  fetch(path) {
    const url = `${this.url}${path}`;
    console.log(url);
    return fetch(url);
  }
}
