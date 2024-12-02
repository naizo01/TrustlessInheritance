# Trustless Inheritance (four Next)

暗号通貨の相続をトラストレスに実現するスマートコントラクトアプリケーション

## 概要

このアプリケーションは、暗号資産の相続をトラストレスな方法で実現するアプリケーションです。Zero-Knowledge Proofを活用することで、プライバシーを保護しながら安全な資産移転を可能にします。

### 主な特徴

- 第三者機関に依存しないスマートコントラクトベースの相続
- ZK証明による相続先のプライバシー保護
- ERC7546 UCSプロキシパターンによる効率的なコントラクト管理
- Web3フレームワークを活用した使いやすいフロントエンド

## プロジェクト構成

```
TrustlessInheritance/
├── contracts/         # スマートコントラクトのソースコード
├── docs/             # ドキュメント類
├── frontend/         # フロントエンドアプリケーション
└── zk/               # Zero-Knowledge Proof関連のコード
```

## 技術的特徴

### 1. ZK検証システム
- 相続先アドレスの秘匿性を保持
- 8文字以上の文字列検証
- 単一文字列でないことの確認

### 2. スマートコントラクト設計
- ERC7546 UCSプロキシパターン採用
- ユーザーごとの独立したプロキシ生成
- 最適化されたガスコスト

### 3. フロントエンド実装
- Next.js
- wagmi
- viem
- connectkit
- snarkjs

## コントラクトアーキテクチャ

### InheritanceFactory

InheritanceFactoryは、InheritanceContractのプロキシをデプロイし、初期化を行うコントラクトです。

主な機能:
- 新しいInheritanceContractのプロキシをデプロイ
- デプロイされたコントラクトの初期化
- デプロイされたコントラクトのアドレス管理

### InheritanceContract

InheritanceContractは、相続プロセス全体を管理する中心的なコントラクトです。ERC7546を使用して構築され、1ユーザーにつき1つのプロキシとして実装されています。

#### 関数
- **initialize**: 相続元がハッシュ値とロック期間を設定
- **addApprovedTokens**: 新しいトークンを承認リストに追加
- **initiateInheritance**: 相続先が相続プロセスを開始し、ZK証明を提出
- **withdrawTokens**: ロック期間終了後、Bobがトークンを引き出し
- **cancelInheritance**: 相続元が相続プロセスをキャンセル

## 開発チーム

- 東京大学ブロックチェーン公開講座
- four Next (G4)