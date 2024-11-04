import Link from "next/link";

export const metadata = {
  title: "被相続人検索",
};

export default function Page() {
  return (
    <main className="mt-24 w-4/5 mx-auto">
      <div className="relative z-10 text-left">
        <h3 className="text-4xl text-primary-800 mb-10 tracking-tight font-normal">
          被相続人検索
        </h3>
      </div>
      <div>
        <p className="text-lg font-normal">被相続人検索</p>
      </div>
    </main>
  );
}
