class DropSongsAndTasksTables < ActiveRecord::Migration[7.1]
  def up
    drop_table :songs
    drop_table :tasks
  end

  def down
    create_table :songs do |t|
      t.string :name, null: false
      t.timestamps
    end

    create_table :tasks do |t|
      t.string :name
      t.boolean :is_done
    end
  end
end
