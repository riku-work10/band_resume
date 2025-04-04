class Api::V1::ResumesController < ApplicationController
  before_action :authenticate_api_v1_user!

  def index
    if params[:user_id]
      resumes = Resume.where(user_id: params[:user_id])  # user_id に基づいて履歴書を取得
    else
      resumes = Resume.all  # user_id がない場合は全ての履歴書を取得
    end
    render json: resumes
  end

  def show
    resume = Resume.find(params[:id])
    render json: resume.as_json(include: { resume_sections: { include: :resume_items } })
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
    resume = Resume.find(params[:id])  # 指定されたIDで Resume を検索
    if resume.update(resume_params)  # パラメータで指定された内容で Resume を更新
      render json: resume.as_json(include: { resume_sections: { include: :resume_items } })
    else
      render json: { errors: resume.errors.full_messages }, status: :unprocessable_entity  # 更新失敗時にエラーメッセージを返す
    end
  end

  def destroy
    resume = Resume.find(params[:id])
    resume.destroy
    head :no_content  #HTTPステータスコードの204を返すという意味
  end

  def liked_by_current_user
    resume = Resume.find(params[:id])
    liked = current_api_v1_user.liked_resumes.exists?(resume.id)

    render json: { liked: liked }
  end

  def my_liked_resumes
    liked_resumes = current_api_v1_user.liked_resumes

    render json: liked_resumes
  end

  private

  def resume_params
    params.require(:resume).permit(:user_id, :title, :profile_image, :age, :gender, :sns_url, :location, :introduction)
  end
end