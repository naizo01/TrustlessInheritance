import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="z-10 text-xl text-primary-100">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/donor"
            className="hover:text-accent-400 transition-colors"
          >
            被相続人
          </Link>
        </li>
        <li>
          <Link
            href="/search"
            className="hover:text-accent-400 transition-colors"
          >
            取引検索
          </Link>
        </li>
        <li>
          <Link
            href="/beneficiary"
            className="hover:text-accent-400 transition-colors"
          >
            相続人
          </Link>
        </li>
      </ul>
    </nav>
  );
}
