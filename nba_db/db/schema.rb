# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20190919070731) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bets", id: :serial, force: :cascade do |t|
    t.integer "season_id"
    t.integer "game_id"
    t.string "desc"
    t.integer "period"
    t.float "away_prediction"
    t.float "home_prediction"
    t.float "away_score"
    t.float "home_score"
    t.index ["game_id"], name: "index_bets_on_game_id"
    t.index ["season_id"], name: "index_bets_on_season_id"
  end

  create_table "games", id: :serial, force: :cascade do |t|
    t.integer "season_id"
    t.integer "away_team_id"
    t.integer "home_team_id"
    t.date "date"
    t.index ["away_team_id"], name: "index_games_on_away_team_id"
    t.index ["home_team_id"], name: "index_games_on_home_team_id"
    t.index ["season_id"], name: "index_games_on_season_id"
  end

  create_table "lines", id: :serial, force: :cascade do |t|
    t.integer "season_id"
    t.integer "game_id"
    t.string "desc"
    t.integer "period"
    t.float "spread"
    t.float "total"
    t.index ["game_id"], name: "index_lines_on_game_id"
    t.index ["season_id"], name: "index_lines_on_season_id"
  end

  create_table "players", id: :serial, force: :cascade do |t|
    t.integer "season_id"
    t.integer "team_id"
    t.string "name"
    t.string "abbr"
    t.string "idstr"
    t.string "position"
    t.index ["season_id"], name: "index_players_on_season_id"
    t.index ["team_id"], name: "index_players_on_team_id"
  end

  create_table "seasons", id: :serial, force: :cascade do |t|
    t.integer "year"
  end

  create_table "stats", id: :serial, force: :cascade do |t|
    t.integer "season_id"
    t.integer "game_id"
    t.string "model_type"
    t.integer "model_id"
    t.integer "games_back"
    t.boolean "season_stat", default: false
    t.boolean "starter", default: false
    t.integer "period"
    t.integer "sp", default: 0
    t.integer "fgm", default: 0
    t.integer "fga", default: 0
    t.integer "thpa", default: 0
    t.integer "thpm", default: 0
    t.integer "fta", default: 0
    t.integer "ftm", default: 0
    t.integer "orb", default: 0
    t.integer "drb", default: 0
    t.integer "ast", default: 0
    t.integer "stl", default: 0
    t.integer "blk", default: 0
    t.integer "tov", default: 0
    t.integer "pf", default: 0
    t.integer "pts", default: 0
    t.float "poss_percent", default: 0.0
    t.float "pace", default: 0.0
    t.float "ortg", default: 0.0
    t.float "drtg", default: 0.0
    t.float "drtg_diff", default: 0.0
    t.index ["game_id"], name: "index_stats_on_game_id"
    t.index ["model_type", "model_id"], name: "index_stats_on_model_type_and_model_id"
    t.index ["season_id"], name: "index_stats_on_season_id"
  end

  create_table "teams", id: :serial, force: :cascade do |t|
    t.integer "season_id"
    t.string "name"
    t.string "abbr"
    t.string "abbr2"
    t.string "city"
    t.index ["season_id"], name: "index_teams_on_season_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "name"
    t.string "password_digest"
  end

end
