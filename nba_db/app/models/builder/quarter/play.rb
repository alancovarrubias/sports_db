module Builder
  module Quarter
    class Play
      attr_reader :type, :stat1, :stat2, :text
      def initialize(play)
        @type = "score"
        @text = play.text
        parse_play(@text)
      end

      def parse_play(text)
        case text
        when /defensive rebound/i
          def_reb
        when /offensive rebound/i
          off_reb
        when /free throw/
          text.include?("miss") ? miss_free : make_free 
        when /misses 2-pt/
          miss_two
        when /misses 3-pt/
          miss_three
        when /makes 2-pt/
          make_two
        when /makes 3-pt/
          make_three
        when /turnover/i
          turnover
        when /double personal/i
          double_foul
        when /personal|shooting|charge|loose ball|offensive|away from play|flagrant|clear path|inbound/i
          personal_foul
        when /enters the game/
          substitution
        when /quarter|overtime/
          new_quarter(text)
        when /jump/i
          jump
        when /tech foul|technical foul/i
          tech_foul
        when /violation/i
          violation
        when /ejected/i
          ejected
        end
      end

      def def_reb
        @stat1 = { drb: 1 }
      end

      def off_reb
        @stat1 = { orb: 1 }
      end

      def miss_free
        @stat1 = { fta: 1 }
      end

      def make_free
        @stat1 = { fta: 1, ftm: 1, pts: 1 }
      end

      def miss_two
        @stat1 = { fga: 1 }
        @stat2 = { blk: 1 } if @player2
      end

      def make_two
        @stat1 = { fga: 1, fgm: 1, pts: 2 }
        @stat2 = { ast: 1 } if @player2
      end

      def miss_three
        @stat1 = { fga: 1, thpa: 1 }
        @stat2 = { blk: 1 } if @player2
      end

      def make_three
        @stat1 = { fga: 1, fgm: 1, thpa: 1, thpm: 1, pts: 3 }
        @stat2 = { ast: 1 } if @player2
      end

      def turnover
        @stat1 = { tov: 1 }
        @stat2 = { stl: 1 } if @player2
      end

      def double_foul
        @stat1 = { pf: 1 }
        @stat2 = { pf: 1 }
      end

      def personal_foul
        @stat1 = { pf: 1 }
      end
      
      def new_quarter(text)
        case text
        when /Start of/
          @type = "qs"
        when /End of/
          @type = "qe"
        end
      end

      def substitution
        @type = "sub"
      end

      def jump
        @type = "jump"
      end

      def tech_foul
        @type = "tech"
      end

      def violation
        @type = "viol"
      end

      def ejected
        @type = "ejected"
      end
    end
  end
end
