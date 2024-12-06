import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, AlertTriangle, Hourglass, Ban, Wallet } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAccount } from "wagmi";
import { useAliceState, ALICE_ACTIONS } from "@/pages/alice";
import useCancelInheritance from "@/hooks/useCancelInheritance";

export default function CancelInheritanceButton({ contractAddress }) {
  const { address: userAddress } = useAccount();
  const { writeContract, waitFn } = useCancelInheritance(contractAddress);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { state, dispatch } = useAliceState();

  const handleCancelConfirmation = () => {
    setIsDialogOpen(true);
  };

  const handleCancel = async () => {
    if (contractAddress) {
      setIsDialogOpen(false);
      setIsProcessing(true);
      try {
        const tx = await writeContract();
      } catch (err) {
        console.log(err);
      } finally {
        setIsProcessing(false);
      }
    } else {
      alert("Please enter a valid contract address.");
    }
  };

  useEffect(() => {
    if (waitFn.isSuccess) {
      const wrapUp = async () => {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        dispatch({ type: ALICE_ACTIONS.MOVE_SPECIFIC, payload: 100 });
      };
      wrapUp();
    }
  }, [isProcessing, waitFn]);

  const getButtonText = () => {
    if (!userAddress) return "Walletを接続ください";
    if (isProcessing || waitFn.isLoading) return "処理中...";
    if (waitFn.isSuccess) return "キャンセル完了";
    if (waitFn.isError) return "キャンセルを再実行ください";
    return "相続取り消し";
  };

  const getIcon = () => {
    if (!userAddress) return <Wallet className="mr-2 h-5 w-5" />;
    if (isProcessing || waitFn.isLoading)
      return <Hourglass className="mr-2 h-5 w-5 animate-spin" />;
    if (waitFn.isSuccess) return <Ban className="mr-2 h-5 w-5" />;
    if (waitFn.isError) return <AlertTriangle className="mr-2 h-5 w-5" />;
    return <X className="mr-2 h-5 w-5" />;
  };

  return (
    <>
      <button
        className="w-full flex items-center justify-center px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        onClick={handleCancelConfirmation}
        disabled={!userAddress || waitFn.isLoading}
      >
        {getIcon()}
        {getButtonText()}
      </button>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              相続取り消しの確認
            </DialogTitle>
            <DialogDescription>
              相続を取り消すと、登録された資産の相続が無効になります。この操作は取り消せません。本当に相続を取り消しますか？
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button type="button" variant="destructive" onClick={handleCancel}>
              はい、取り消します
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsDialogOpen(false)}
            >
              いいえ、取り消しをキャンセルします
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
