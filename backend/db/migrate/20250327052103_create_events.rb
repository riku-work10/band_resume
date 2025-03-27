class CreateEvents < ActiveRecord::Migration[7.1]
  def change
    create_table :events do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title, null: false
      t.string :image
      t.text :introduction
      t.string :location
      t.date :date

      t.timestamps
    end
  end
end
