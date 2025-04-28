class ResumeComment < ApplicationRecord
  belongs_to :user
  belongs_to :resume

  validates :content, presence: true, length: { maximum: 500 }

  after_create :send_comment_notification

  private

  def send_comment_notification
    Notification.create_notification(
      resume.user, 
      "#{user.name} commented on your resume #{resume.title}: #{content}",
      resume.title,
      resume.id,
      content
    )

    # ActionCableでリアルタイム通知を送信
    NotificationChannel.broadcast_to(resume.user, { message: "#{user.name} commented on your resume #{resume.title}", comment_content: content,resume_id: resume.id })
  end
end
