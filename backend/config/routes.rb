Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      get "tasks" => "tasks#index"
      mount_devise_token_auth_for 'User', at: 'auth'
    end
  end

  get "up" => "rails/health#show", as: :rails_health_check

end
