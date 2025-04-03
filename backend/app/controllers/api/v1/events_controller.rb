class Api::V1::EventsController < ApplicationController
  before_action :authenticate_api_v1_user!

  def index
    if params[:user_id]
      events = Event.includes(:setlists, :tags).where(user_id: params[:user_id])
    else
      events = Event.includes(:setlists, :tags).all
    end
    render json: events.as_json(include: [:setlists, :tags])
  end

  def show
    event = Event.includes(:setlists, :tags).find(params[:id])
    render json: event.as_json(include: [:setlists, :tags])
  end

  def create
    event = Event.new(event_params)
    if event.save
      update_tags(event, params[:tag_names])
      render json: event, include: :tags, status: :created
    else
      render json: { errors: event.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    event = Event.find(params[:id])
    if event.update(event_params)
      update_tags(event, params[:tag_names])
      render json: event, include: [:tags, :setlists], status: :ok
    else
      render json: { errors: event.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    event = Event.find(params[:id])
    event.destroy
    head :no_content
  end

  def liked_by_current_user
    event = Event.find(params[:id])
    liked = current_api_v1_user.liked_events.exists?(event.id)

    render json: { liked: liked }
  end

  def my_liked_events
    liked_events = current_api_v1_user.liked_events
    render json: liked_events
  end

  #特定のタグが付いているイベントを取得するカスタムメソッド
  def tagged_events
    tag = Tag.find_by(name: params[:tag_name])
    if tag
      events = tag.events.includes(:setlists, :tags)
      render json: events.as_json(include: [:setlists, :tags])
    else
      render json: { message: "タグが見つかりません" }, status: :not_found
    end
  end

  private

  def event_params
    params.require(:event).permit(:user_id, :title, :image, :location, :introduction, :date)
  end

  def update_tags(event, tag_names)
    return unless tag_names

    # 現在のタグを取得
    current_tags = event.tags.pluck(:name)

    # 新しく追加するタグ
    new_tags = tag_names - current_tags
    new_tags.each do |tag_name|
      tag = Tag.find_or_create_by(name: tag_name)
      event.tags << tag unless event.tags.include?(tag)
    end

    # 削除するタグ
    removed_tags = current_tags - tag_names
    removed_tags.each do |tag_name|
      tag = Tag.find_by(name: tag_name)
      event.tags.delete(tag) if tag
    end
  end
end
