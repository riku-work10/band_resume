module Api
  module V1
    class ResumeLikesController < ApplicationController
      before_action :authenticate_api_v1_user!
      def create
        resume = Resume.find(params[:resume_id]) # IDを指定して履歴書を取得
        current_api_v1_user.liked_resumes << resume
        render json: { liked: true, likes_count: resume.resume_likes.count }
      end

      def destroy
        resume = Resume.find(params[:resume_id])
        current_api_v1_user.liked_resumes.delete(resume)
        render json: { liked: false, likes_count: resume.resume_likes.count }
      end
    end
  end
end
