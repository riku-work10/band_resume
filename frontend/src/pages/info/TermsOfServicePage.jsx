import React from "react";

const TermsOfServicePage = () => {
  return (
    <div className="bg-gray-100 text-gray-800 p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      {/* 利用規約 */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-orange-500 mb-4">利用規約</h2>

        <p className="mb-4">
          この利用規約(以下、「本規約」といいます。)は、ハルカミライ履歴書（以下「本サービス」）の利用条件を定めるものであり、本サービスを利用する全てのユーザー（以下「ユーザー」）に適用されます。
        </p>

        <h3 className="text-xl font-semibold text-orange-400 mb-2">第1条（適用）</h3>
        <p className="mb-4">本規約は、ハルカミライ履歴書の利用条件を定め、すべてのユーザーに適用されます。</p>

        <h3 className="text-xl font-semibold text-orange-400 mb-2">第2条（本規約への同意）</h3>
        <p className="mb-4">ユーザーは、本サービスを利用することによって、本規約に同意したものとみなされます。</p>

        <h3 className="text-xl font-semibold text-orange-400 mb-2">第3条（利用登録）</h3>
        <p className="mb-4">ユーザーは、以下の方法で利用登録を行います：</p>
        <ul className="list-disc ml-6 mb-4">
          <li>メールアドレスによる登録</li>
          <li>SNSアカウントを使用した登録（例：X（Twitter））</li>
        </ul>

        <h3 className="text-xl font-semibold text-orange-400 mb-2">第4条（利用制限）</h3>
        <p className="mb-4">当サービスは、以下の場合において利用を制限または停止することがあります：</p>
        <ul className="list-disc ml-6 mb-4">
          <li>本規約に違反した場合</li>
          <li>不正アクセスや迷惑行為が確認された場合</li>
          <li>その他、運営に支障をきたす場合</li>
        </ul>

        <h3 className="text-xl font-semibold text-orange-400 mb-2">第5条（禁止事項）</h3>
        <p className="mb-4">ユーザーは、以下の行為を行ってはなりません：</p>
        <ul className="list-disc ml-6 mb-4">
          <li>法令または公序良俗に違反する行為</li>
          <li>他のユーザーの個人情報を無断で収集・利用する行為</li>
          <li>サーバーやネットワークに不正アクセスを行う行為</li>
        </ul>

        <h3 className="text-xl font-semibold text-orange-400 mb-2">第6条（コンテンツの利用）</h3>
        <p className="mb-4">本サービスに含まれるコンテンツは、私的利用に限り使用を許可します。無断での複製や再配布は禁止します。</p>

        {/* 追加する条項 */}
        <h3 className="text-xl font-semibold text-orange-400 mb-2">第7条（サービスの変更・停止）</h3>
        <p className="mb-4">本サービスは、事前通知なしにサービス内容の変更や停止を行うことができます。また、サービス停止に伴う損害について責任を負いません。</p>

        <h3 className="text-xl font-semibold text-orange-400 mb-2">第8条（免責事項）</h3>
        <p className="mb-4">本サービスは、サービス提供にあたって完全性、正確性を保証しません。利用において生じた損害については、当サービスに故意または重大な過失がある場合を除き、一切の責任を負いません。</p>

        <h3 className="text-xl font-semibold text-orange-400 mb-2">第9条（規約の変更）</h3>
        <p className="mb-4">本規約は、当サービスの判断により随時変更することができます。変更後の規約は、当サービスに掲示した時点で効力を生じます。</p>

        <h3 className="text-xl font-semibold text-orange-400 mb-2">第10条（準拠法・管轄裁判所）</h3>
        <p className="mb-4">本規約の解釈には日本法が適用され、紛争が生じた場合、当サービスの所在地を管轄する裁判所を専属的合意管轄裁判所とします。</p>

        <p className="text-right text-gray-600">2025年3月15日制定</p>
      </section>
    </div>
  );
};

export default TermsOfServicePage;
