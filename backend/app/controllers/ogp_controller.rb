class OgpController < ActionController::Base
  def resume
    @resume = Resume.find_by(id: params[:id])
    return render plain: "Not found", status: 404 unless @resume

    if bot_request?(request.user_agent)
      # botならOGP付きHTMLを表示（metaタグが必要）
      render template: "ogp/resume", layout: false
    else
      # 人間ユーザーならReact側に即リダイレクト
      redirect_to "#{ENV['VERCEL_URL']}/resumes/#{@resume.id}", allow_other_host: true
    end
  end

  private

  def bot_request?(user_agent)
    # 有名なクローラーの一例
    bot_keywords = [
      'Twitterbot', 'facebookexternalhit', 'Slackbot',
      'Discordbot', 'LinkedInBot', 'TelegramBot', 'WhatsApp'
    ]
    bot_keywords.any? { |keyword| user_agent.to_s.include?(keyword) }
  end
end
