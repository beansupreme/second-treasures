Rails.application.routes.draw do
  devise_for :users
  root 'home#index'
  get 'books' => 'books#index'

  namespace :api do
    namespace :v1 do
      resources :books, only: [:index, :create], defaults: {format: :json}
    end
  end
end
