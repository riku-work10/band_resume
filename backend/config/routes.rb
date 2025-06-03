Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check
  root to: "health_check#index"

  get '/ogp/resumes/:id', to: 'ogp#resume', as: :ogp_resume



  namespace :api do
    namespace :v1 do
      post 'snsauth/googleauth', to: 'snsauth#googleauth'
      get 's3/presigned_url', to: 's3#presigned_url'
      delete 's3/delete_object', to: 's3#delete_object'
      resources :notifications, only: [:index, :update] do
        member do
          patch :read
        end
        collection do
          patch :read_all
        end
      end
      resources :messages, only: [:index]
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

      resources :events do
        collection do
          get :tagged_events
        end
        resources :setlists, only: [:create, :update]
        resources :event_comments, only: [:index, :create, :destroy, :update]
        resource :event_likes, only: [:create, :destroy]
        get :liked_by_current_user, on: :member
        get :my_liked_events, on: :collection
      end


      resources :resume_items, only: [:update, :destroy]
      get 'users/:id/liked_resumes', to: 'users#liked_resumes'
      get 'users/:id/liked_events', to: 'users#liked_events'
      mount_devise_token_auth_for 'User', at: '/auth', controllers: {
        passwords: 'api/v1/custom_passwords'
      }

    end
  end
  
end
