import Seasons from './containers/Seasons'
import Games from './containers/Games'
import Game from './containers/Game'

export default [
  {
    name: "Root",
    path: "",
    response() {
      return {
        redirectTo: { name: "Seasons" }
      };
    }
  },
  {
    name: "Seasons",
    path: "seasons",
    response() {
      return {
        body: Seasons
      };
    }
  },
  {
    name: "Games",
    path: "seasons/:seasonId/games",
    resolve: {
      seasonId: ({ params }) => params.seasonId
    },
    response({ resolved }) {
      return {
        body: Games,
        seasonId: resolved.seasonId
      };
    }
  },
  {
    name: "Game",
    path: "seasons/:seasonId/games/:gameId",
    resolve: {
      gameId: ({ params }) => params.gameId,
      seasonId: ({ params }) => params.seasonId
    },
    response({ resolved }) {
      return {
        body: Game,
        seasonId: resolved.seasonId,
        gameId: resolved.gameId
      };
    }
  },
  {
    name: "Catch All",
    path: "(.*)"
  }
];
