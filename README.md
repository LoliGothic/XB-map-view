# XB-map-view

XB-map のフロントエンドリポジトリです。

クロスブレイドが遊べる店舗を地図上に表示し、  
ユーザーが店舗ごとの口コミを投稿・閲覧できる UI を提供します。

---

## 本サービスについて

クロスブレイド公式サービス終了に伴い、本アプリもサービスを終了しました。

現在はポートフォリオ用途としてコードを公開しています。

---

## リポジトリ構成

本プロジェクトはフロントエンドとバックエンドを分離した構成で開発しています。

- 🖥 Frontend（本リポジトリ）
- ⚙ Backend  
  https://github.com/LoliGothic/XB-map

---

## 主な機能

- ログイン / 新規登録
- マップ表示（Google Maps）
- 店舗ピン表示
- 口コミ投稿 / 削除
- ユーザー名変更
- パスワード変更

---

## 使用技術

- Next.js
- React
- JavaScript
- CSS Modules
- Google Maps JavaScript API
- Docker / docker-compose
- GitHub Actions（CI/CD）

---

## ローカル起動方法

Docker を使用して起動します。

```bash
docker-compose up
```

## ブラウザで以下にアクセスしてください

http://localhost:3000

---

## docker-compose構成

ローカル開発環境では `docker-compose` を使用して以下の構成で起動します。

- Next.js コンテナ
- 環境変数によるバックエンド API 接続先の切り替え

これにより、環境差異をなくし再現性のある開発環境を実現しています。

---

## デプロイ

GitHub Actions により、`push` 時に Azure Static Web Apps へ自動デプロイしていました。

CI/CD を導入することで、ビルドおよびデプロイの自動化を実現しています。

---

## 設計方針

- フロントエンドとバックエンドを分離し責務を明確化
- Docker による環境統一
- CI/CD によるデプロイ自動化
- 外部 API（Google Maps）との適切な分離

本リポジトリは表示・ユーザー操作を担う UI 層として設計されています。

---

## 補足

本リポジトリはバックエンド API との通信を前提とした構成になっています。

API の仕様やデータ構造については、バックエンドリポジトリをご参照ください。

🔗 Backend Repository  
https://github.com/LoliGothic/XB-map
