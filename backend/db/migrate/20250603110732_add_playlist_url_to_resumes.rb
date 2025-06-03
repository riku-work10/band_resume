class AddPlaylistUrlToResumes < ActiveRecord::Migration[7.1]
  def change
    add_column :resumes, :playlist_url, :string
  end
end
