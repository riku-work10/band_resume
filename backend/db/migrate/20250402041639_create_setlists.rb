class CreateSetlists < ActiveRecord::Migration[7.1]
  def change
    create_table :setlists do |t|
      t.references :event, null: false, foreign_key: true
      t.string :title
      t.string :order

      t.timestamps
    end
  end
end
