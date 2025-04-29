class Api::V1::S3Controller < ApplicationController
  def presigned_url
    # Presigned URLを生成するためにS3のリソースを作成
    s3 = Aws::S3::Resource.new
    user_id = params[:user_id]   # ユーザーIDを使って画像の保存場所を決める
    file_name = params[:filename]
    content_type = params[:content_type]
    
    # S3のオブジェクトを作成（ユーザーIDとファイル名を元に保存先を決める）
    obj = s3.bucket(ENV['S3_BUCKET_NAME']).object("profile_images/#{user_id}/#{file_name}")
    
    # 署名付きURLを生成（URLは300秒有効）
    url = obj.presigned_url(:put, expires_in: 300, content_type: content_type)
    
    # URLとファイルの公開URLを返す
    render json: { url: url, file_url: obj.public_url }
  end
end