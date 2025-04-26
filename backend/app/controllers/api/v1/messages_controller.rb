class Api::V1::MessagesController < ApplicationController
  before_action :authenticate_api_v1_user!
  before_action :find_message, only: [:edit, :update, :destroy]

  def index
    messages = Message.includes(:user).order(created_at: :asc)
    render json: messages.as_json(include: { user: { only: [:id, :email, :uid, :name] } })
  end

  def create
    message = current_api_v1_user.messages.create!(message_params)
    render json: message, status: :created
  end

  def edit
    render json: @message
  end

  def update
    if @message.update(message_params)
      render json: @message
    else
      render json: { error: '更新に失敗しました' }, status: :unprocessable_entity
    end
  end

  # 削除
  def destroy
    @message.destroy
    head :no_content
  end

  private

  def find_message
    @message = Message.find(params[:id])
  end

  def message_params
    params.require(:message).permit(:content)
  end
end
