class ChangeAgeToStringInResumes < ActiveRecord::Migration[7.1]
  def change
    change_column :resumes, :age, :string
  end
end
