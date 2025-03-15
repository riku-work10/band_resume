class Api::V1::ResumeLikesController < ApplicationController
  before_action :authenticate_api_v1_user!
  def create
    resume = Resume.find(params[:resume_id])  # IDを指定して履歴書を取得
    current_api_v1_user.liked_resumes << resume 
    render json: { liked: true }
  end

  def destroy
    resume = Resume.find(params[:resume_id])
    current_api_v1_user.liked_resumes.delete(resume)
    render json: { liked: false }
  end

end