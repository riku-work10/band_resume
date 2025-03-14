class  Api::V1::CommentsController < ApplicationController
  before_action :authenticate_api_v1_user!

  def index
    resume = Resume.find(params[:resume_id])
    comments = resume.comments.includes(:user)

    render json: comments.as_json(include: { user: { only: [:id, :name] } })
  end

  def create
    resume = Resume.find(params[:resume_id])
    comment = resume.comments.build(comment_params)
    comment.user = api_v1_current_user

    if comment.save
      render json: comment.as_json(include: { user: { only: [:id, :name] } }), status: :created  
    else
      render json: comment.errors, status: :unprocessable_entity
    end
  end


  def update
    comment = Comment.find(params[:id])
    
    # コメントの所有者が現在のユーザーか確認
    if comment.user == current_user
      if comment.update(comment_params)
        render json: comment.as_json(include: { user: { only: [:id, :name] } })
      else
        render json: comment.errors, status: :unprocessable_entity
      end
    else
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  def destroy
    comment = Comment.find(params[:id])
    if comment.user == api_v1_current_user
      comment.destroy
      head :no_content
    else
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:content)
  end
end