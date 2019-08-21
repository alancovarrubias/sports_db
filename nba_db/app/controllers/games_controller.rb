class GamesController < ApiController
  before_action :set_game, only: [:show, :update, :destroy]

  # GET /games
  def index
    @season = Season.find(params[:season_id])
    @games = @season.games.where("date < ?", Date.today)
    @teams = @season.teams
    render json: { season: @season, teams: @teams, games: @games }
  end

  # GET /games/1
  def show
    render json: @game.show_data
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

    # Only allow a trusted parameter "white list" through.
    def game_params
      params.fetch(:game, {})
    end
end
