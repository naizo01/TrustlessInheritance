// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

/**
 * @title InheritanceContract Schema v0.1.0
 */
library Schema {

    struct ZKProof {
        uint[2] pA;
        uint[2][2] pB;
        uint[2] pC;
        uint[2] pubSignals;
    }

    /// @custom:storage-location erc7201:InheritanceContract.InheritanceState
    struct InheritanceState {
        address owner; // Alice のアドレス
        address factory; // factoryコントラクト のアドレス
        uint hash; // 生成したハッシュ
        bool isLocked; // 相続が進行中かどうかを管理
        bool isKilled; // 相続がキャンセルされた場合に、コントラクトが無効化されているかどうかを管理
        uint256 lockDuration; // トークンのロック期間（n ヶ月または n 年）
        uint256 lockStartTime; // トークンロックが開始された日時
        uint256 nonce; // 署名の再利用防止のための nonce
        address[] approvedTokens; // `approve`したトークンを保存する配列
        mapping(bytes32 => bool) usedProofs; // 利用済みの `proof` を記録し、再利用を防ぐためのマッピング
    }
}