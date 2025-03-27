class Api::V1::EventsController < ApplicationController
  before_action :authenticate_api_v1_user!

  def index
    if params[:user_id]
      events = Event.where(user_id: params[:user_id])
    else
      events = Event.all
    end
    render json: events
  end

  def show
    event = Event.find(params[:id])
    render json: event
  end

  def create
    event = Event.new(event_params)
    if event.save
      render json: event, status: :created
    else
      render json: { errors: event.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    event = Event.find(params[:id])
    if event.update(event_params)
      render json: event
    else
      render json: { errors: event.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    event = Event.find(params[:id])
    event.destroy
    head :no_content
  end

  # def liked_by_current_user
  #   resume = Resume.find(params[:id])
  #   liked = current_api_v1_user.liked_resumes.exists?(resume.id)

  #   render json: { liked: liked }
  # end

  # def my_liked_resumes
  #   liked_resumes = current_api_v1_user.liked_resumes

  #   render json: liked_resumes
  # end

  private

  def event_params
    params.require(:event).permit(:user_id, :title, :image, :location, :introduction, :date)
  end
end