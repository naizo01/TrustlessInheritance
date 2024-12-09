"use client";

export function Footer({
  scrollToSection,
}) {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">four next</h3>
            <p className="text-gray-400">
              トラストレス相続アプリケーション
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">four nextとは？</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("features")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  特徴
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("how-to-use")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  使い方
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("cautions")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  注意事項
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">アプリケーション</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/alice"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  相続する人
                </a>
              </li>
              <li>
                <a
                  href="/bob"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  受け取る人
                </a>
              </li>
              <li>
                <a
                  href="/charlie"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  検索
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <a
            href="https://github.com/naizo01/TrustlessInheritance"
            className="text-gray-400 hover:text-white transition-colors block mb-2"
          >
            GitHub
          </a>
          <p className="text-gray-400">
            © 2024 four next. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}