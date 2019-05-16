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

ActiveRecord::Schema.define(version: 20190323224613) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "games", force: :cascade do |t|
    t.bigint "season_id"
    t.bigint "away_team_id"
    t.bigint "home_team_id"
    t.date "date"
    t.integer "num"
    t.index ["away_team_id"], name: "index_games_on_away_team_id"
    t.index ["home_team_id"], name: "index_games_on_home_team_id"
    t.index ["season_id"], name: "index_games_on_season_id"
  end

  create_table "players", force: :cascade do |t|
    t.bigint "season_id"
    t.bigint "team_id"
    t.string "alias"
    t.string "name"
    t.string "first_name"
    t.string "last_name"
    t.index ["season_id"], name: "index_players_on_season_id"
    t.index ["team_id"], name: "index_players_on_team_id"
  end

  create_table "seasons", force: :cascade do |t|
    t.integer "year"
  end

  create_table "stats", force: :cascade do |t|
    t.bigint "season_id"
    t.bigint "game_id"
    t.string "model_type"
    t.bigint "model_id"
    t.string "stat_type"
    t.string "venue"
    t.float "IP"
    t.integer "H"
    t.integer "R"
    t.integer "ER"
    t.integer "BB"
    t.integer "HR"
    t.float "ERA"
    t.integer "AB"
    t.integer "RBI"
    t.integer "SO"
    t.integer "PA"
    t.float "BA"
    t.float "OBP"
    t.float "SLG"
    t.float "OPS"
    t.index ["game_id"], name: "index_stats_on_game_id"
    t.index ["model_type", "model_id"], name: "index_stats_on_model_type_and_model_id"
    t.index ["season_id"], name: "index_stats_on_season_id"
  end

  create_table "teams", force: :cascade do |t|
    t.bigint "season_id"
    t.string "abbr"
    t.string "alt_abbr"
    t.string "city"
    t.string "name"
    t.index ["season_id"], name: "index_teams_on_season_id"
  end

end
