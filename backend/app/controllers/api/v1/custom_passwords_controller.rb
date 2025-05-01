class Api::V1::CustomPasswordsController < DeviseTokenAuth::PasswordsController
  def edit
    super do |resource|
      redirect_to(@redirect_url, allow_other_host: true) and return if @redirect_url
    end
  end
end