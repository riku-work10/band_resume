class OgpController < ApplicationController
  def resume
    @resume = Resume.find_by(id: params[:id])
    return render plain: 'Not found', status: :not_found unless @resume

    if bot_request?(request.user_agent)
      # botならOGP付きHTMLを表示（metaタグが必要）
      render template: 'ogp/resume', layout: false
    else
      # 人間ユーザーならReact側に即リダイレクト
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
