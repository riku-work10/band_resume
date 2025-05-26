class Ogp::ResumesController < ApplicationController

  def show
    @resume = Resume.find(params[:id])
    render template: 'ogp/resumes/show', layout: false
  end
end