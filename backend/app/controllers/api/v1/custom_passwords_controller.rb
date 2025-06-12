module Api
  module V1
    class CustomPasswordsController < DeviseTokenAuth::PasswordsController
      def edit
        super do |_resource|
          redirect_to(@redirect_url, allow_other_host: true) and return if @redirect_url
        end
      end
    end
  end
end
