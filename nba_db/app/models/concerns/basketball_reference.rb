module BasketballReference
  require 'open-uri'
  def basketball_reference(path)
    url = File.join("http://www.basketball-reference.com", path)
    return Nokogiri::HTML(open(url, read_timeout: 10))
  rescue OpenURI::HTTPError => e
    puts "URL #{url} not found"
    return false
  rescue Net::ReadTimeout => e
    retry
  rescue Net::OpenTimeout => e
    puts "URL #{url} timeout"
    return false
  end

  def basketball_data(path, css)
    doc = basketball_reference(path)
    return doc.css(css) if doc
  end

  def player_attr(element)
    name, abbr = parse_name(element)
    idstr = parse_idstr(element)
    return {name: name, abbr: abbr, idstr: idstr}
  end

  def parse_name(element)
    last_name, first_name = element.attributes["csk"].value.split(",")
    return "#{first_name} #{last_name}", "#{first_name[0]}. #{last_name}"
  end

  def parse_idstr(element)
    return element.child["href"].match(/\w*\d{2}/)[0]
  end

  def parse_time(element)
    text = element.text
    minutes, seconds = text.split(":").map(&:to_i)
    return minutes*60 + seconds
  end
end
