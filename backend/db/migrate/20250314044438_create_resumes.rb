class CreateResumes < ActiveRecord::Migration[7.1]
  def change
    create_table :resumes do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title, null: false
      t.string :profile_image
      t.integer :age
      t.string :gender
      t.string :sns_url
      t.string :location
      t.text :introduction

      t.timestamps
    end
  end
end
