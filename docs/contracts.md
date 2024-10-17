## **InheritanceFactory**


 - `mapping(address => address) public ownerToProxy;` : オーナーアドレス -> プロキシアドレスのマッピング


`InheritanceFactory`は、ユーザーごとに `InheritanceContract` のプロキシをデプロイし、そのプロキシを初期化します。

```solidity
function createProxy() external {
    // 各ユーザーのプロキシをデプロイし初期化を行う
}
```

---

## **InheritanceContract**

`InheritanceContract`は、各ユーザー（Alice）の相続管理を行います。

- **Aliceが登録するハッシュ値**:
   - `Aliceアドレス + Bobアドレス + スマートコントラクトアドレス`
   - `register`関数でハッシュを登録します。

- **署名の検証**:
   - 署名は「`Aliceアドレス + Bobアドレス + nonce`」で生成され、リプレイアタックを防ぐために、nonceはスマートコントラクトで管理されます。

### 変数
全ての変数はERC7201に準拠します。

- `address owner`: Aliceのアドレス
- `bytes32 hash`: AliceがBobのアドレスと組み合わせて生成したハッシュ
- `bool isLocked`: 相続が進行中かどうかを管理
- `bool isKilled`: 相続がキャンセルされた場合に、コントラクトが無効化されているかどうかを管理
- `uint256 lockTime`: トークンのロック期間（nヶ月またはn年）
- `uint256 nance`: 署名の再利用防止のためのnonce
- `address[] public approvedTokens`: `approve`したトークンを保存する配列

### 関数

#### 1. **initialize**
Aliceがハッシュ値とロック期間を設定します。プロキシデプロイ時に一度だけ実行可能な関数です。

```solidity
function initialize(bytes32 _hash, uint256 _lockTime, address[] calldata _approvedTokens) external {
    // 初期化処理
}
```

#### 2. **addApprovedTokens**
`register`以外にも、新しいトークンを追加できる関数です。

```solidity
function addApprovedTokens(address[] calldata _tokens) external {
    // トークンを追加
}
```

#### 3. **initiateInheritance**
Bobがスマートコントラクトにトークンをロックして相続プロセスを開始するための関数です。署名による認証も行われます。

```solidity
function initiateInheritance(
    address[] calldata _tokens, 
    uint256[] calldata _amounts,
    bytes32 signedHash,
    uint8 v, 
    bytes32 r, 
    bytes32 s
) external {
    // 相続開始
}
```

#### 4. **cancelInheritance**
ロック期間中にAliceがトークンを引き出すための関数です。

```solidity
function cancelInheritance(address[] calldata _tokens) external {
    // 相続キャンセル処理
}
```

#### 5. **withdrawTokens**
ロック期間終了後、Bobがトークンを引き出すための関数です。

```solidity
function withdrawTokens(address[] calldata _tokens) external {
    // トークン引き出し処理
}
```