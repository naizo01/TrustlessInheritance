import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ConnectKitButton } from "connectkit";

interface HeaderProps {
  scrolled: boolean;
  scrollToSection: (id: string) => void;
}

export function Header({ scrolled, scrollToSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-md" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white"
        >
          暗号資産相続アプリ
        </Link>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="ghost"
          size="sm"
          className="sm:hidden"
        >
          <Menu className="h-6 w-6" />
        </Button>
        <nav className="hidden sm:block">
          <ul className="flex space-x-6 items-center">
            <li>
              <button
                onClick={() => scrollToSection("features")}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                特徴
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("how-to-use")}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                使い方
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("cautions")}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                注意事項
              </button>
            </li>
            <li>
              <Link
                href="/alice"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                被相続人用
              </Link>
            </li>
            <li>
              <Link
                href="/bob"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                相続人用
              </Link>
            </li>
            <li>
              <ConnectKitButton />
            </li>
          </ul>
        </nav>
      </div>
      {isOpen && (
        <nav className="sm:hidden bg-white dark:bg-gray-800 shadow-lg">
          <ul className="flex flex-col space-y-2 p-4">
            <li>
              <button
                onClick={() => scrollToSection("features")}
                className="block w-full text-left py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                特徴
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("how-to-use")}
                className="block w-full text-left py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                使い方
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection("cautions")}
                className="block w-full text-left py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                注意事項
              </button>
            </li>
            <li>
              <Link
                href="/alice"
                className="block w-full text-left py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                被相続人用
              </Link>
            </li>
            <li>
              <Link
                href="/bob"
                className="block w-full text-left py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                相続人用
              </Link>
            </li>
            <li>
              <ConnectKitButton />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
