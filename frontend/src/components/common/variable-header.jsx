import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ConnectKitButton } from "connectkit";

export function Header({
  scrolled,
  scrollToSection,
  showLandingPageButtons = false,
  appBadgeText = "",
  appBadgeClassName = "",
}) {
  const [isOpen, setIsOpen] = useState(false);

  const Badge = ({ text, className = "" }) => (
    <span
      className={`ml-2 px-3 py-1.5 text-sm font-semibold rounded-full border ${className}`}
    >
      {text}
    </span>
  );

  const navItems = [
    ...(showLandingPageButtons
      ? [
          { text: "特徴", onClick: () => scrollToSection("features") },
          { text: "使い方", onClick: () => scrollToSection("how-to-use") },
          { text: "注意事項", onClick: () => scrollToSection("cautions") },
        ]
      : []),
    { text: "被相続人用", href: "/alice" },
    { text: "相続人用", href: "/bob" },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <Link
            href="/"
            className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white"
          >
            暗号資産相続アプリ
          </Link>
          {appBadgeText && (
            <Badge
              text={appBadgeText}
              className={`border-blue-500 text-blue-500 font-bold ${appBadgeClassName}`}
            />
          )}
        </div>
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
            {navItems.map((item, index) => (
              <li key={index}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                  >
                    {item.text}
                  </Link>
                ) : (
                  <button
                    onClick={item.onClick}
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                  >
                    {item.text}
                  </button>
                )}
              </li>
            ))}
            <li>
              <ConnectKitButton />
            </li>
          </ul>
        </nav>
      </div>
      {isOpen && (
        <nav className="sm:hidden bg-white dark:bg-gray-800 shadow-lg">
          <ul className="flex flex-col space-y-2 p-4">
            {navItems.map((item, index) => (
              <li key={index}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="block w-full text-left py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                  >
                    {item.text}
                  </Link>
                ) : (
                  <button
                    onClick={item.onClick}
                    className="block w-full text-left py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                  >
                    {item.text}
                  </button>
                )}
              </li>
            ))}
            <li>
              <ConnectKitButton />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
