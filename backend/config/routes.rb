Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    namespace :v1 do
      get "tasks" => "tasks#index"
      mount_devise_token_auth_for 'User', at: 'auth'
    end
  end
  
end
