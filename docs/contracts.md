

```mermaid
graph TB;
    InheritanceFactory-->|create|Proxy1;
    InheritanceFactory-->|create|Proxy2;

    Proxy1[Proxy] -->|get impl address| Dict[Dictionary];
    Proxy2[Proxy] -->|get impl address| Dict[Dictionary];

    Proxy1 -->|delegate| ERC7546:Implementation;
    Proxy2 -->|delegate| ERC7546:Implementation;


      InheritanceFactory 


    subgraph InheritanceContract

      subgraph user1
        Proxy1
      end
      subgraph user2
        Proxy2
      end

      Dict
      subgraph ERC7546:Implementation
        initialize 
        addApprovedTokens
        cancelInheritance
        initiateInheritance
        withdrawTokens

      end
    end

```

# **InheritanceFactory**

- InheritanceContract の proxy のデプロイと initialize を行うコントラクトです。

### 変数

- `mapping(address => address) public ownerToProxy;` : オーナーアドレス -> プロキシアドレスのマッピング

### 関数

`InheritanceFactory`は、ユーザーごとに `InheritanceContract` のプロキシをデプロイし、そのプロキシを初期化します。

```solidity
function createProxy() external {
    // 各ユーザーのプロキシをデプロイし初期化を行う
}
```

# **InheritanceContract**

- `InheritanceContract`は、各ユーザーの相続相手の検証と、トークンの相続処理を行うコントラクトです。
- `InheritanceContract`は、ERC7546 を使って、構築します。
- 安全性を高めるために 1 ユーザー、1proxy として構築され、他のユーザーと approve 先が競合しないようにします。

### 変数

全ての変数は ERC7201 に準拠します。

- `address owner`: Alice のアドレス
- `bytes32 hash`: 生成したハッシュ
- `bool isLocked`: 相続が進行中かどうかを管理
- `bool isKilled`: 相続がキャンセルされた場合に、コントラクトが無効化されているかどうかを管理
- `uint256 lockTime`: トークンのロック期間（n ヶ月または n 年）
- `uint256 nance`: 署名の再利用防止のための nonce
- `address[] public approvedTokens`: `approve`したトークンを保存する配列

### 共通関数コントラクト（implementation にとして登録するコントラクト）

#### 1. **initialize**

Alice がハッシュ値とロック期間を設定します。プロキシデプロイ時に一度だけ実行可能な関数です。

```solidity
function initialize(bytes32 _hash, uint256 _lockTime, address[] calldata _approvedTokens) external {
    // 初期化処理
}
```

#### 2. **addApprovedTokens**

`initialize`以外に、新しいトークンを追加できる関数です。

```solidity
function addApprovedTokens(address[] calldata _tokens) external {
    // トークンを追加
}
```

#### 3. **cancelInheritance**

ロック期間中に Alice がトークンを引き出すための関数です。

```solidity
function cancelInheritance(address[] calldata _tokens) external {
    // 相続キャンセル処理
}
```

## ZK を使った検証パターン

- **Alice が登録するハッシュ値**:

  - bob と事前に共有した`秘密情報`をハッシュ化したもの
  - `register`関数でハッシュを登録します。

- **ZK 回路**:
  - private input は`秘密情報`
  - public input はスマートコントラクトに登録されている`秘密情報のハッシュ値`
  - output は秘密情報とハッシュ値が一致しているかどうかの`bool`

### 関数コントラクト（implementation にとして登録するコントラクト）

#### 1.4. **initiateInheritanceZk**

Bob がスマートコントラクトにトークンをロックして相続プロセスを開始するための関数です。署名による認証も行われます。

```solidity
function initiateInheritanceZk(
    address[] calldata _tokens,
    bytes proof
) external {
    // 相続開始
}
```

#### 1.5. **withdrawTokensZk**

ロック期間終了後、Bob がトークンを引き出すための関数です。

```solidity
function withdrawTokensZk(
    address[] calldata _tokens,
    uint256[] calldata _amounts,
    bytes proof
) external {
    // トークン引き出し処理
}
```

## 署名を使った検証パターン

- **Alice が登録するハッシュ値**:

  - `Aliceアドレス + Bobアドレス + スマートコントラクトアドレス`
  - `register`関数でハッシュを登録します。

- **署名の検証**:
  - 署名は「`Aliceアドレス + Bobアドレス + nonce`」で生成され、リプレイアタックを防ぐために、nonce はスマートコントラクトで管理されます。

### 関数コントラクト（implementation にとして登録するコントラクト）

#### 2.4. **initiateInheritanceSig**

Bob がスマートコントラクトにトークンをロックして相続プロセスを開始するための関数です。署名による認証も行われます。

```solidity
function initiateInheritanceSig(
    address[] calldata _tokens,
    bytes32 signedHash,
    uint8 v,
    bytes32 r,
    bytes32 s
) external {
    // 相続開始
}
```

#### 2.5. **withdrawTokensSig**

ロック期間終了後、Bob がトークンを引き出すための関数です。

```solidity
function withdrawTokensSig(
    address[] calldata _tokens,
    uint256[] calldata _amounts,
    bytes32 signedHash,
    uint8 v,
    bytes32 r,
    bytes32 s
) external {
    // トークン引き出し処理
}
```
