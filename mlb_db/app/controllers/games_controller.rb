class GamesController < ApiController
  PERIODS = [0]
  before_action :set_game, only: [:show, :update, :destroy]
  before_action :set_season

  # GET /games
  def index
    @season = Season.find(params[:season_id])
    @games = @season.games.where("date < ?", Date.today).order(:date, :home_team_id).map(&:index_data)
    render json: { season: @season, games: @games }
  end

  # GET /games/1
  def show
    render json: { season: @season, game: @game.show_data }
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
