# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin Ajax requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins ENV.fetch('VERCEL_URL', nil)

    resource '*',
             headers: :any,
             expose: %w[access-token expiry token-type uid client], # 認証ヘッダー  reactからリクエストを受け入れられるようにする
             methods: %i[get post put patch delete options head]
  end
end
