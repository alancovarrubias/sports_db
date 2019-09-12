module StatHelper
  REFERENCE_STATS = [:sp, :fgm, :fga, :thpm, :thpa, :ftm, :fta, :orb, :drb, :ast, :stl, :blk, :tov, :pf, :pts]
  def reference_hash
    return Hash[REFERENCE_STATS.map {|stat| [stat, 0]}]
  end

  def sum_stats(initial_hash, stats)
    return stats.inject(initial_hash) { |mem, hash| mem.merge(hash) { |key, old, new| old + new } }
  end
end
