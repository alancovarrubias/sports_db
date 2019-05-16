namespace :start do
  task :development do
    exec 'bundle exec rails s -p 3002'
  end

  desc 'Start production server'
  task :production do
    exec 'bundle exec rails s -p 3002'
  end
end

desc 'Start development server'
task :start => 'start:development'
