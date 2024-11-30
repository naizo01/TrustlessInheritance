pragma circom 2.1.4;

include "node_modules/circomlib/circuits/poseidon.circom";

template PasswordValidator() {
    signal input in;
    signal input hash;
    
    signal quotients[20];
    signal remainders[20];
    signal isZeros[20];
    signal digitCount;
    signal allSameDigits;
    signal validPassword;
    
    quotients[0] <== in;
    
    for (var i = 0; i < 19; i++) {
        quotients[i+1] <-- quotients[i] \ 10;
        remainders[i] <-- quotients[i] % 10;
        
        quotients[i] === quotients[i+1] * 10 + remainders[i];
        
        isZeros[i] <-- (quotients[i+1] == 0) * 1;
        isZeros[i] * (1 - isZeros[i]) === 0;
    }
    
    isZeros[19] <-- (quotients[19] == 0) * 1;
    isZeros[19] * (1 - isZeros[19]) === 0;
    
    var count = 1;
    for (var i = 0; i < 19; i++) {
        count = count + (1 - isZeros[i]);
    }
    digitCount <== count;
    
    // 同じ数字が連続しているかチェック
    var isAllSame = 1;
    for (var i = 0; i < 18; i++) {
        if (isZeros[i] == 0) {
            isAllSame = isAllSame * (remainders[i] == remainders[i+1]);
        }
    }
    allSameDigits <-- isAllSame;
    
    // 8桁より大きく、かつ全て同じ数字でない場合はtrue
    validPassword <-- (digitCount > 8 && allSameDigits == 0) * 1;
    validPassword * (1 - validPassword) === 0;

    // パスワードが有効な場合のみハッシュ値を検証
    component poseidon = Poseidon(1);
    poseidon.inputs[0] <== in;
    hash === poseidon.out;
}

component main {public [hash]} = PasswordValidator();