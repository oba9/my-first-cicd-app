
📦 [jest-mini-project.zip をダウンロード](sandbox:/mnt/data/jest-mini-project.zip)

---

# 使い方（手順書）

## 1) ZIPを展開

任意の場所に `jest-mini-project.zip` を解凍します。

## 2) ターミナルを開く

* Windows: PowerShell か VS Code の「ターミナル」
* macOS: ターミナル
* Linux: 端末

解凍したフォルダへ移動：

```bash
cd <展開先パス>/jest-mini-project
```

## 3) 依存をインストール

```bash
npm install
```

※ はじめて実行すると **Jest** が自動で入ります。

## 4) テストを実行

```bash
npm test
```

成功例：

```
PASS  ./calculator.test.js
 ✓ add(2, 3) は 5 になる
 ✓ sub(10, 4) は 6 になる
 ✓ sum([1,2,3]) は 6 になる
 ✓ add(2, 2) は 5 ではない
```

## 5) 便利コマンド（任意）

```bash
npm run test:watch   # 変更を監視して自動再実行
npm run coverage     # テスト網羅率レポートを生成（coverage/配下）
```

`coverage/lcov-report/index.html` をブラウザで開けばレポートが見られます。

---

# 同梱ファイル

```
jest-mini-project/
├─ package.json          # npm スクリプト＆依存（jest）
├─ calculator.js         # 練習用の関数（add, sub, sum）
├─ calculator.test.js    # 上の関数のテスト
└─ .gitignore            # node_modules, coverage, .env を除外
```

---

# よくあるつまずき

* `npm: command not found` → Node.js が未インストールです（LTS版を入れてください： [https://nodejs.org/）](https://nodejs.org/）)
* `npm test` で jest が見つからない → `npm install` を先に実行
* 文字化け → PowerShell か VS Code ターミナルを使うと安定

