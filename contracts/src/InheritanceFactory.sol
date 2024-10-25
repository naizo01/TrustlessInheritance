// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

contract InheritanceFactory {
    // オーナーアドレス -> プロキシアドレスのマッピング
    mapping(address => address) public ownerToProxy;

    // 各ユーザーのプロキシをデプロイし初期化を行う
    function createProxy() external {
        // プロキシデプロイと初期化のロジックをここに実装
    }
}