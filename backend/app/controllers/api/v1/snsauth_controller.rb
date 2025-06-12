class Api::V1::SnsauthController < DeviseTokenAuth::OmniauthCallbacksController
  def googleauth
    id_token = request.params[:id_token]

    client = GoogleIDToken::Validator.new
    begin
      payload = client.check(id_token, ENV['GOOGLE_CLIENT_ID'])

      google_email = payload['email']
      google_name = payload['name']
      google_image = payload['picture']

      @user = User.find_or_initialize_by(email: google_email)
      @user.name = google_name if @user.name.blank?
      @user.image = google_image if @user.image.blank?
      @user.provider = 'google_oauth2'
      @user.uid = payload['sub']

      if @user.new_record?
        @user.save!
      end

      # ✅ トークンを生成
      token = @user.create_new_auth_token

      # ✅ ヘッダーにトークンを追加
      response.headers.merge!(token)

      # ✅ 必要に応じてユーザー情報を返す
      render json: @user
    rescue GoogleIDToken::ValidationError => e
      render json: { error: 'Invalid token', message: e.message }, status: 401
    end
  end

  protected

  def resource_class
    User
  end
end
