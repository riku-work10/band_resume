class ChangeTitleNullOnResumes < ActiveRecord::Migration[7.1]
  def change
    change_column_null :resumes, :title, true
  end
end
