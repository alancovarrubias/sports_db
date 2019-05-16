Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :seasons do
    resources :teams
    resources :players
    resources :games
  end
end
