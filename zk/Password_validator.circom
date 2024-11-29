pragma circom 2.0.0;

include "node_modules/circomlib/circuits/comparators.circom";

template LengthValidator(N, minLen) {
    signal input in[N]; // ASCII コードの配列
    signal output len;  // 文字列の長さ

    signal isNonZero[N];
    signal lenArray[N];
    component isZero[N];

    for (var i = 0; i < N; i++) {
        isZero[i] = IsZero();
        isZero[i].in <== in[i];
        isNonZero[i] <== 1 - isZero[i].out;

        if (i == 0) {
            lenArray[i] <== isNonZero[i];
        } else {
            lenArray[i] <== lenArray[i - 1] + isNonZero[i];
        }
    }

    len <== lenArray[N - 1];

    // len >= minLen を確認
    var lenBits = 6; // N = 32 の場合、len は最大 32
    component ge = GreaterEqThan(lenBits);
    ge.in[0] <== len;
    ge.in[1] <== minLen;
    ge.out === 1;
}

template PasswordValidator(N, minLen) {
    signal input in[N]; // ASCII コードの配列

    // 長さの検証
    component lengthValidator = LengthValidator(N, minLen);
    for (var i = 0; i < N; i++) {
        lengthValidator.in[i] <== in[i];
    }
}

component main = PasswordValidator(32, 8);
