module StatHelper
  DATA_STATS = [:sp, :fgm, :fga, :thpm, :thpa, :ftm, :fta, :orb, :drb, :ast, :stl, :blk, :tov, :pf, :pts]
  def data_hash
    return Hash[DATA_STATS.map {|stat| [stat, 0]}]
  end

  def add_stats(initial_stat, stats)
    return stats.inject(initial_stat) { |mem, hash| add_stat(mem, hash) }
  end

  def subtract_stats(initial_stat, stats)
    return stats.inject(initial_stat) { |mem, hash| subtract_stat(mem, hash) }
  end

  def add_stat(initial_stat, stat)
    return initial_stat.merge(stat) { |key, old, new| old + new }
  end

  def subtract_stat(initial_stat, stat)
    return initial_stat.merge(stat) { |key, old, new| old - new }
  end
end
