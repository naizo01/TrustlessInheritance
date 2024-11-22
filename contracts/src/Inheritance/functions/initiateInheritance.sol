// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Storage} from "bundle/inheritance/storage/Storage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract initiateInheritance {
    /**
     * @notice Initiates the inheritance process using ZK proof
     * @param _tokens The list of token addresses involved in the inheritance
     * @param proof The ZK proof for verification
     */
    function initiateInheritance(bytes calldata proof) external {
        Schema.InheritanceState storage state = Storage.InheritanceState();

        require(!state.isLocked, "Inheritance process already initiated");
        require(!state.isKilled, "Inheritance contract is killed");
        require(!state.usedProofs[proof], "Proof already used");

        // Verify ZK proof
        require(verifyZKProof(proof), "Invalid ZK proof");

        // Mark proof as used
        state.usedProofs[proof] = true;

        /*
        継承元はトークンの量を指定してapproveすることができるか、それともアドレスが保有している全額をロックする選択肢のみとするのか。
        継承元がトークンの量を指定してapproveする場合、"token.balanceOf(state.owner)"の代わりに、allowanceを呼び出さないと、継承元が指定した量を取得できないのでは。
        */
        /*
        現在も各トークンに転送権限が存在するかを判定・更新する記述を、入れるかどうか。
        継承元が、ロックされるまえにrevokeを行っていた場合、転送を実行することができないトークンがapprovedTokensに存在する。
        実装内容
            *approvedTokensの各要素についてallowance関数を呼び出し。
            *allowanceの戻り値が0の物は、approvedTokensから削除する。
            *allowanceの戻り値を転送するトークン量とする。
        そもそもapprovedTokensはマッピングで管理するべきか？
        上記はロックを開始する前にボブがトークン量を確認するために使う可能性があるため、別の関数としてまとめて、この関数から呼び出す形にするべきか。(その場合引数はトークンアドレス。)
        */
        // Lock tokens
        for (uint i = 0; i < state.approvedTokens.length; i++) {
            IERC20 token = IERC20(state.approvedTokens[i]);
            uint256 balance = token.balanceOf(state.owner);
            require(token.transferFrom(state.owner, address(this), balance), "Token transfer failed");
        }

        // Update state
        state.lockStartTime = block.timestamp;
        state.isLocked = true;
    }
}
