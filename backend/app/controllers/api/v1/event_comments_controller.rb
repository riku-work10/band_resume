module Api
  module V1
    class EventCommentsController < ApplicationController
      before_action :authenticate_api_v1_user!, except: [:index]

      def index
        event = Event.find(params[:event_id])
        comments = event.event_comments.includes(:user)

        render json: comments.as_json(include: { user: { only: %i[id name] } })
      end

      def create
        event = Event.find(params[:event_id])
        comment = event.event_comments.build(comment_params)
        comment.user = current_api_v1_user

        if comment.save
          render json: comment.as_json(include: { user: { only: %i[id name] } }), status: :created
        else
          render json: comment.errors, status: :unprocessable_entity
        end
      end

      def update
        comment = EventComment.find(params[:id])

        # コメントの所有者が現在のユーザーか確認
        if comment.user == current_api_v1_user
          if comment.update(comment_params)
            render json: comment.as_json(include: { user: { only: %i[id name] } })
          else
            render json: comment.errors, status: :unprocessable_entity
          end
        else
          render json: { error: 'Unauthorized' }, status: :unauthorized
        end
      end

      def destroy
        comment = EventComment.find(params[:id])
        if comment.user == current_api_v1_user
          comment.destroy
          head :no_content
        else
          render json: { error: 'Unauthorized' }, status: :unauthorized
        end
      end

      private

      def comment_params
        params.require(:event_comment).permit(:content)
      end
    end
  end
end
