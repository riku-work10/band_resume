class CreateResumeItems < ActiveRecord::Migration[7.1]
  def change
    create_table :resume_items do |t|
      t.string :content
      t.integer :position
      t.references :resume_section, null: false, foreign_key: true

      t.timestamps
    end
  end
end
