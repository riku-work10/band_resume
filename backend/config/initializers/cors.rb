# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin Ajax requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'https://band-resume-git-login-rikus-projects-0196bac5.vercel.app'

    resource "*",
      headers: :any,
      expose: ['access-token', 'expiry', 'token-type', 'uid', 'client'], # 認証ヘッダー  reactからリクエストを受け入れられるようにする
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
