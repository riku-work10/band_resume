class ResumeLike < ApplicationRecord
  belongs_to :user
  belongs_to :resume

  validates :user_id, uniqueness: { scope: :resume_id }
  after_create :send_like_notification

  private

  def send_like_notification
    Notification.create_notification(
      resume.user,
      "#{user.name}があなたの#{resume.title}にいいねしました！",
      resume.title,
      resume.id
    )

    # ActionCableでリアルタイム通知を送信
    NotificationChannel.broadcast_to(resume.user,
                                     { message: "#{user.name}があなたの#{resume.title}にいいねしました！", resume_id: resume.id })
    # broadcast_toは（送信相手,送信データになっている）
  end
end
