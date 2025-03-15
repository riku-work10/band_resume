import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-gray-100 text-gray-800 p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      {/* プライバシーポリシー */}
      <section>
        <h2 className="text-2xl font-bold text-orange-500 mb-4">プライバシーポリシー</h2>

        <p className="mb-4">
          ハルカミライ履歴書（以下「本サービス」）は、ユーザーの個人情報の取扱いについて以下の通り定めます。
        </p>

        <h3 className="text-xl font-semibold text-orange-400 mb-2">第1条（個人情報の取得）</h3>
        <p className="mb-4">
          本サービスでは、以下の個人情報を取得します：
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li>ユーザー名（ニックネーム、ペンネームを含む）</li>
          <li>メールアドレス</li>
          <li>プロフィール画像</li>
          <li>履歴書の内容（ライブ情報、SNSリンク等）</li>
          <li>端末情報（OS、IPアドレス、デバイス識別子）</li>
        </ul>

        <h3 className="text-xl font-semibold text-orange-400 mb-2">第2条（個人情報の利用目的）</h3>
        <p className="mb-4">
          取得した個人情報は以下の目的に使用します：
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li>ユーザー認証、サービス提供</li>
          <li>履歴書作成、管理、改善のため</li>
          <li>ユーザーからのお問い合わせ対応</li>
        </ul>

        <h3 className="text-xl font-semibold text-orange-400 mb-2">第3条（個人情報の管理）</h3>
        <p className="mb-4">
          個人情報は、安全に管理し、外部から不正アクセスされないように最新の技術を使用して保護します。
        </p>

        <h3 className="text-xl font-semibold text-orange-400 mb-2">第4条（第三者提供）</h3>
        <p className="mb-4">
          当サービスは、ユーザーの個人情報を第三者に提供しません。ただし、以下の場合は除きます：
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li>ユーザーの同意がある場合</li>
          <li>法令に基づく場合</li>
          <li>サービス提供に必要な範囲で外部に委託する場合</li>
        </ul>

        <h3 className="text-xl font-semibold text-orange-400 mb-2">第5条（ユーザーの権利）</h3>
        <p className="mb-4">
          ユーザーは、自己の個人情報の開示、訂正、削除、利用停止を請求する権利を有します。
        </p>

        <h3 className="text-xl font-semibold text-orange-400 mb-2">第6条（Cookieの使用）</h3>
        <p className="mb-4">
          本サービスは、Google Analyticsなどのツールを使用して、アクセス解析を行うためにCookieを利用しています。
        </p>

        <h3 className="text-xl font-semibold text-orange-400 mb-2">第7条（プライバシーポリシーの変更）</h3>
        <p className="mb-4">
          本ポリシーは、法令改正やサービス内容の変更に応じて適宜見直しを行います。変更がある場合は、公式ウェブサイト上で告知します。
        </p>

        <h3 className="text-xl font-semibold text-orange-400 mb-2">第8条（お問い合わせ）</h3>
        <p className="mb-4">
          個人情報に関するお問い合わせは、お問い合わせフォームよりご連絡ください。
        </p>

        <p className="text-right text-gray-600">2025年3月15日制定</p>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
