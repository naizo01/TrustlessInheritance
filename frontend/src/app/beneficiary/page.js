import Link from "next/link";
import Button from "@/app/_components/Button";

export const metadata = {
  title: "相続人管理",
};

export default function Page() {
  return (
    <main className="mt-24 w-4/5 mx-auto">
      <div className="relative z-10 text-left">
        <h3 className="text-4xl text-primary-800 mb-10 tracking-tight font-normal">
          相続人 main page
        </h3>
      </div>
      <div>
        <p className="text-lg font-normal">
          相続人の相続手続き実施の承認、及び承認後の相続手続きを管理します。
        </p>
      </div>
      <div className="relative z-10 text-right mt-10">
        <Button to="/search" type="primary" disabled={false}>
          被相続人アドレス検索
        </Button>
      </div>
    </main>
  );
}
