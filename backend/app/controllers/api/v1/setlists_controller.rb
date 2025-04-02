class Api::V1::SetlistsController < ApplicationController
  before_action :set_event
  before_action :set_setlist, only: [:update]

  # 楽曲を追加
  def create
    setlist = @event.setlists.build(setlist_params)

    if setlist.save
      render json: setlist, status: :created
    else
      render json: setlist.errors, status: :unprocessable_entity
    end
  end

 # セットリストの更新
 def update
  ActiveRecord::Base.transaction do
    if setlist_params[:title].blank?
      @setlist.destroy! # タイトルが空なら削除
    else
      @setlist.update!(setlist_params)
    end
    reorder_setlists
  end

  head :no_content # 成功時は204を返す
rescue ActiveRecord::RecordInvalid => e
  render json: { error: e.message }, status: :unprocessable_entity
end

private

def set_event
  @event = Event.find(params[:event_id])
end

def set_setlist
  @setlist = @event.setlists.find(params[:id])
end

def setlist_params
  params.require(:setlist).permit(:title, :order)
end
def reorder_setlists
  # 通常曲（order が数字のみ）の並び替え
  normal_songs = @event.setlists.where("\"order\" NOT LIKE 'En-%'").order(:order)
  normal_songs.each.with_index(1) do |setlist, index|
    setlist.update_column(:order, index) # `order` を 1 から振り直す
  end

  # アンコール曲（order が "En-○"）の並び替え
  encore_songs = @event.setlists.where("\"order\" LIKE 'En-%'").order(:order)
  encore_songs.each.with_index(1) do |setlist, index|
    setlist.update_column(:order, "En-#{index}") # `order` を "En-1", "En-2", ... にする
  end
end

end
