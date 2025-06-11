class Api::V1::ResumesController < ApplicationController
  before_action :authenticate_api_v1_user!

  def index
    if params[:user_id]
      resumes = Resume.where(user_id: params[:user_id])
    else
      resumes = Resume.all
    end

    render json: resumes.as_json(include: :user)
  end

  def show
    resume = Resume.find(params[:id])
    render json: resume.as_json(include: {
      user: { only: [:id, :name, :email] },
      resume_sections: { include: :resume_items }
    })
  end

  def my_liked_resumes
    liked_resumes = current_api_v1_user.liked_resumes

    render json: liked_resumes.as_json(include: :user)
  end

  def create
    resume = Resume.new(resume_params)
    if resume.save
      render json: resume, status: :created
    else
      render json: { errors: resume.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    resume = Resume.find(params[:id])
    if resume.update(resume_params)
      render json: resume.as_json(include: { resume_sections: { include: :resume_items } })
    else
      render json: { errors: resume.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    resume = Resume.find(params[:id])
    resume.destroy
    head :no_content
  end

  def liked_by_current_user
    resume = Resume.find(params[:id])
    liked = current_api_v1_user.liked_resumes.exists?(resume.id)
    likes_count = resume.resume_likes.count

    render json: { liked: liked, likes_count: likes_count }
  end

  private

  def resume_params
    params.require(:resume).permit(:user_id, :title, :profile_image, :age, :gender, :sns_url, :location, :introduction, :playlist_url)
  end
end
