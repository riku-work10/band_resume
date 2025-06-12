class Notification < ApplicationRecord
  belongs_to :user
  belongs_to :resume, optional: true

  # 通知を未読で作成
  def self.create_notification(user, message, resume_title, resume = nil, content = nil)
    Notification.create!(
      user: user,
      message: message,
      resume_title: resume_title,
      comment_content: content,
      resume_id: resume, # resume_idを追加
      read: false
    )
  end
end
