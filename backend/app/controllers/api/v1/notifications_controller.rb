module Api
  module V1
    class NotificationsController < ApplicationController
      before_action :set_notification, only: [:read]

      # 通知一覧
      def index
        @notifications = current_api_v1_user.notifications.order(created_at: :desc)
        render json: @notifications
      end

      # ここが追加！
      def read
        if @notification.update(read: true)
          render json: { message: 'Notification marked as read' }, status: :ok
        else
          render json: { error: 'Failed to mark notification as read' }, status: :unprocessable_entity
        end
      end

      def read_all
        current_api_v1_user.notifications.update_all(read: true)
        head :no_content
      end

      private

      def set_notification
        @notification = current_api_v1_user.notifications.find(params[:id])
      end
    end
  end
end
