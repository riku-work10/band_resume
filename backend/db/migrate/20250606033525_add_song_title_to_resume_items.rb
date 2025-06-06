class AddSongTitleToResumeItems < ActiveRecord::Migration[7.1]
  def change
    add_column :resume_items, :song_title, :string
  end
end
