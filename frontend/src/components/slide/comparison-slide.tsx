import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/tableSlide";
import { CheckCircle, XCircle, MinusCircle } from "lucide-react";

const ComparisonSlide = () => {
  const comparisonData = [
    {
      item: "管理方式",
      casa: "マルチシグ",
      delegacy: "信用会社",
      fourNext: "スマートコントラクト",
    },
    { item: "第三者依存", casa: false, delegacy: false, fourNext: true },
    { item: "資産安全性", casa: true, delegacy: true, fourNext: true },
    { item: "透明性", casa: true, delegacy: false, fourNext: true },
    // { item: "価格", casa: "年間4万円〜", delegacy: "年間2万円〜", fourNext: "ガス代のみ" },
  ];

  const renderCheckmark = (value: boolean | string) => {
    if (value === true)
      return <CheckCircle className="w-6 h-6 text-green-500" />;
    if (value === false) return <XCircle className="w-6 h-6 text-red-500" />;
    if (value === "partial")
      return <MinusCircle className="w-6 h-6 text-yellow-500" />;
    return value;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-3 mb-20 space-y-4 animate-fadeIn">
      <h2 className="text-3xl font-bold text-center mb-6">サービス比較</h2>
      <Card className="border-none p-6">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/4">
                  <div className="flex items-center justify-center space-x-2">
                    比較項目
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center justify-center space-x-2">
                    Casa
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center justify-center space-x-2">
                    Delegacy
                  </div>
                </TableHead>
                <TableHead className="bg-blue-100 dark:bg-blue-800">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="font-bold">four next</span>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium text-center">
                    {row.item}
                  </TableCell>
                  <TableCell className="text-center mx-auto">
                    {renderCheckmark(row.casa)}
                  </TableCell>
                  <TableCell className="text-center">
                    {renderCheckmark(row.delegacy)}
                  </TableCell>
                  <TableCell className="bg-blue-50 dark:bg-blue-900/50 font-semibold text-center">
                    {renderCheckmark(row.fourNext)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
      <Card className="border-none p-6 bg-blue-50 dark:bg-blue-900/20">
        <h3 className="text-xl font-semibold mb-4">four nextの優位性:</h3>
        <ol className="list-decimal list-inside space-y-4">
          <li>
            <span className="font-semibold">完全な自己管理</span>
            <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
              <li>第三者機関に依存しない</li>
              <li>ユーザー自身による完全なコントロール</li>
            </ul>
          </li>
          <li>
            <span className="font-semibold">使い慣れたツール</span>
            <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
              <li>既存のMetamaskなどのEOAウォレットをそのまま活用可能</li>
            </ul>
          </li>
          <li>
            <span className="font-semibold">透明性の確保</span>
            <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
              <li>スマートコントラクトによる明確なプロセス</li>
              <li>全ての処理が検証可能</li>
            </ul>
          </li>
        </ol>
      </Card>
    </div>
  );
};

export default ComparisonSlide;
