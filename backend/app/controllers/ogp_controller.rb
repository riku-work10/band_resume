class OgpController < ApplicationController
def resume
  @resume = Resume.find_by(id: params[:id])
  return render plain: 'Not found', status: :not_found unless @resume

  if bot_request?(request.user_agent)
    Rails.logger.info "@resume: #{@resume.inspect}"
    begin
      html = render_to_string(template: 'ogp/resume', layout: false)
      Rails.logger.info "[OGP HTML length] #{html.length}"
      Rails.logger.info "[OGP HTML snippet] #{html[0..500]}"
      render html: html.html_safe
    rescue => e
      Rails.logger.error "Render error: #{e.message}"
      render plain: 'Render error', status: :internal_server_error
    end
  else
    redirect_to "#{ENV.fetch('VERCEL_URL', nil)}/resumes/#{@resume.id}", allow_other_host: true
  end
end



  private

  def bot_request?(user_agent)
    # 有名なクローラーの一例
    bot_keywords = %w[
      Twitterbot facebookexternalhit Slackbot
      Discordbot LinkedInBot TelegramBot WhatsApp
    ]
    bot_keywords.any? { |keyword| user_agent.to_s.include?(keyword) }
  end
end
