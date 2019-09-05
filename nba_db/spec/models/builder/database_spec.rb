module Builder
  RSpec.describe Database do
    it "test" do
      database = Database.new(2019)
      expect(database.year).to eq(2019)
    end
  end
end
