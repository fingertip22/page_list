# Generate html list

最終更新日：2023.12.02
version: 1.0.0

## 開発環境
| コマンド | バージョン |
| ---- | ---- |
| node -v | 20.9.0 |
| npm -v | 10.1.0 |

## 概要
特定のディレクトリ配下に存在するhtmlファイルの一覧表を生成するリポジトリです。Browsersync上で動きます。

この開発環境は静的なWebサイト制作に使用するものです。
本ドキュメントはクイックスタートとしてご利用ください。
`npm scripts`を用いて実行・監視しています。
詳細は`package.json`や`Browsersync`の設定ファイル`bs-config.js`を参照ください。

## 準備
本ドキュメントに記載されているバージョンのnode.js、npmをインストールし、以下を実行してください。
```zsh
$ npm i
```
or
```zsh
$ npm ci
```

## 主要タスク
### 開発用タスク
ローカルサーバーを立ち上げ、設定したディレクトリ配下に存在するHTMLリストを読み込み・表示します。
また、各ファイルを監視します。
```zsh
$ npm run start
```
### リストページ生成タスク
タスク実行時に存在するHTMLファイルの一覧リストを生成します。
```zsh
$ npm run pageList
```

## ディレクトリ構成
.
├── README.md（本ドキュメント）
├── bs-config.js（browsersync、ページ一覧の設定）
├── file-list.html（静的にリストページを出力した場合のHTMLファイル）
├── package-lock.json（実際にインストールしたパッケージ情報）
├── package.json（パッケージ管理）
└── dist（監視対象のディレクトリ）
    ├── index.html
    ├── page01.html
    ├── page02.html
    ├── page03.html
    └── under
        └── page0101.html

## 特記事項
特になし