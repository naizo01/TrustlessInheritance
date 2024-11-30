pragma circom 2.1.4;

template PasswordValidator() {
    signal input in;
    signal output isValid;
    
    signal quotients[20];
    signal remainders[20];
    signal isZeros[20];
    signal digitCount;
    signal allSameDigits;
    
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
        if (isZeros[i] == 0) {  // 桁が存在する場合のみチェック
            isAllSame = isAllSame * (remainders[i] == remainders[i+1]);
        }
    }
    allSameDigits <-- isAllSame;
    
    // 8桁より大きく、かつ全て同じ数字でない場合はtrue
    isValid <-- (digitCount > 8 && allSameDigits == 0) * 1;
    isValid * (1 - isValid) === 0;
}

component main = PasswordValidator();