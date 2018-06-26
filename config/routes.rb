Rails.application.routes.draw do
  root 'home#index'

  namespace :api do
    namespace :v1 do
      resources :books, only: [:index], defaults: {format: :json}
    end
  end
end
