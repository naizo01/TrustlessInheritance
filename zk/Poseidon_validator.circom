pragma circom 2.0.0;

include "node_modules/circomlib/circuits/poseidon.circom";
include "node_modules/circomlib/circuits/comparators.circom";

template PoseidonValidator(n) {
    signal input in[n];
    signal input hash;

    // 非ゼロ要素のカウント
    signal isNonZero[n];
    signal nonZeroCount;
    // 累積和を格納する配列
    signal nonZeroCountArray[n];

    // コンポーネントの配列を宣言
    component isZero[n];

    for (var i = 0; i < n; i++) {
        // 各要素がゼロかどうかをチェック
        isZero[i] = IsZero();
        isZero[i].in <== in[i];
        // 非ゼロであれば1、ゼロであれば0
        isNonZero[i] <== 1 - isZero[i].out;

        // 累積和を計算
        if (i == 0) {
            nonZeroCountArray[i] <== isNonZero[i];
        } else {
            nonZeroCountArray[i] <== nonZeroCountArray[i - 1] + isNonZero[i];
        }
    }

    // 最終的な非ゼロ要素の数を取得
    nonZeroCount <== nonZeroCountArray[n - 1];

    // 非ゼロ要素の数が8より大きいことを確認
    component isGreaterThan = GreaterThan(32);
    isGreaterThan.in[0] <== nonZeroCount;
    isGreaterThan.in[1] <== 8;
    assert(isGreaterThan.out == 1);

    // 最初の非ゼロ要素を取得
    signal refValueArray[n];
    signal refFoundArray[n];
    signal isFirstNonZero[n];

    // 初期化
    // i = 0 の場合
    isFirstNonZero[0] <== isNonZero[0];
    refValueArray[0] <== isFirstNonZero[0] * in[0];
    refFoundArray[0] <== isFirstNonZero[0];

    // i > 0 の場合
    for (var i = 1; i < n; i++) {
        isFirstNonZero[i] <== isNonZero[i] * (1 - refFoundArray[i - 1]);
        refValueArray[i] <== refValueArray[i - 1] + isFirstNonZero[i] * in[i];
        refFoundArray[i] <== refFoundArray[i - 1] + isFirstNonZero[i];
    }

    // 最終的な値を取得
    signal refValue;
    signal refFound;
    refValue <== refValueArray[n - 1];
    refFound <== refFoundArray[n - 1];

    // 全ての要素が同じでないことを確認
    signal allSameArray[n];
    component isEqual[n];
    signal isEqualOrZero[n];

    for (var i = 0; i < n; i++) {
        isEqual[i] = IsEqual();
        isEqual[i].in[0] <== in[i];
        isEqual[i].in[1] <== refValue;

        // 論理ORを算術的に表現: isEqualOrZero[i] = isEqual[i].out OR isZero[i].out
        isEqualOrZero[i] <== isEqual[i].out + isZero[i].out - isEqual[i].out * isZero[i].out;

        // 累積積を計算
        if (i == 0) {
            allSameArray[i] <== isEqualOrZero[i];
        } else {
            allSameArray[i] <== allSameArray[i - 1] * isEqualOrZero[i];
        }
    }

    // 最終的な値を取得
    signal allSame;
    allSame <== allSameArray[n - 1];

    // 全ての要素が同じかゼロである場合、allSameは1になる
    assert(allSame == 0); // 全て同じでないことを確認

    // Poseidonハッシュ計算
    component poseidon = Poseidon(n);
    for (var i = 0; i < n; i++) {
        poseidon.inputs[i] <== in[i];
    }
    hash === poseidon.out;
}

component main {public [hash]} = PoseidonValidator(16);
