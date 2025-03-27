class CreateEventComments < ActiveRecord::Migration[7.1]
  def change
    create_table :event_comments do |t|
      t.references :user, null: false, foreign_key: true
      t.references :event, null: false, foreign_key: true
      t.text :content

      t.timestamps
    end
  end
end
