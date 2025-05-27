class OgpController < ActionController::Base
  def resume
    @resume = Resume.find_by(id: params[:id])
    return render plain: "Not found", status: 404 unless @resume

    response.headers['Content-Type'] = 'text/html'
    render template: "ogp/resume", layout: false
  end
end
