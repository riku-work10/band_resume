class Api::V1::S3Controller < ApplicationController
  require 'cgi'
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

 def delete_object
  object_key = CGI.unescape(params[:object_key])  # URLデコードする

  s3 = Aws::S3::Resource.new(region: ENV['AWS_REGION'])
  bucket = s3.bucket(ENV['S3_BUCKET_NAME'])
  # 対象オブジェクトを読み込む
  obj = bucket.object(object_key)

  if obj.exists?
    obj.delete
    render json: { message: '削除成功' }, status: :ok
  else
    render json: { error: 'オブジェクトが見つかりません' }, status: :not_found
  end
rescue => e
  render json: { error: e.message }, status: :internal_server_error
end
end