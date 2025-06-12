require 'rails_helper'

RSpec.describe User, type: :model do
  before { I18n.locale = :en }

  describe "バリデーション" do
    it "有効な属性なら有効" do
      user = build(:user)
      expect(user).to be_valid
    end

    it "emailがないと無効" do
      user = build(:user, email: nil)
      expect(user).not_to be_valid
      expect(user.errors[:email]).to include("can't be blank")
    end

    it "emailが重複すると無効" do
      create(:user, email: "duplicate@example.com")
      user = build(:user, email: "duplicate@example.com")
      expect(user).not_to be_valid
      expect(user.errors[:email]).to include("has already been taken")
    end
  end

  describe "アソシエーション" do
    it "resumesを複数持てる" do
      user = create(:user)
      resume1 = create(:resume, user: user)
      resume2 = create(:resume, user: user)
      expect(user.resumes).to include(resume1, resume2)
    end

    it "resume_commentsを複数持てる" do
      user = create(:user)
      comment = create(:resume_comment, user: user)
      expect(user.resume_comments).to include(comment)
    end
  end
end