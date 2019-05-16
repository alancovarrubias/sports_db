module Stats
  class Player
    attr_reader :player, :team, :opp
    def initialize(player, team, opp)
      @player = player
      @team = team
      @opp = opp
    end

    def q_5
     return 1.14 * ((team.ast - player.ast).to_f / team.fgm)
    end

    def q_12
      q_12 = ((team.ast / team.mp) * player.mp * 5.0 - player.ast)/((team.fgm / team.mp) * player.mp * 5.0 - player.fgm)
      if q_12.nan? || q_12.to_s == 'Infinity' || q_12.to_s == '-Infinity'
        return 0.0
      end
      return q_12
    end

    def q_ast
      q_ast = player.mp / (team.mp/5.0) * player.q_5 + (1.0 - player.mp/(team.mp/5.0)) * player.q_12
      return q_ast.nan? ? 0.0 : q_ast
    end

    # Parts

    def fg_part
      fgpart = player.fgm * (1.0 - 0.5 * (player.pts - player.ftm)/(2.0 * player.fga) * player.q_ast)
      return fgpart.nan? ? 0.0 : fgpart
    end

    def ft_part
      return (1 - (1 - player.ft_percent) ** 2) * 0.4 * player.fta
    end

    def ast_part
      return 0.5 * ((team.pts - team.ftm) - (player.pts - player.ftm)) / (2.0 * (team.fga - player.fga)) * player.ast
    end

    def orb_part
      return player.orb * team.orb_weight * team.play_percent
    end

    # Possessions
    def fgx_poss
      return (player.fga - player.fgm) * (1.0 - 1.07 * team.orb_percent)
    end

    def ftx_poss
      ((1.0 - player.ft_percent) ** 2) * 0.4 * player.fta
    end

    def sc_poss
      (player.fg_part + player.ast_part + player.ft_part) * (1 - (team.orb / team.sc_poss) * team.orb_weight * team.play_percent) + player.orb_part
    end

    def tot_poss
      player.sc_poss + player.fgx_poss + player.ftx_poss + player.tov
    end

    def plays
      player.fga + player.fta * 0.4 + player.tov
    end

    # Percentage

    # Percentage of a team's possessions on which the team scores at least 1 point
    def floor_percentage
      floor_percentage = player.sc_poss / player.tot_poss
      return floor_percentage.nan? ? 0.0 : floor_percentage
    end

    # Percentage of a team's non-foul shot possessions on which the team socres a field goal
    def field_percent
      fieldPercent = player.fgm / (player.fga - (player.orb/(player.orb + player.drb).to_f) * (player.fga - player.fgm) * 1.07)
      return fieldPercent.nan? ? 0.0 : fieldPercent
    end

    # Percentage of a team's "plays" on which the team scores at least 1 point
    def play_percent
      play_percent = player.sc_poss / player.plays
      return play_percent.nan? ? 0.0 : play_percent
    end

    def ft_percent
      ft_percent = player.ftm/player.fta.to_f
      return ft_percent.nan? ? 0.0 : ft_percent
    end

    def calc_poss_percent
      player.tot_poss / team.tot_poss
    end

    def sc_poss_percent
      player.sc_poss / team.sc_poss
    end

    # Points Produced

    def p_prod_fg_part
      pprodfgpart = 2 * (player.fgm + 0.5 * player.thpm) * (1 - 0.5 * ((player.pts - player.ftm).to_f / (2 * player.fga)) * player.q_ast)
      return pprodfgpart.nan? ? 0.0 : pprodfgpart
    end

    def p_prod_ast_part
      2 * ((team.fgm - player.fgm + 0.5 * (team.thpm - player.thpm)) / (team.fgm - player.fgm).to_f) * 0.5 * (((team.pts - team.ftm) - (player.pts - player.ftm)) / (2 * (team.fga - player.fga).to_f)) * player.ast
    end

    def p_prod_orb_part
      pprodorbpart = player.orb * team.orb_weight * team.play_percent * (team.pts / (team.fgm + (1 - (1 - (team.ftm / team.fta.to_f)) ** 2) * 0.4 * team.fta))
      return pprodorbpart.nan? ? 0.0 : pprodorbpart
    end

    def p_prod
      pprod = (player.p_prod_fg_part + player.p_prod_ast_part + player.ftm) * (1 - (team.orb / team.sc_poss) * team.orb_weight * team.play_percent) + player.p_prod_orb_part
      return pprod.nan? ? 0.0 : pprod
    end

    def calc_ortg
      ortg = 100 * (player.p_prod / player.tot_poss)
      return ortg.nan? ? 0.0 : ortg
    end

    def predicted_points
      player.poss_percent * player.calc_ortg
    end

    # Defense

    def d_fg_percent
      var = opp.fgm / opp.fga.to_f
      return var.nan? ? 0.0 : var
    end

    def d_orb_percent
      var = opp.orb / (opp.orb + team.drb).to_f
      return var.nan? ? 0.0 : var
    end

    def fmwt
      dfg = player.d_fg_percent
      dor = player.d_orb_percent
      var = (dfg * (1 - dor)) / (dfg * (1 - dor) + (1 - dfg) * dor)
      return var.nan? ? 0.0 : var
    end

    def stops_1
      fmwt = player.fmwt
      var = player.stl + player.blk * fmwt * (1 - 1.07 * player.d_orb_percent) + player.drb * (1 - fmwt)
      return var.nan? ? 0.0 : var
    end

    def stops_2
      var = (((opp.fga - opp.fgm - team.blk) / team.mp) * player.fmwt * (1 - 1.07 * player.d_orb_percent) + ((opp.tov - team.stl).to_f / team.mp)) * player.mp + (player.pf / team.pf.to_f) * 0.4 * opp.fta * (1 - (opp.ftm / opp.fta.to_f)) ** 2
      return var.nan? ? 0.0 : var
    end

    def stops
      return player.stops_1 + player.stops_2
    end

    def stop_percent
      var = (player.stops * opp.mp) / (team.tot_poss * player.mp)
      return var.nan? ? 0.0 : var
    end

    def def_points_per_sc_poss
      var = opp.pts / (opp.fgm + (1 - (1 - (opp.ftm / opp.fta.to_f)) ** 2) * opp.fta * 0.4).to_f
      return var.nan? ? 0.0 : var
    end

    def calc_drtg
      team.calc_drtg + 0.2 * (100 * player.def_points_per_sc_poss * (1 - player.stop_percent) - team.calc_drtg)
    end
  end
end
