class OgpController < ApplicationController
  def resume
    @resume = Resume.find_by(id: params[:id])
    return render plain: "Not found", status: 404 unless @resume

    html = <<-HTML
      <!DOCTYPE html>
      <html>
      <head>
        <meta property="og:title" content="テスト" />
        <meta property="og:description" content="テストです" />
        <meta property="og:image" content="https://bandresume.s3.ap-northeast-1.amazonaws.com/profile_images/default_ogp.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body>
        <p>動作確認</p>
      </body>
      </html>
    HTML

    render html: html.html_safe, layout: false
  end
end
