class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "open_chat"
  end

  def speak(data)
    message = Message.create!(
      content: data['message'],
      user: current_user
    )

    ActionCable.server.broadcast("open_chat", {
    message: message.as_json(only: [:id, :content, :created_at]).merge(
      user: { 
        uid: message.user.uid, 
        name: message.user.name
      }
    )
  })
end

  def edit_message(data)
    message = Message.find(data['message_id'])
    if message.update(content: data['new_content'])
      ActionCable.server.broadcast("open_chat", {
        action: 'edit',
        message_id: message.id,
        new_content: message.content
      })
    end
  end

  # 削除処理
  def delete_message(data)
    message = Message.find(data['message_id'])
    message.destroy
    ActionCable.server.broadcast("open_chat", {
      action: 'delete',
      message_id: message.id
    })
  end

  private

  def render_message(message)
    ApplicationController.renderer.render(partial: 'messages/message', locals: { message: message })
  end
end
