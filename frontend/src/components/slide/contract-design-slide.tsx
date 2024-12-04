import { Card } from "@/components/ui/card";
import {
  Factory,
  FileCodeIcon as FileContract,
} from "lucide-react";

const ContractDesignSlide = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 mb-20 space-y-8 animate-fadeIn">
      <h2 className="text-3xl font-bold text-center mb-8">コントラクト設計</h2>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 space-y-6">
          <Card className="border-none p-6 bg-purple-50 dark:bg-purple-900/20">
            <div className="flex items-center mb-4">
              <Factory className="w-8 h-8 text-purple-600 mr-3" />
              <h3 className="text-xl font-bold">①InheritanceFactory</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              InheritanceFactoryは、各ユーザーごとに相続管理コントラクト（InheritanceContract）のプロキシをデプロイし、初期化するためのコントラクトです。これにより、ユーザーごとに独立した相続設定を構築できます。
            </p>
          </Card>

          <Card className="border-none p-6 bg-blue-50 dark:bg-blue-900/20">
            <div className="flex items-center mb-4">
              <FileContract className="w-8 h-8 text-blue-600 mr-3" />
              <h3 className="text-xl font-bold">②InheritanceContract</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              InheritanceContractは、ERC7546
              により構築されたコントラクトで、相続者の確認とトークン相続の処理を担います。安全性を高めるために1ユーザーごとに専用のプロキシが割り当てられ、他のユーザーとapprove
              先が競合することなくトークンが管理されます。
            </p>
          </Card>
        </div>

        <div className="w-full md:w-1/2">
          <Card className="border-none overflow-hidden h-full bg-gray-50 dark:bg-gray-800">
            <div className="p-6">
              <img
                src="/contract.png"
                alt="コントラクト設計図"
                className="w-full h-full object-contain"
              />
            </div>
          </Card>
        </div>
      </div>

      <Card className="border-none p-6 bg-green-50 dark:bg-green-900/20">
        <h3 className="text-xl font-bold mb-4">関数コントラクト</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            <strong>initialize:</strong> 相続元の入力内容をもとに、プロキシデプロイ時に相続設定を行います。相続元が入力した秘密情報とロック期間を相続設定に反映させます。
          </li>
          <li>
            <strong>addApprovedTokens:</strong> 相続元が相続管理コントラクトに転送権限を与えたトークンをブロックチェーン上に記録します。
          </li>
          <li>
            <strong>initiateInheritance:</strong> 相続の申請が正しい相続先によるものであると、ZK証明によって検証された場合、相続元のトークンを相続管理コントラクトに転送します。相続元の提出した秘密情報が、相続先が登録したものと一致するかどうかをZK証明を用いて検証することで、正しい相続先であるかを判定します。
          </li>
          <li>
            <strong>withdrawTokens:</strong> initiateInheritanceが実行されてから、相続元が定めた期間が終了している場合、相続管理コントラクトから相続先へトークンを転送します。相続元が定めた期間が終了していない場合は、相続先にトークンは転送されません。
          </li>
          <li>
            <strong>cancelInheritance:</strong> 相続管理コントラクトが保有するトークンを相続元に転送します。
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default ContractDesignSlide;