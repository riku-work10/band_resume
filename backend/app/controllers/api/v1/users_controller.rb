class Api::V1::UsersController < ApplicationController
  before_action :authenticate_api_v1_user!

  def create
    user = User.new(user_params)
    if user.save
      render json: user, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    user = User.find(params[:id])
    render json: user
  end

  def update
    user = current_api_v1_user
    if user.update(user_params)
      render json: user
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    user = User.find(params[:id])
    user.destroy
    head :no_content
  end

  def liked_resumes
    liked_resumes = current_api_v1_user.liked_resumes

    render json: liked_resumes, include: [:user] # 必要なら関連データも含める
  end

  def liked_events
    liked_events = current_api_v1_user.liked_events

    render json: liked_events, include: [:user] # 必要なら関連データも含める
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :image)
  end
end