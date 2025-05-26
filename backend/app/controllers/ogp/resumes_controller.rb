class Ogp::ResumesController < ApplicationController
  skip_before_action :authenticate_user! # これが必須

  def show
    @resume = Resume.find(params[:id])
    render template: 'ogp/resumes/show', layout: false
  end
end