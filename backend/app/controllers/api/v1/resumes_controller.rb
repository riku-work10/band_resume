class Api::V1::ResumesController < ApplicationController
  before_action :authenticate_api_v1_user!

  def index
    resumes = Resume.all
    render json: resumes
  end

  def show
    resume = Resume.includes(:learning_records).find(params[:id])
    render json: resume.as_json(include: :learning_records)
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
      render json: resume.as_json(include: :learning_records)  # 更新成功時に新しい Resume を JSON で返す
    else
      render json: { errors: resume.errors.full_messages }, status: :unprocessable_entity  # 更新失敗時にエラーメッセージを返す
    end
  end

  def destroy
    resume = Resume.find(params[:id])
    resume.destroy
    head :no_content  #HTTPステータスコードの204を返すという意味
  end

  private

  def resume_params
    params.require(:resume).permit(:user_id, :title, :profile_image, :age, :gender, :sns_url, :location, :introduction)
  end
end