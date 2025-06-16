class OgpController < ApplicationController
  def resume
    @resume = Resume.find_by(id: params[:id])
    return render plain: 'Not found', status: :not_found unless @resume

    if bot_request?(request.user_agent)
      # レンダリング結果を取得してログ出力
      html = render_to_string(template: 'ogp/resume', layout: false)
      Rails.logger.info "[OGP HTML]\n#{html}"
      render html: html.html_safe
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
