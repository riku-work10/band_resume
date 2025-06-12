module Api
  module V1
    class MessagesController < ApplicationController
      before_action :authenticate_api_v1_user!

      def index
        messages = Message.includes(:user)
                          .order(created_at: :desc)
                          .limit(100)
                          .reverse # フロントで時系列に表示するため
        render json: messages.as_json(
          include: { user: { only: %i[id email uid name] } }
        )
      end

      private

      def find_message
        @message = Message.find(params[:id])
      end

      def message_params
        params.require(:message).permit(:content)
      end
    end
  end
end
