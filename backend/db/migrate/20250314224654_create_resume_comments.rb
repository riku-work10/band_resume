class CreateResumeComments < ActiveRecord::Migration[7.1]
  def change
    create_table :resume_comments do |t|
      t.references :user, null: false, foreign_key: true
      t.references :resume, null: false, foreign_key: true
      t.text :content

      t.timestamps
    end
  end
end
