pragma circom 2.1.9;

include "../node_modules/circomlib/circuits/poseidon.circom";

template SecretMembershipVerifier() {
    // Public input
    signal input secret_hash;        // aliceが設定した秘密情報のハッシュ
    
    // Private input
    signal input secret;   // bobが入力する秘密情報（privateの位置を修正）
    
    // Output
    signal output isMember;   // メンバーシップの結果

    // 秘密情報をハッシュ化
    component hasher = Poseidon(1);
    hasher.inputs[0] <== secret;
    
    // ハッシュ値の比較結果に基づいてbooleanを出力
    isMember <== 1 - (secret_hash - hasher.out);  // .outputを.outに修正
}

component main { public [secret_hash] } = SecretMembershipVerifier();