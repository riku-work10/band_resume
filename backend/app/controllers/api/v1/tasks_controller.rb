class Api::V1::TasksController < ApplicationController
  before_action :authenticate_api_v1_user!
  def index
    tasks = Task.all
    render json: tasks
  end
end
