Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    namespace :v1 do
      resources :users, only: [:create, :show, :update, :destroy]
      resources :resumes do
        resources :resume_comments, only: [:index, :create, :destroy, :update]
      end

      get "tasks" => "tasks#index"
      mount_devise_token_auth_for 'User', at: 'auth'
    end
  end
  
end
