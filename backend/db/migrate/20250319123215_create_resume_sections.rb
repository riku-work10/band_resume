class CreateResumeSections < ActiveRecord::Migration[7.1]
  def change
    create_table :resume_sections do |t|
      t.string :title
      t.integer :position
      t.references :resume, null: false, foreign_key: true

      t.timestamps
    end
  end
end
