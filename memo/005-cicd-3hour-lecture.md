# 🎓 3時間で学ぶCI/CD超入門講座
## GitHub ActionsとJestで始める自動化の世界

**対象**: プログラミング知識ゼロの初学者  
**所要時間**: 3時間（休憩含む）  
**ゴール**: 自分で作ったアプリを自動テスト＆自動公開できるようになる

---

## 📋 講義の全体像

| 時間 | 内容 | 成果物 |
|------|------|--------|
| **第1部（50分）** | CI/CDとは何か？基本概念の理解 | 理解度チェック |
| **休憩（10分）** | コーヒーブレイク ☕ | - |
| **第2部（50分）** | 実際に作ってみる：簡単なアプリ作成 | 動く計算機アプリ |
| **休憩（10分）** | コーヒーブレイク ☕ | - |
| **第3部（60分）** | 自動化の魔法：GitHub ActionsでCI/CD | 自動テスト＆デプロイ |

---

# 第1部：CI/CDとは何か？（50分）

## 1-1. ソフトウェア開発の「困った！」から始めよう（10分）

### 昔話：手作業の時代

**シーン1: あるWeb開発者の一日**

```
朝9時  → コードを書く
昼12時 → 「よし、完成！」
午後1時 → 手動でテスト「動いた！」
午後2時 → サーバーにアップロード
午後3時 → 「あれ？動かない...」
午後4時 → バグ発見「さっきはなぜ動いた？」
午後5時 → 修正して再度アップロード
午後6時 → 「また動かない...」
```

**問題点**:
- 😰 テストを忘れる
- 😰 手動アップロードでミス
- 😰 何度もやり直し
- 😰 時間がかかる
- 😰 疲れる...

### 現代：自動化の時代

**同じ開発者の一日（CI/CD導入後）**

```
朝9時  → コードを書く
昼12時 → GitHubにpush
昼12時 → 【自動】テスト実行 ✅
昼12時 → 【自動】サーバーにアップロード ✅
午後1時 → 「完了！ランチ行こう🍕」
```

**メリット**:
- ✅ テストを忘れない（自動実行）
- ✅ アップロードミスがない（自動実行）
- ✅ 早い（数分で完了）
- ✅ 楽ちん（ボタン1つ）
- ✅ ストレスフリー！

---

## 1-2. CI/CDの正体を知ろう（15分）

### CI/CDとは？

**CI/CD = Continuous Integration / Continuous Delivery（Deployment）**

難しそう？大丈夫、簡単に説明します！

---

### CI（Continuous Integration）= 継続的インテグレーション

**日本語で**: 「いつもコードをまとめてチェックする」

**例え話：レストランの品質管理**

```
【料理人（開発者）】
↓ 新しいレシピを考案
【品質チェック係（CI）】
↓ 自動で味見・見た目チェック
【合格したら】
↓ 次の工程へ
```

**具体的に何をする？**

1. **コードを統合（Integration）**
   - みんなのコードを1つにまとめる
   
2. **自動テスト**
   - 「このコード、ちゃんと動く？」
   - 「バグはない？」
   
3. **すぐにフィードバック**
   - 問題があればすぐ通知
   - 「ここがおかしいよ！」

**CIの目的**:
- バグを早期発見
- コードの品質を保つ
- チーム開発をスムーズに

---

### CD（Continuous Delivery/Deployment）= 継続的デリバリー/デプロイ

**日本語で**: 「いつもお客さんに届ける」

**例え話：自動配達サービス**

```
【レストラン（開発環境）】
↓ 料理完成（コード完成）
【品質OK？（CI合格）】
↓ Yes
【配達員（CD）】
↓ 自動でお客さんのテーブルへ
【お客さん（ユーザー）】
```

**2種類ある**:

#### Continuous Delivery（継続的デリバリー）
- 自動で「配達準備」まで
- 最後のボタンは人間が押す
```
コード → テスト → 【準備完了】→ [人間がボタン] → 本番公開
```

#### Continuous Deployment（継続的デプロイ）
- 完全自動で公開まで
```
コード → テスト → 自動公開 → 完了！
```

**CDの目的**:
- リリースを高速化
- 手作業ミスをなくす
- いつでもリリースできる状態に

---

### CI/CDの全体像

```
開発者がコードを書く
↓
Gitにpush（アップロード）
↓
【CI：継続的インテグレーション】
├─ コードを取得
├─ 自動でビルド（組み立て）
├─ 自動でテスト実行
└─ 結果を通知
    ↓
    OK？
    ↓ Yes
【CD：継続的デリバリー/デプロイ】
├─ 本番環境に自動配置
└─ ユーザーが使える状態に
```

---

## 1-3. なぜCI/CDが重要？（10分）

### メリット1: バグを早く見つけられる

**CI/CDなし**:
```
コードを書く → 1週間後にテスト → バグ発見
「あれ？1週間前に何を書いたっけ...？」
```

**CI/CDあり**:
```
コードを書く → 即座にテスト → バグ発見
「さっき書いたコードだ！すぐ直せる！」
```

**例え話**: 
- 料理を作って1週間後に味見 ❌
- 料理を作ってすぐに味見 ✅

---

### メリット2: リリースが楽になる

**CI/CDなし**:
```
リリース前日:
- 22時まで残業
- 手動でテスト
- 手動でアップロード
- 「動かない...」
- 徹夜...
```

**CI/CDあり**:
```
リリース:
- ボタンをクリック
- 5分待つ
- 完了！
- 「定時で帰れる！」
```

---

### メリット3: チーム開発がスムーズ

**CI/CDなし**:
```
Aさん: 「コード書いた」
Bさん: 「僕のコードと合わせたら動かない...」
Cさん: 「誰のコードが悪い？」
全員: 「犯人探し...」
```

**CI/CDあり**:
```
Aさん: 「コード書いた」→ push
CI: 「テストNG！Aさんのコードに問題」
Aさん: 「すぐ直します」
全員: 「問題解決！」
```

---

### メリット4: ユーザーに早く届けられる

**従来**:
```
新機能のアイデア
↓ 1ヶ月開発
↓ 2週間テスト
↓ 1週間リリース準備
↓ 6週間後にユーザーへ
```

**CI/CD**:
```
新機能のアイデア
↓ 1週間開発
↓ 自動テスト（数分）
↓ 自動リリース（数分）
↓ 1週間後にユーザーへ
```

**ユーザーの反応を早く得られる = ビジネスで勝てる！**

---

## 1-4. GitHub Actionsとは？（15分）

### GitHub Actionsの登場

**GitHub = コードを保存する場所**

**GitHub Actions = GitHubで使えるCI/CDツール**

**例え話：Google Driveの自動整理機能**
```
Google Drive = ファイル保存場所
自動整理機能 = ファイルアップロード時に自動でフォルダ分け

GitHub = コード保存場所
GitHub Actions = コードアップロード時に自動でテスト＆デプロイ
```

---

### GitHub Actionsの特徴

| 特徴 | 説明 |
|------|------|
| 🆓 **無料** | 公開リポジトリは完全無料 |
| 🔗 **統合** | GitHubと完全連携 |
| 🎯 **簡単** | 設定ファイル1つだけ |
| 🚀 **高速** | 数秒〜数分で完了 |
| 🌍 **豊富** | 既製品の「アクション」が多数 |

---

### GitHub Actionsの仕組み

#### 1. ワークフローという「作業手順書」を書く

```yaml
名前: CI Pipeline

いつ実行する？
→ コードがpushされたとき

何をする？
→ 1. コードを取得
→ 2. テストを実行
→ 3. 結果を報告
```

#### 2. GitHubに保存

```
.github/
└── workflows/
    └── ci.yml  ← 作業手順書
```

#### 3. 自動実行！

```
あなたがコードをpush
↓
GitHub Actionsが自動検知
↓
ワークフロー実行開始
↓
結果を表示（成功 or 失敗）
```

---

### 他のCI/CDツールとの比較

| ツール | 特徴 | おすすめ度（初心者） |
|--------|------|---------------------|
| **GitHub Actions** | GitHubと完全統合、無料 | ⭐⭐⭐⭐⭐ |
| Jenkins | 最も有名、自由度高い | ⭐⭐（設定が複雑） |
| CircleCI | 高速、有料プランも | ⭐⭐⭐ |
| GitLab CI/CD | GitLabなら最適 | ⭐⭐⭐⭐ |
| Travis CI | 古参、人気減少中 | ⭐⭐ |

**今日はGitHub Actionsで学びます！**

---

### 用語の整理

ここまでに出てきた用語を整理しましょう。

| 用語 | 意味 | 例え |
|------|------|------|
| **CI** | コードをまとめて自動テスト | 品質チェック係 |
| **CD** | テスト済みコードを自動公開 | 自動配達サービス |
| **GitHub** | コードの保存場所 | Google Drive（コード版） |
| **GitHub Actions** | 自動化ツール | 自動実行ロボット |
| **ワークフロー** | 作業手順書 | レシピ、マニュアル |
| **push** | コードをGitHubに送る | アップロード |
| **リポジトリ** | プロジェクトの保管庫 | プロジェクトフォルダ |

---

## 1-5. 第1部のまとめ（振り返りクイズ）

### クイズ1: CIとは何の略？
```
A) Computer Intelligence
B) Continuous Integration
C) Code Inspector
```

<details>
<summary>答えを見る</summary>
B) Continuous Integration（継続的インテグレーション）
</details>

### クイズ2: CIの主な目的は？
```
A) コードを速く書く
B) バグを早期発見する
C) デザインを良くする
```

<details>
<summary>答えを見る</summary>
B) バグを早期発見する
</details>

### クイズ3: GitHub Actionsはいつ実行される？
```
A) 毎日決まった時間
B) 手動で実行ボタンを押したとき
C) コードをpushしたとき
D) 全部正解（設定次第）
```

<details>
<summary>答えを見る</summary>
D) 全部正解！設定で自由に決められます
</details>

---

**🎉 第1部完了！休憩しましょう（10分）☕**

---

# 第2部：実際に作ってみよう（50分）

## 2-1. 今日作るもの（5分）

### 完成イメージ

**簡単な計算機アプリ**

```
┌─────────────────────────┐
│   🧮 簡単な計算機        │
├─────────────────────────┤
│  数値1: [    5    ]      │
│  数値2: [    3    ]      │
│                          │
│  [足し算] [引き算]       │
│                          │
│  結果: 8                 │
└─────────────────────────┘
```

### 今日やること

1. ✅ 計算機能を作る（JavaScript）
2. ✅ テストを書く（Jest）
3. ✅ GitHubにアップロード
4. ✅ 自動テストを設定（GitHub Actions）
5. ✅ 自動デプロイ（GitHub Pages）

**ゴール**: コードを変更してpushすると、自動的にテスト→公開される！

---

## 2-2. 環境準備（10分）

### 必要なソフトウェア

#### 1. Node.js（JavaScriptの実行環境）

**確認**:
```bash
node --version
```

**まだない場合**:
- https://nodejs.org/
- 「LTS版」をダウンロード＆インストール

**用語解説📖**:
- **Node.js**: JavaScriptをブラウザ外で動かすツール
- **LTS**: Long Term Support（長期サポート版）= 安定版

---

#### 2. Git（バージョン管理システム）

**確認**:
```bash
git --version
```

**まだない場合**:
- Windows: https://git-scm.com/download/win
- Mac: 自動でインストール案内が表示される

**用語解説📖**:
- **Git**: コードの変更履歴を管理するツール
- **バージョン管理**: 「いつ・誰が・何を変更したか」を記録

---

#### 3. GitHubアカウント

- https://github.com
- 無料でアカウント作成

**用語解説📖**:
- **GitHub**: Gitのコードをオンラインで保存・共有するサービス

---

#### 4. テキストエディタ（VSCodeを推奨）

- https://code.visualstudio.com/
- 無料でダウンロード

**用語解説📖**:
- **エディタ**: コードを書くためのソフト（メモ帳の高機能版）

---

### 初期設定

#### Gitの設定（初回のみ）

```bash
git config --global user.name "あなたの名前"
git config --global user.email "あなたのメール"
```

**用語解説📖**:
- **config**: configuration（設定）の略
- **global**: 全プロジェクト共通の設定

---

## 2-3. プロジェクトを作成（15分）

### ステップ1: フォルダを作成

```bash
# 作業フォルダに移動（デスクトップなど）
cd Desktop

# プロジェクトフォルダを作成
mkdir my-calculator
cd my-calculator
```

**用語解説📖**:
- **mkdir**: make directory（フォルダを作る）
- **cd**: change directory（フォルダに移動）

---

### ステップ2: Node.jsプロジェクトを初期化

```bash
npm init -y
```

**何が起きた？**
- `package.json`というファイルが作成される
- プロジェクトの設定ファイル

**用語解説📖**:
- **npm**: Node Package Manager（Nodeのパッケージ管理ツール）
- **package.json**: プロジェクトの情報や依存関係を書くファイル
- **-y**: すべての質問に「Yes」で答える（自動設定）

---

### ステップ3: 計算機能を作る

**calculator.js を作成**:

```javascript
// 足し算をする関数
function add(a, b) {
  return a + b;
}

// 引き算をする関数
function subtract(a, b) {
  return a - b;
}

// 実行して確認
console.log('5 + 3 =', add(5, 3));
console.log('10 - 4 =', subtract(10, 4));

// 他のファイルから使えるようにする
module.exports = { add, subtract };
```

**用語解説📖**:
- **function**: 関数（処理をまとめたもの）
- **return**: 結果を返す
- **console.log**: 画面に表示
- **module.exports**: 他のファイルから使えるようにする

---

### ステップ4: 動作確認

```bash
node calculator.js
```

**表示されるはず**:
```
5 + 3 = 8
10 - 4 = 6
```

**🎉 計算機能が完成！**

---

## 2-4. テストを書く（20分）

### Jestとは？

**Jest = JavaScriptのテストツール**

**例え話**:
- コード = 料理
- Jest = 味見役
- 「この料理、おいしい？」を自動でチェック

---

### ステップ1: Jestをインストール

```bash
npm install --save-dev jest
```

**用語解説📖**:
- **install**: インストール（追加）
- **--save-dev**: 開発時のみ使用（本番環境には不要）

**何が起きた？**
- `node_modules`フォルダが作成される（Jestの本体）
- `package.json`に`jest`が追加される

---

### ステップ2: package.jsonを編集

`package.json`を開いて、`scripts`部分を変更:

**変更前**:
```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

**変更後**:
```json
"scripts": {
  "test": "jest"
}
```

**これで何ができる？**
- `npm test`と入力すると、Jestが実行される

---

### ステップ3: テストファイルを作成

**calculator.test.js を作成**:

```javascript
// テストしたい関数を読み込む
const { add, subtract } = require('./calculator.js');

// テスト1: 足し算
test('5 + 3 は 8 になる', () => {
  expect(add(5, 3)).toBe(8);
});

// テスト2: もう1つの足し算
test('10 + 20 は 30 になる', () => {
  expect(add(10, 20)).toBe(30);
});

// テスト3: 引き算
test('10 - 4 は 6 になる', () => {
  expect(subtract(10, 4)).toBe(6);
});

// テスト4: 0との足し算
test('5 + 0 は 5 になる', () => {
  expect(add(5, 0)).toBe(5);
});
```

**コードの読み方**:

```javascript
test('テストの説明', () => {
  expect(実際の値).toBe(期待する値);
});
```

**用語解説📖**:
- **test()**: テストを定義する関数
- **expect()**: 「期待する」= 答え合わせの開始
- **toBe()**: 「〜であるべき」= 正解の値

**例え話**:
```
先生（test）: 「5 + 3 の問題を出すよ」
生徒（expect）: 「答えは add(5, 3) です」
先生（toBe）: 「正解は 8 だね。合ってる？」
```

---

### ステップ4: テストを実行

```bash
npm test
```

**成功すると**:
```
PASS  ./calculator.test.js
  ✓ 5 + 3 は 8 になる (2 ms)
  ✓ 10 + 20 は 30 になる (1 ms)
  ✓ 10 - 4 は 6 になる
  ✓ 5 + 0 は 5 になる

Tests:       4 passed, 4 total
Time:        1.234 s
```

**🎉 テストが通った！すべて緑色のチェックマーク！**

---

### わざと失敗させてみよう

**calculator.js を変更**:
```javascript
function add(a, b) {
  return a + b + 1;  // わざと間違った計算
}
```

**テスト実行**:
```bash
npm test
```

**失敗すると**:
```
FAIL  ./calculator.test.js
  ✕ 5 + 3 は 8 になる (5 ms)

  Expected: 8
  Received: 9

Tests:       1 failed, 3 passed, 4 total
```

**これがテストの力！**
- バグを自動で見つけてくれる
- どこが間違っているか教えてくれる

**元に戻しておきましょう**:
```javascript
function add(a, b) {
  return a + b;  // 正しい計算
}
```

---

## 2-5. 第2部のまとめ

### 作成したファイル

```
my-calculator/
├── calculator.js          # 計算機能
├── calculator.test.js     # テスト
├── package.json          # プロジェクト設定
└── node_modules/         # インストールしたパッケージ
```

### 学んだコマンド

```bash
npm init -y           # プロジェクト作成
npm install jest      # パッケージ追加
npm test              # テスト実行
node calculator.js    # プログラム実行
```

### 重要ポイント

1. ✅ Jestはテストツール
2. ✅ テストファイルは`*.test.js`
3. ✅ `expect().toBe()`で答え合わせ
4. ✅ テストが通る = 緑のチェック
5. ✅ テストが失敗 = 赤いバツ

---

**🎉 第2部完了！休憩しましょう（10分）☕**

---

# 第3部：自動化の魔法（60分）

## 3-1. GitHubにアップロード（15分）

### ステップ1: .gitignoreを作成

**なぜ必要？**
- `node_modules`フォルダは巨大（数万ファイル）
- GitHubにアップロードする必要なし
- 除外リストを作る

**.gitignore を作成**:
```
node_modules/
.env
```

**用語解説📖**:
- **.gitignore**: Gitが無視するファイル/フォルダのリスト

---

### ステップ2: Gitリポジトリを初期化

```bash
git init
```

**用語解説📖**:
- **git init**: このフォルダをGitで管理開始
- **リポジトリ**: プロジェクトの保管庫

---

### ステップ3: ファイルをコミット

```bash
git add .
git commit -m "初回コミット: 計算機とテスト追加"
```

**用語解説📖**:
- **git add**: ファイルを「アップロード候補」に追加
- **commit**: 変更を記録（写真を撮る）
- **-m**: メッセージ（説明文）

---

### ステップ4: GitHubにリポジトリ作成

1. https://github.com にアクセス
2. 右上の「+」→「New repository」
3. Repository name: `my-calculator`
4. Public を選択
5. 「Create repository」をクリック

**用語解説📖**:
- **Public**: 誰でも見られる（無料）
- **Private**: 自分だけ（有料プランで無制限）

---

### ステップ5: GitHubにプッシュ

GitHubに表示されるコマンドをコピーして実行:

```bash
git remote add origin https://github.com/ユーザー名/my-calculator.git
git branch -M main
git push -u origin main
```

**用語解説📖**:
- **remote**: リモート（遠隔地）= GitHub
- **origin**: リモートリポジトリの名前（慣例）
- **branch**: ブランチ（枝）= コードの系統
- **main**: メインブランチ（主要な系統）
- **push**: コードをGitHubに送信

**🎉 GitHubにアップロード完了！**

---

## 3-2. GitHub Actionsで自動テスト（25分）

### CIの設定をしよう

**目標**: コードをpushすると自動的にテストが実行される

---

### ステップ1: GitHub上でワークフロー作成

1. GitHubのリポジトリページを開く
2. 「**Actions**」タブをクリック
3. 「**set up a workflow yourself**」をクリック

**画面が開く**: ワークフローのエディタ

---

### ステップ2: ワークフローを記述

エディタの内容を**すべて削除**して、以下を貼り付け:

```yaml
name: CI Pipeline

# いつ実行する？
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

# 何をする？
jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    # ステップ1: コードを取得
    - name: コードを取得
      uses: actions/checkout@v3
    
    # ステップ2: Node.jsをセットアップ
    - name: Node.jsをセットアップ
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    # ステップ3: 依存パッケージをインストール
    - name: 依存関係をインストール
      run: npm install
    
    # ステップ4: テストを実行
    - name: テストを実行
      run: npm test
```

**コードの意味を解説**:

```yaml
name: CI Pipeline
```
↑ ワークフローの名前（自由に付けられる）

```yaml
on:
  push:
    branches: [ main ]
```
↑ **トリガー**: mainブランチにpushされたら実行

**用語解説📖**:
- **on**: 「〜のとき」= トリガー
- **push**: コードがGitHubに送信されたとき

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
```
↑ **ジョブ**: 実行する作業
- `test`: ジョブ名（自由）
- `runs-on`: 実行環境（Linuxを使用）

**用語解説📖**:
- **job**: 一連の処理のまとまり
- **ubuntu**: Linuxの一種（OS）

```yaml
steps:
- name: コードを取得
  uses: actions/checkout@v3
```
↑ **ステップ1**: GitHubからコードをダウンロード

**用語解説📖**:
- **steps**: 具体的な手順
- **uses**: 既製品の「アクション」を使う
- **actions/checkout**: GitHubの公式アクション（コード取得用）

```yaml
- name: Node.jsをセットアップ
  uses: actions/setup-node@v3
  with:
    node-version: '18'
```
↑ **ステップ2**: Node.jsをインストール
- バージョン18を使用

```yaml
- name: 依存関係をインストール
  run: npm install
```
↑ **ステップ3**: `npm install`を実行
- Jestなどをインストール

**用語解説📖**:
- **run**: コマンドを実行

```yaml
- name: テストを実行
  run: npm test
```
↑ **ステップ4**: テストを実行

---

### ステップ3: ファイル名を変更

- ファイル名を `ci.yml` に変更
- パスは `.github/workflows/ci.yml` のまま

---

### ステップ4: コミット

1. 右上の「Commit changes...」をクリック
2. Commit message: 「CI設定を追加」
3. 「Commit changes」をクリック

**すぐにワークフローが実行される！**

---

### ステップ5: 実行結果を確認

1. 「Actions」タブを開く
2. 「CI Pipeline」をクリック
3. 各ステップの実行状況を確認

**成功すると**:
```
✓ コードを取得
✓ Node.jsをセットアップ
✓ 依存関係をインストール
✓ テストを実行
```

**すべて緑のチェックマーク！🎉**

---

### 実際に試してみよう

**ローカルでコードを変更**:

```bash
# GitHubの変更を取得
git pull

# calculator.jsに掛け算を追加
```

**calculator.js に追加**:
```javascript
function multiply(a, b) {
  return a * b;
}

console.log('5 × 3 =', multiply(5, 3));

module.exports = { add, subtract, multiply };
```

**calculator.test.js に追加**:
```javascript
test('5 × 3 は 15 になる', () => {
  expect(multiply(5, 3)).toBe(15);
});
```

**GitHubにpush**:
```bash
git add .
git commit -m "掛け算機能を追加"
git push
```

**GitHubのActionsタブを見る**:
- 自動的にワークフローが実行される
- テストが自動実行される
- 結果が表示される

**🎉 これがCI（継続的インテグレーション）！**

---

## 3-3. GitHub Pagesで自動デプロイ（20分）

### CDの設定をしよう

**目標**: テストが成功したら自動的にWebサイトを公開

---

### ステップ1: HTMLページを作成

**index.html を作成**（ローカル）:

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>私の計算機</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
    }
    .calculator {
      background: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    }
    h1 {
      color: #667eea;
      text-align: center;
      margin-bottom: 10px;
    }
    .subtitle {
      text-align: center;
      color: #666;
      font-size: 14px;
      margin-bottom: 30px;
    }
    input {
      width: 100%;
      padding: 12px;
      margin: 10px 0;
      font-size: 18px;
      border: 2px solid #ddd;
      border-radius: 8px;
      box-sizing: border-box;
    }
    button {
      background: #667eea;
      color: white;
      border: none;
      padding: 12px 25px;
      font-size: 16px;
      cursor: pointer;
      border-radius: 8px;
      margin: 5px;
      transition: background 0.3s;
    }
    button:hover {
      background: #5568d3;
    }
    #result {
      margin-top: 25px;
      padding: 15px;
      font-size: 24px;
      font-weight: bold;
      color: #667eea;
      text-align: center;
      background: #f0f4ff;
      border-radius: 8px;
      min-height: 30px;
    }
    .button-group {
      text-align: center;
      margin-top: 15px;
    }
  </style>
</head>
<body>
  <div class="calculator">
    <h1>🧮 簡単な計算機</h1>
    <p class="subtitle">CI/CDで自動デプロイされました！</p>
    
    <input type="number" id="num1" placeholder="数値1を入力">
    <input type="number" id="num2" placeholder="数値2を入力">
    
    <div class="button-group">
      <button onclick="calculate('add')">➕ 足し算</button>
      <button onclick="calculate('subtract')">➖ 引き算</button>
      <button onclick="calculate('multiply')">✖️ 掛け算</button>
    </div>
    
    <div id="result"></div>
  </div>

  <script>
    function calculate(operation) {
      const num1 = parseFloat(document.getElementById('num1').value);
      const num2 = parseFloat(document.getElementById('num2').value);
      
      if (isNaN(num1) || isNaN(num2)) {
        document.getElementById('result').textContent = '数値を入力してください';
        return;
      }
      
      let result;
      if (operation === 'add') {
        result = num1 + num2;
      } else if (operation === 'subtract') {
        result = num1 - num2;
      } else if (operation === 'multiply') {
        result = num1 * num2;
      }
      
      document.getElementById('result').textContent = `結果: ${result}`;
    }
  </script>
</body>
</html>
```

**用語解説📖**:
- **HTML**: Webページの構造
- **CSS**: Webページのデザイン（`<style>`内）
- **JavaScript**: Webページの動作（`<script>`内）

---

### ステップ2: デプロイ用ワークフローを作成

1. GitHubの「Actions」タブを開く
2. 「New workflow」をクリック
3. 「set up a workflow yourself」をクリック

エディタに以下を貼り付け:

```yaml
name: Deploy to GitHub Pages

# mainブランチにpushされたら実行
on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: コードを取得
      uses: actions/checkout@v3
    
    - name: GitHub Pagesにデプロイ
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./
```

**用語解説📖**:
- **deploy**: デプロイ（配置・公開）
- **github_token**: 認証トークン（GitHubが自動生成）
- **publish_dir**: 公開するフォルダ

---

### ステップ3: ファイル名を設定してコミット

- ファイル名: `deploy.yml`
- Commit message: 「デプロイ設定を追加」
- 「Commit changes」をクリック

---

### ステップ4: 権限設定

1. リポジトリの「Settings」タブを開く
2. 左メニュー「Actions」→「General」
3. 「Workflow permissions」セクション
4. **「Read and write permissions」**を選択
5. 「Save」をクリック

**なぜ必要？**
- ワークフローがGitHubに書き込むため

---

### ステップ5: GitHub Pagesを有効化

1. 「Settings」タブ
2. 左メニュー「Pages」
3. 「Source」→「Deploy from a branch」を選択
4. 「Branch」→「gh-pages」を選択
5. 「Save」をクリック

**用語解説📖**:
- **GitHub Pages**: GitHubが提供する無料のWebホスティング
- **gh-pages**: デプロイ用のブランチ（自動生成）

---

### ステップ6: ローカルからpush

```bash
git add index.html
git commit -m "計算機のWebページを追加"
git push
```

---

### ステップ7: 公開URLを確認

1. Actionsタブで「Deploy to GitHub Pages」が成功するのを待つ
2. Settings → Pages を開く
3. 上部に公開URLが表示される

```
Your site is live at https://ユーザー名.github.io/my-calculator/
```

**ブラウザでアクセス！🎉**

**これがCD（継続的デプロイ）！**

---

## 3-4. CI/CDの完成を確認（5分）

### 完成したCI/CDパイプライン

```
あなたがコードを変更
↓
git commit & push
↓
【GitHub Actions 自動実行】
↓
┌─────────────────┐
│ CI: テスト実行   │
│ ✓ コード取得     │
│ ✓ Node.js準備    │
│ ✓ npm install   │
│ ✓ npm test      │
└─────────────────┘
↓ 成功？
↓ Yes
┌─────────────────┐
│ CD: デプロイ     │
│ ✓ コード取得     │
│ ✓ Pages公開      │
└─────────────────┘
↓
🌍 Webサイト更新完了！
```

---

### 実際に変更してみよう

**ローカルで index.html を編集**:

タイトルを変更:
```html
<h1>🧮 私の最高の計算機</h1>
```

**push**:
```bash
git add .
git commit -m "タイトルを変更"
git push
```

**GitHubで確認**:
1. Actionsタブを見る
2. CIとCDが自動実行される
3. 数分後、Webサイトが更新される

**🎉 自動化完成！**

---

## 3-5. 第3部のまとめ（5分）

### 今日作ったもの

1. ✅ 計算機アプリ（JavaScript）
2. ✅ 自動テスト（Jest）
3. ✅ CI設定（GitHub Actions）
4. ✅ CD設定（GitHub Pages）

### CI/CDフロー

```
コード変更
↓ git push
CI（自動テスト）
↓ テスト成功
CD（自動デプロイ）
↓
公開完了
```

### 学んだ重要概念

| 概念 | 説明 |
|------|------|
| CI | コードを統合して自動テスト |
| CD | テスト済みコードを自動公開 |
| GitHub Actions | GitHubの自動化ツール |
| ワークフロー | 自動化の手順書 |
| Jest | JavaScriptのテストツール |
| GitHub Pages | 無料のWebホスティング |

---

# 全体のまとめ（10分）

## 今日学んだこと

### 第1部: 理論
- ✅ CI/CDの概念
- ✅ なぜ自動化が重要か
- ✅ GitHub Actionsとは

### 第2部: 実装
- ✅ 計算機アプリの作成
- ✅ Jestでテスト作成
- ✅ GitHubにアップロード

### 第3部: 自動化
- ✅ CI設定（自動テスト）
- ✅ CD設定（自動デプロイ）
- ✅ 完全な自動化パイプライン

---

## あなたができるようになったこと

1. ✅ CI/CDの仕組みを説明できる
2. ✅ GitHub Actionsを設定できる
3. ✅ Jestでテストを書ける
4. ✅ 自動テスト・自動デプロイができる
5. ✅ 変更を加えると自動的に公開される

**これは現代のプロ開発者と同じワークフロー！**

---

## 次のステップ

### レベル1: 基礎を固める
- [ ] 他の計算機能を追加（割り算など）
- [ ] より多くのテストケースを追加
- [ ] デザインを改善

### レベル2: 応用
- [ ] 別のプロジェクトでCI/CD構築
- [ ] React/Vueなどのフレームワーク
- [ ] より複雑なテスト（非同期処理など）

### レベル3: 実践
- [ ] チーム開発でCI/CD活用
- [ ] 本番環境へのデプロイ
- [ ] モニタリングとログ分析

---

## よくある質問（FAQ）

### Q1: 無料で使い続けられる？
**A**: はい！
- GitHub（Public リポジトリ）: 完全無料
- GitHub Actions: 月2,000分まで無料
- GitHub Pages: 完全無料

### Q2: 他の言語でも使える？
**A**: はい！
- Python, Ruby, Java, Go, C#など
- GitHub Actionsは多言語対応

### Q3: 本番環境にも使える？
**A**: はい！
- 多くの企業が本番環境で使用
- セキュリティも問題なし

### Q4: エラーが出たら？
**A**: 落ち着いて対処
1. エラーメッセージを読む
2. Actionsタブでログ確認
3. Google検索
4. GitHub Discussions/Stack Overflow

### Q5: もっと学びたい
**A**: おすすめリソース
- 📚 GitHub Actions公式ドキュメント
- 📚 Jest公式ドキュメント
- 🎥 YouTube チュートリアル
- 💬 コミュニティ（Discord, Slack）

---

## 最後に

### あなたは今日、こんなすごいことをやり遂げました

1. ✅ ゼロからアプリを作成
2. ✅ テストを書いた
3. ✅ 完全自動化を実現
4. ✅ 世界中に公開

**これは簡単なことではありません。**
**自分を褒めてあげてください！🎉**

### CI/CDは旅の始まり

- 今日学んだことは基礎
- これから無限の可能性が広がる
- 継続的に学び、改善していきましょう

### Keep Learning, Keep Building! 🚀

---

## 付録: チートシート

### Gitコマンド
```bash
git init                # リポジトリ初期化
git add .              # すべてのファイルを追加
git commit -m "..."    # コミット
git push               # GitHubに送信
git pull               # GitHubから取得
git status             # 状態確認
```

### npmコマンド
```bash
npm init -y            # プロジェクト初期化
npm install パッケージ  # パッケージ追加
npm test               # テスト実行
npm run ビルド          # ビルド実行
```

### Jestの基本
```javascript
test('テスト名', () => {
  expect(実際の値).toBe(期待する値);
});
```

### GitHub Actionsの基本
```yaml
name: ワークフロー名
on: push
jobs:
  job-name:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: コマンド
```

---

## お疲れさまでした！ 🎓

今日の学習内容を復習して、
ぜひ自分のプロジェクトに応用してみてください！

**Happy Coding! 💻✨**
