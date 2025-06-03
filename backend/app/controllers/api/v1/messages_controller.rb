class Api::V1::MessagesController < ApplicationController
  before_action :authenticate_api_v1_user!

  def index
    messages = Message.includes(:user).order(created_at: :asc)
    render json: messages.as_json(include: { user: { only: [:id, :email, :uid, :name] } })
  end

  private

  def find_message
    @message = Message.find(params[:id])
  end

  def message_params
    params.require(:message).permit(:content)
  end
end
