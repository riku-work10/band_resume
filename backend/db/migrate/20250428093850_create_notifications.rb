class CreateNotifications < ActiveRecord::Migration[7.1]
  def change
    create_table :notifications do |t|
      t.references :user, null: false, foreign_key: true
      t.references :resume, foreign_key: true
      t.string :message
      t.string :resume_title
      t.string :comment_content
      t.boolean :read

      t.timestamps
    end
  end
end
