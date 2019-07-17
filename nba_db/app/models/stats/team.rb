module Stats
  class Team
    attr_reader :team, :opp
    def initialize(team, opp)
      @team = team
      @opp = opp
    end

    def ft_percent
      ftp = (team.ftm/team.fta.to_f).round(2)
      if ftp.nan?
        ftp = 0
      end
      return ftp
    end

    def sc_poss
      (team.fgm + (1 - (1 - team.ft_percent) ** 2 ) * team.fta * 0.4).round(2)
    end

    def tot_poss
      0.5 * ((team.fga + 0.4 * team.fta - 1.07 * team.orb_percent * (team.fga - team.fgm) + team.tov) + (opp.fga + 0.4 * opp.fta - 1.07 * opp.orb_percent* (opp.fga - opp.fgm) + opp.tov))
    end

    def pace
      48 * ((team.tot_poss + opp.tot_poss) / (2 * (team.mp / 5)))
    end

    def plays
      (team.fga + team.fta * 0.4 + team.tov).round(2)
    end

    def orb_weight
      orb_p = team.orb_percent
      play_p = team.play_percent
      ((1.0 - orb_p) * play_p) / ((1.0 - orb_p) * play_p + orb_p * (1 - play_p))
    end

    def field_percent
      (team.fgm / (team.fga - (team.orb / (team.orb + team.drb)) * (team.fga - team.fgm) * 1.07)).round(2)
    end

    def play_percent
      (team.sc_poss/team.plays).round(2)
    end

    def orb_percent
      team.orb / (team.orb + opp.drb).to_f
    end

    def calc_poss_percent
      team.tot_poss / (team.tot_poss + opp.tot_poss)
    end

    def calc_ortg
      100 * team.pts / team.tot_poss
    end

    def calc_drtg
      100 * (opp.pts / team.tot_poss)
    end

    def calc_drtg_diff
    end
  end
end
