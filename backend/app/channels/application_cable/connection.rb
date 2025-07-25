module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user
    def connect
      self.current_user = find_verified_user
    end

    private

    def find_verified_user
      if (verified_user = User.find_by(uid: request.params[:uid]))
        if verified_user.valid_token?(request.params[:token], request.params[:client])
          verified_user
        else
          reject_unauthorized_connection
        end
      else
        reject_unauthorized_connection
      end
    end
  end
end
