class OgpController < ApplicationController
  def resume
    @resume = Resume.find_by(id: params[:id])
    return render plain: "Not found", status: 404 unless @resume

    render template: "ogp/resume", layout: false
  end
end
