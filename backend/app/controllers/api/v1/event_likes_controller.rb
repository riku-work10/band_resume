class Api::V1::EventLikesController < ApplicationController
  before_action :authenticate_api_v1_user!
  def create
    event = Event.find(params[:event_id])  # IDを指定して履歴書を取得
    current_api_v1_user.liked_events << event 
    render json: { liked: true }
  end

  def destroy
    event = Event.find(params[:event_id])
    current_api_v1_user.liked_events.delete(event)
    render json: { liked: false }
  end

end