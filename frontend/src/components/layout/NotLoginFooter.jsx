import { Link } from 'react-router-dom';
import { FaXTwitter } from 'react-icons/fa6';
import { FaGithub } from 'react-icons/fa';

export default function HomePageFooter() {
  return (
    <footer className="bg-stone-900 text-stone-400 py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-3 text-sm">
        
        {/* 上段：リンク群 */}
        <div className="flex flex-wrap justify-center gap-6">
          <Link to="/contact" className="hover:text-white">お問い合わせ</Link>
          <Link to="/termsofservice" className="hover:text-white">利用規約</Link>
          <Link to="/privacypolicy" className="hover:text-white">プライバシーポリシー</Link>
          <a
            href="https://twitter.com/riku_010101"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="hover:text-white flex items-center gap-1"
          >
            <FaXTwitter size={18} />
          </a>
          <a
            href="https://github.com/riku-work10"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-white flex items-center gap-1"
          >
            <FaGithub size={18} />
          </a>
        </div>

        {/* 下段：著作権表示 */}
        <div className="text-xs text-center text-stone-500 mt-2">
          © {new Date().getFullYear()} ハルカミライ履歴書
        </div>
      </div>
    </footer>
  );
}
