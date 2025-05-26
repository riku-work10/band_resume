class Ogp::ResumesController < ApplicationController
  skip_before_action :authenticate_api_v1_user!

  def show
    @resume = Resume.find(params[:id])
    render template: 'ogp/resumes/show', layout: false
  end
end