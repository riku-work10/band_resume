Aws.config.update({
                    region: 'ap-northeast-1', # 東京リージョンの例
                    credentials: Aws::Credentials.new(ENV.fetch('AWS_ACCESS_KEY_ID', nil),
                                                      ENV.fetch('AWS_SECRET_ACCESS_KEY', nil))
                  })
