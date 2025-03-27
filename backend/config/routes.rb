Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    namespace :v1 do
      resources :users, only: [:create, :show, :update, :destroy]
      resources :resumes do
        resources :resume_comments, only: [:index, :create, :destroy, :update]
        resource :resume_likes, only: [:create, :destroy]
        get :liked_by_current_user, on: :member
        get :my_liked_resumes, on: :collection

        resources :resume_sections, only: [:index, :create, :destroy, :update] do
          collection do
            put :update_position
          end

          resources :resume_items, only: [:create, :index] do
            put :update_position, on: :collection
          end
        end
      end

      resources :events, only: [:inedx, :show, :create, :destroy, :update]

      
      resources :resume_items, only: [:update, :destroy]
      get 'users/:id/liked_resumes', to: 'users#liked_resumes'
      mount_devise_token_auth_for 'User', at: 'auth'
    end
  end
  
end
