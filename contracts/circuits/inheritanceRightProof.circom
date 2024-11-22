pragma circom 2.1.9;

include "./incrementalMerkleTree.circom";
include "../node_modules/circomlib/circuits/poseidon.circom";

template SecretMembershipVerifier(levels) {
    // Public input
    signal input root;        // マークルツリーのルート
    
    // Private input
    signal private input secret;   // 秘密情報
    signal private input path_elements[levels][1];  // マークルパス
    signal private input path_index[levels];        // パスのインデックス
    
    // Output
    signal output isMember;   // メンバーシップの結果

    // 秘密情報をハッシュ化
    component hasher = Poseidon(1);
    hasher.inputs[0] <== secret;
    
    // LeafExistsを使用してメンバーシップを確認
    component membershipChecker = LeafExists(levels);
    membershipChecker.leaf <== hasher.out;  // ハッシュ化された秘密情報
    membershipChecker.root <== root;        // 公開されているルート
    
    // パス情報を接続
    for (var i = 0; i < levels; i++) {
        membershipChecker.path_elements[i][0] <== path_elements[i][0];
        membershipChecker.path_index[i] <== path_index[i];
    }
    
    // マークルツリーの検証結果に基づいてbooleanを出力
    isMember <== (1 - (root - membershipChecker.root));
}

component main {public [root]} = SecretMembershipVerifier(4);  // 例として4レベルのツリーを使用