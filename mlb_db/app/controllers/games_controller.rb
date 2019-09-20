class GamesController < ApiController
  PERIODS = [0]
  before_action :set_game, only: [:show, :update, :destroy]
  before_action :set_season

  # GET /games
  def index
    @games = @season.games.where("date < ?", Date.today)
    @teams = @season.teams
    @lines = []
    @bets = []
    render json: { season: @season, teams: @teams, games: @games, lines: @lines, bets: @bets }
  end

  # GET /games/1
  def show
    @teams = @game.teams
    @players = @teams.map(&:players).flatten
    @stats = [@game.pitcher_stats, @game.batter_stats].flatten
    render json: { season: @season, game: @game, teams: @teams, players: @players, stats: @stats }
  end

  # POST /games
  def create
    @game = Game.new(game_params)

    if @game.save
      render json: @game, status: :created, location: @game
    else
      render json: @game.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /games/1
  def update
    if @game.update(game_params)
      render json: @game
    else
      render json: @game.errors, status: :unprocessable_entity
    end
  end

  # DELETE /games/1
  def destroy
    @game.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_game
      @game = Game.find(params[:id])
    end

    def set_season
      @season = Season.find(params[:season_id])
    end

    # Only allow a trusted parameter "white list" through.
    def game_params
      params.fetch(:game, {})
    end
end
