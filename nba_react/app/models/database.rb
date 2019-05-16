module Database
  def basketball_reference(endpoint)
    url = "http://www.basketball-reference.com/#{endpoint}"
    return Nokogiri::HTML(open(url))
  end
end
