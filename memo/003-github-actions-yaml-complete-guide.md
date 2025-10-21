# 📘 GitHub Actions ワークフローファイル完全ガイド

## 目次
1. [ワークフローファイルの作成方法（GitHub vs VSCode）](#1-ワークフローファイルの作成方法)
2. [ファイル名とパスのルール](#2-ファイル名とパスのルール)
3. [YAML記述の基本ルール](#3-yaml記述の基本ルール)
4. [ワークフローの構文詳細解説](#4-ワークフローの構文詳細解説)
5. [実践例とテンプレート](#5-実践例とテンプレート)

---

## 1. ワークフローファイルの作成方法

### 方法A: GitHub上で作成（Web UI）

#### メリット
- ✅ 環境構築不要（ブラウザだけでOK）
- ✅ シンタックスハイライト機能あり
- ✅ 保存と同時にワークフローが実行される
- ✅ 初心者におすすめ

#### 手順

**ステップ1: Actionsタブを開く**
```
GitHubリポジトリ → Actions タブ → "set up a workflow yourself" をクリック
```

**ステップ2: エディタで編集**
- デフォルトでは`main.yml`という名前が設定されている
- ファイル名部分をクリックして好きな名前に変更可能
- パスは自動的に`.github/workflows/`配下になる

**ステップ3: ファイル名を変更**
```
変更前: .github/workflows/main.yml
変更後: .github/workflows/ci.yml  ← 好きな名前に変更
```

**ポイント**:
- 📝 ファイル名の部分だけを変更（`.github/workflows/`の部分は変更しない）
- 📝 拡張子は必ず`.yml`または`.yaml`
- 📝 日本語は使わない（英数字とハイフン、アンダースコアのみ）

**ステップ4: コミット**
```
右上の "Commit changes..." ボタンをクリック
→ Commit messageを入力
→ "Commit changes" をクリック
→ 即座にワークフローが実行される
```

#### 画面イメージ
```
┌─────────────────────────────────────────┐
│ .github/workflows/ci.yml            ←編集可能│
├─────────────────────────────────────────┤
│ name: CI Pipeline                        │
│ on:                                      │
│   push:                                  │
│     branches: [ main ]                   │
│ ...                                      │
└─────────────────────────────────────────┘
        ↓ Commit changes...
   自動実行される
```

---

### 方法B: VSCode（ローカル）で作成

#### メリット
- ✅ 複数ファイルを同時編集可能
- ✅ Git操作がGUI/CLIで選べる
- ✅ 拡張機能で強力な補完機能
- ✅ オフラインでも作業可能

#### 必要な準備

**1. VSCodeのインストール**
```
https://code.visualstudio.com/
```

**2. おすすめ拡張機能**
```
- GitHub Actions (by GitHub)
  → YAMLの構文チェックと自動補完
  
- YAML (by Red Hat)
  → YAML全般のサポート
  
- GitLens (by GitKraken)
  → Git履歴の可視化
```

インストール方法:
```
VSCode → 左側の拡張機能アイコン (四角4つ) → 検索 → Install
```

#### 手順

**ステップ1: プロジェクトを開く**
```
VSCode → File → Open Folder → プロジェクトフォルダを選択
```

**ステップ2: フォルダ構造を作成**

左側のエクスプローラーで:
```
プロジェクトフォルダ
├── .github/              ← 新しいフォルダ
│   └── workflows/        ← 新しいフォルダ
│       └── ci.yml        ← 新しいファイル
├── app.js
└── package.json
```

**手順**:
1. プロジェクトフォルダを右クリック → "New Folder" → `.github`
2. `.github`を右クリック → "New Folder" → `workflows`
3. `workflows`を右クリック → "New File" → `ci.yml`

**⚠️ 重要**: 
- `.github`の先頭のドット（.）を忘れずに！
- Windowsでは隠しファイルになるが、VSCodeでは表示される

**ステップ3: YAMLを記述**
```yaml
name: CI Pipeline

on:
  push:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '18'
    - run: npm install
    - run: node app.js
```

**ステップ4: GitHubにプッシュ**

**方法1: ターミナルから（推奨）**
```bash
git add .github/workflows/ci.yml
git commit -m "CI設定を追加"
git push
```

**方法2: VSCodeのGUI**
```
左側のソース管理アイコン → 変更をステージング → メッセージ入力 → コミット → プッシュ
```

#### VSCodeでのメリット

**構文チェック機能**
```yaml
name: CI Pipeline
on:
  push
    branches: [ main ]  # ← ここで波線が表示される（インデントエラー）
```

**自動補完機能**
```yaml
jobs:
  build:
    runs-on: u  ← ここで "u" を入力すると候補が表示される
                   - ubuntu-latest
                   - ubuntu-22.04
                   - ubuntu-20.04
```

**リアルタイムエラー表示**
```
Problems タブに構文エラーが表示される
```

---

## 2. ファイル名とパスのルール

### 必須ルール

#### パス（ディレクトリ構造）
```
✅ 正しい:
.github/workflows/ci.yml

❌ 間違い:
github/workflows/ci.yml          # 先頭の . がない
.github/workflow/ci.yml          # workflows が workflow になっている
workflows/ci.yml                 # .github/ がない
.github/ci.yml                   # workflows/ がない
```

**絶対ルール**: 
- 📁 `.github/workflows/` というパスは固定
- 📁 大文字小文字を区別する（`Workflows`はNG）
- 📁 複数形の`workflows`（`workflow`ではない）

#### ファイル名

**拡張子**:
```
✅ 使える拡張子:
- .yml   （推奨）
- .yaml  （こちらでもOK）

❌ 使えない拡張子:
- .txt
- .yaml.txt
- .yml.backup
```

**ファイル名の自由度**:
```
✅ 良い例（推奨される命名規則）:
- ci.yml                    # シンプルで明確
- deploy.yml                # 用途が一目でわかる
- test-and-build.yml        # ハイフン区切り
- release_production.yml    # アンダースコア区切り

✅ 使えるが推奨しない:
- main.yml                  # 何をするか不明
- workflow.yml              # 汎用的すぎる
- 123.yml                   # 数字のみは避ける

❌ 使えない（エラーになる）:
- ci.yaml.txt               # 拡張子が複数
- CI設定.yml                 # 日本語
- ci workflow.yml           # スペース（使えるが非推奨）
```

**命名のベストプラクティス**:
```
用途別の命名例:

CI用:
- ci.yml
- continuous-integration.yml
- test.yml

デプロイ用:
- deploy.yml
- deploy-production.yml
- deploy-staging.yml

リリース用:
- release.yml
- publish.yml

定期実行用:
- scheduled-tasks.yml
- nightly-build.yml
- weekly-report.yml
```

### 複数のワークフローファイル

**同じリポジトリに複数作成可能**:
```
.github/
└── workflows/
    ├── ci.yml              # テスト用
    ├── deploy.yml          # デプロイ用
    ├── release.yml         # リリース用
    └── cleanup.yml         # クリーンアップ用
```

**それぞれ独立して動作**:
- 各ファイルは独立したワークフロー
- 異なるトリガーで実行可能
- 互いに干渉しない

**例**:
```yaml
# ci.yml - すべてのpushで実行
on: push

# deploy.yml - mainブランチのpushのみ
on:
  push:
    branches: [ main ]

# release.yml - タグがpushされたとき
on:
  push:
    tags:
      - 'v*'
```

---

## 3. YAML記述の基本ルール

### YAMLとは？

**YAML = Yet Another Markup Language**
- データを構造化して記述する形式
- JSONよりも人間が読みやすい
- インデント（字下げ）で階層を表現

**例え話**: 
YAMLは「箇条書きのメモ」のようなもの
- インデントで親子関係を表現
- コロン（:）でキーと値を区切る
- リスト（配列）はハイフン（-）で表現

### YAML記述の厳格なルール

#### ルール1: インデント（字下げ）は**スペース2個**

```yaml
✅ 正しい:
jobs:
  build:              # スペース2個
    runs-on: ubuntu   # スペース4個（さらに2個下げる）
    steps:            # スペース4個
    - name: test      # スペース4個 + ハイフン

❌ 間違い:
jobs:
    build:          # スペース4個（2個であるべき）
  runs-on: ubuntu   # インデントが合っていない
```

**絶対ルール**:
- ✅ スペースのみ使用
- ❌ タブは使用禁止（エラーになる）
- ✅ 階層ごとにスペース2個追加

#### ルール2: コロン（:）の後にはスペース

```yaml
✅ 正しい:
name: CI Pipeline    # コロンの後にスペース
runs-on: ubuntu      # コロンの後にスペース

❌ 間違い:
name:CI Pipeline     # スペースがない
runs-on:ubuntu       # スペースがない
```

#### ルール3: リスト（配列）はハイフン（-）

```yaml
✅ 正しい:
branches:
  - main           # ハイフン + スペース
  - develop

branches: [ main, develop ]  # 1行でも書ける

❌ 間違い:
branches:
  -main           # スペースがない
  * main          # アスタリスクは使えない
```

#### ルール4: 文字列のクォート

```yaml
✅ どちらでもOK:
name: CI Pipeline         # クォートなし
name: "CI Pipeline"       # ダブルクォート
name: 'CI Pipeline'       # シングルクォート

✅ 必要な場合（特殊文字を含む）:
message: "Hello: World"   # コロンを含む場合
message: 'It''s working'  # シングルクォートを含む場合

❌ 混在はNG:
message: "Hello'          # クォートが混在
```

#### ルール5: コメント

```yaml
# これはコメント（1行全体）

name: CI Pipeline  # これもコメント（行末）

# 複数行のコメント
# 各行に # を付ける必要がある
```

### よくあるYAMLエラーと解決方法

#### エラー1: インデントミス

```yaml
❌ エラー:
jobs:
  build:
  runs-on: ubuntu    # インデントが足りない

✅ 修正:
jobs:
  build:
    runs-on: ubuntu  # スペース2個追加
```

#### エラー2: コロン後のスペース忘れ

```yaml
❌ エラー:
name:CI Pipeline

✅ 修正:
name: CI Pipeline
```

#### エラー3: タブの使用

```yaml
❌ エラー:
jobs:
→   build:    # タブが混入（見た目ではわからない）

✅ 修正:
jobs:
  build:      # スペース2個
```

**VSCodeでタブを可視化**:
```
設定 → "render whitespace" を "all" に変更
→ スペースとタブが見分けられる
```

---

## 4. ワークフローの構文詳細解説

### 基本構造

```yaml
name: ワークフローの名前       # 必須ではないが推奨
on: トリガー（いつ実行するか）  # 必須
jobs: 実行する処理             # 必須
```

### 4-1. name（ワークフロー名）

**構文**:
```yaml
name: 任意の名前
```

**特徴**:
- ✅ 省略可能（省略時はファイル名が表示される）
- ✅ 日本語使用可能（ただし推奨しない）
- ✅ GitHub Actionsタブに表示される名前

**例**:
```yaml
✅ 良い例:
name: CI Pipeline
name: Deploy to Production
name: Run Tests

❌ 推奨しない:
name: テストとビルド        # 日本語
name: workflow             # 汎用的すぎる
name: aaa                  # 意味不明
```

---

### 4-2. on（トリガー）

**いつワークフローを実行するか**を定義

#### パターン1: 単一トリガー

```yaml
# pushされたときに実行
on: push

# Pull Requestが作られたとき
on: pull_request

# 手動実行のみ
on: workflow_dispatch
```

#### パターン2: ブランチ指定

```yaml
# mainブランチへのpushのみ
on:
  push:
    branches:
      - main

# 複数ブランチ指定
on:
  push:
    branches:
      - main
      - develop

# ショートハンド（1行で書く）
on:
  push:
    branches: [ main, develop ]
```

#### パターン3: 複数トリガー

```yaml
# pushとPull Requestの両方
on: [push, pull_request]

# 詳細に書く
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
```

#### パターン4: パス指定

```yaml
# 特定のファイルが変更されたとき
on:
  push:
    paths:
      - 'src/**'        # srcフォルダ配下すべて
      - '**.js'         # すべての.jsファイル
      - 'package.json'  # 特定ファイル
```

#### パターン5: スケジュール実行

```yaml
# 定期実行（cron形式）
on:
  schedule:
    - cron: '0 0 * * *'  # 毎日0時に実行
    - cron: '0 9 * * 1'  # 毎週月曜9時に実行

# cron形式:
# ┌─分(0-59)
# │ ┌─時(0-23)
# │ │ ┌─日(1-31)
# │ │ │ ┌─月(1-12)
# │ │ │ │ ┌─曜日(0-6, 0=日曜)
# * * * * *
```

#### よく使うトリガーの組み合わせ

```yaml
# CI用（すべてのpushとPR）
on:
  push:
  pull_request:

# デプロイ用（mainへのpushのみ）
on:
  push:
    branches: [ main ]

# リリース用（タグpush）
on:
  push:
    tags:
      - 'v*'  # v1.0.0 など

# テスト用（コード変更時のみ）
on:
  push:
    paths:
      - 'src/**'
      - 'test/**'
```

---

### 4-3. jobs（実行する処理）

**複数のジョブを定義可能**

#### 基本構造

```yaml
jobs:
  job-id:                    # ジョブのID（自由に命名）
    runs-on: ubuntu-latest   # 実行環境
    steps:                   # 実行手順
      - name: ステップ名
        run: コマンド
```

#### 実行環境（runs-on）

```yaml
✅ 使用可能な環境:

# Linux
runs-on: ubuntu-latest      # 最新のUbuntu（推奨）
runs-on: ubuntu-22.04       # Ubuntu 22.04
runs-on: ubuntu-20.04       # Ubuntu 20.04

# Windows
runs-on: windows-latest     # 最新のWindows
runs-on: windows-2022
runs-on: windows-2019

# macOS
runs-on: macos-latest       # 最新のmacOS
runs-on: macos-13
runs-on: macos-12
```

**選び方**:
- 🐧 Linux: 最速で無料枠が多い（推奨）
- 🪟 Windows: Windows専用アプリ
- 🍎 macOS: iOS/macOSアプリ

#### ジョブID命名規則

```yaml
✅ 良い例（意味が明確）:
jobs:
  build:          # ビルド処理
  test:           # テスト処理
  deploy:         # デプロイ処理
  build-and-test: # ハイフン区切り

❌ 推奨しない:
jobs:
  job1:           # 番号のみ
  aaa:            # 意味不明
  ビルド:          # 日本語
```

---

### 4-4. steps（実行手順）

**ジョブ内で実行する具体的な手順**

#### パターン1: コマンド実行（run）

```yaml
steps:
  - name: ステップの説明
    run: echo "Hello World"

  - name: 複数コマンド実行
    run: |
      echo "1つ目のコマンド"
      echo "2つ目のコマンド"
      npm install
```

**ポイント**:
- `run:` の後に1行でコマンド
- 複数行は `|` を使用
- シェルコマンドが実行可能

#### パターン2: アクション使用（uses）

```yaml
steps:
  # GitHubの公式アクション
  - uses: actions/checkout@v3
  
  # バージョン指定
  - uses: actions/setup-node@v3
    with:
      node-version: '18'
  
  # サードパーティのアクション
  - uses: peaceiris/actions-gh-pages@v3
    with:
      github_token: ${{ secrets.GITHUB_TOKEN }}
```

**アクションとは**:
- 再利用可能な処理のパッケージ
- GitHub Marketplaceで公開されている
- `uses:` で使用
- `with:` でパラメータを渡す

#### よく使うアクション

```yaml
# 1. コードのチェックアウト（必須）
- uses: actions/checkout@v3

# 2. Node.jsのセットアップ
- uses: actions/setup-node@v3
  with:
    node-version: '18'     # バージョン指定
    cache: 'npm'           # npm キャッシュ

# 3. Pythonのセットアップ
- uses: actions/setup-python@v4
  with:
    python-version: '3.11'

# 4. キャッシュ
- uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}

# 5. アーティファクトのアップロード
- uses: actions/upload-artifact@v3
  with:
    name: build-output
    path: dist/
```

#### ステップの条件実行

```yaml
steps:
  # 常に実行
  - name: テスト実行
    run: npm test
  
  # mainブランチのみ実行
  - name: デプロイ
    if: github.ref == 'refs/heads/main'
    run: npm run deploy
  
  # 失敗しても続行
  - name: オプショナルなチェック
    run: npm run lint
    continue-on-error: true
```

---

## 5. 実践例とテンプレート

### テンプレート1: シンプルなCI（最小構成）

```yaml
name: Simple CI

on: push

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm test
```

**使用場面**: 
- 初めてのCI/CD
- 個人プロジェクト
- プロトタイプ

---

### テンプレート2: 本格的なCI

```yaml
name: CI Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [16, 18, 20]  # 複数バージョンでテスト
    
    steps:
      - name: コードを取得
        uses: actions/checkout@v3
      
      - name: Node.js ${{ matrix.node-version }} をセットアップ
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      
      - name: 依存関係をインストール
        run: npm ci  # npm install より高速
      
      - name: Lintチェック
        run: npm run lint
      
      - name: テスト実行
        run: npm test
      
      - name: ビルド
        run: npm run build
      
      - name: ビルド成果物を保存
        uses: actions/upload-artifact@v3
        with:
          name: build-output
          path: dist/
```

**使用場面**:
- チーム開発
- 本番プロジェクト
- 複数環境のサポート

---

### テンプレート3: CI + CD（デプロイ込み）

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]

jobs:
  # ジョブ1: テスト
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
  
  # ジョブ2: ビルド（testが成功したら実行）
  build:
    needs: test  # testジョブの完了を待つ
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-artifact@v3
        with:
          name: dist
          path: dist/
  
  # ジョブ3: デプロイ（buildが成功したら実行）
  deploy:
    needs: build  # buildジョブの完了を待つ
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/download-artifact@v3
        with:
          name: dist
          path: dist/
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

**使用場面**:
- 本番環境への自動デプロイ
- ステージング環境の管理
- エンタープライズプロジェクト

---

### テンプレート4: 定期実行（cron）

```yaml
name: Nightly Build

on:
  schedule:
    - cron: '0 2 * * *'  # 毎日2時に実行
  workflow_dispatch:     # 手動実行も可能

jobs:
  nightly-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm test
      
      # 失敗時に通知
      - name: Slack通知
        if: failure()
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

**使用場面**:
- 定期的なテスト
- レポート生成
- データバックアップ

---

## まとめ: GitHub vs VSCode比較表

| 項目 | GitHub UI | VSCode（ローカル） |
|------|-----------|-------------------|
| **初心者向け** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **環境構築** | 不要 | 必要（Git, VSCode） |
| **即時実行** | ✅ 保存と同時 | ❌ pushが必要 |
| **オフライン作業** | ❌ 不可 | ✅ 可能 |
| **補完機能** | 基本的なもの | 強力（拡張機能） |
| **複数ファイル編集** | 1ファイルずつ | ✅ 同時編集可 |
| **構文チェック** | 基本的なもの | リアルタイム |
| **おすすめ** | 初学者、簡単なワークフロー | 中級者以上、複雑なワークフロー |

---

## ファイル名ルール最終まとめ

### 絶対に守るルール（固定）
```
✅ パス: .github/workflows/
✅ 拡張子: .yml または .yaml
```

### 自由に決められる部分
```
✅ ファイル名: ci.yml, deploy.yml, test.yml など
✅ 複数ファイル作成可能
```

### 推奨命名規則
```
✅ 小文字を使用
✅ ハイフンまたはアンダースコアで単語を区切る
✅ 用途が明確な名前
✅ 英語を使用
```

---

## 実際の作成フロー（推奨）

### 初心者の方

1. **GitHub UI**で最初のワークフローを作成
2. 動作を確認
3. 慣れてきたら**VSCode**に移行
4. 複雑なワークフローは**VSCode**で編集

### 中級者以上の方

1. **VSCode**でローカルに作成
2. 拡張機能で構文チェック
3. GitHubにpush
4. 細かい修正は**GitHub UI**でも可

---

どちらの方法を選んでも、最終的には同じワークフローが作成されます！
自分に合った方法を選んでください 🚀
