# 🚀 ゼロから始めるCI/CD入門ガイド（GitHub UI版）
## GitHub Actionsで簡単なアプリをCI/CDする

---

## 📚 目次
1. [事前準備](#事前準備)
2. [ステップ1: 簡単なアプリを作る](#ステップ1-簡単なアプリを作る)
3. [ステップ2: GitHubにアップロードする](#ステップ2-githubにアップロードする)
4. [ステップ3: GitHub上でワークフローを作成（CI部分）](#ステップ3-github上でワークフローを作成ci部分)
5. [ステップ4: 自動テストを追加する](#ステップ4-自動テストを追加する)
6. [ステップ5: 自動デプロイを追加する（CD部分）](#ステップ5-自動デプロイを追加するcd部分)
7. [トラブルシューティング](#トラブルシューティング)

---

## 事前準備

### 必要なもの
- [ ] GitHubアカウント（無料）
- [ ] パソコン（WindowsでもMacでもOK）
- [ ] インターネット接続

### インストールするもの
1. **Git**
   - Windows: https://git-scm.com/download/win からダウンロード
   - Mac: ターミナルで `git --version` を実行（なければ自動でインストール案内が出ます）

2. **Node.js**（JavaScriptのアプリを作るため）
   - https://nodejs.org/ から「LTS版」をダウンロード
   - インストール後、コマンドプロンプト/ターミナルで確認：
     ```bash
     node --version
     npm --version
     ```

---

## ステップ1: 簡単なアプリを作る

### 1-1. プロジェクトフォルダを作成

作業用フォルダを作ります：

**Windowsの場合（コマンドプロンプト）**:
```bash
mkdir my-first-cicd-app
cd my-first-cicd-app
```

**Macの場合（ターミナル）**:
```bash
mkdir my-first-cicd-app
cd my-first-cicd-app
```

**🔍 これは何？**: `mkdir`は「make directory（フォルダを作る）」の略です

### 1-2. Node.jsプロジェクトを初期化

```bash
npm init -y
```

**🔍 これは何？**: プロジェクトの設定ファイル（`package.json`）を自動作成します

### 1-3. 簡単なアプリを作成

エディタ（メモ帳やVSCodeなど）で、以下の内容で `app.js` というファイルを作成：

```javascript
// 簡単な計算機アプリ
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

// 実行部分
console.log('計算機アプリ起動！');
console.log('5 + 3 =', add(5, 3));
console.log('10 - 4 =', subtract(10, 4));

// テスト用に関数をエクスポート
module.exports = { add, subtract };
```

### 1-4. アプリを実行してみる

```bash
node app.js
```

**✅ 成功の目安**: 以下のように表示されればOK！
```
計算機アプリ起動！
5 + 3 = 8
10 - 4 = 6
```

---

## ステップ2: GitHubにアップロードする

### 2-1. Gitの初期設定（初回のみ）

```bash
git config --global user.name "あなたの名前"
git config --global user.email "あなたのメールアドレス"
```

### 2-2. ローカルリポジトリを作成

```bash
git init
```

**🔍 これは何？**: このフォルダをGitで管理できるようにします（引っ越しの荷物にタグを付けるイメージ）

### 2-3. .gitignoreファイルを作成

エディタで以下の内容で `.gitignore` ファイルを作成：

```
node_modules/
.env
```

**🔍 これは何？**: GitHubにアップロードしないファイルを指定します

**⚠️ 注意**: ファイル名は `.gitignore` で、先頭にドット（.）が必要です

### 2-4. ファイルをコミット

```bash
git add .
git commit -m "初回コミット: 計算機アプリ作成"
```

**🔍 これは何？**: 
- `git add .` = 全ファイルを「アップロード候補」に追加
- `git commit` = 変更を記録（写真を撮るイメージ）

### 2-5. GitHubにリポジトリを作成

1. https://github.com にアクセスしてログイン
2. 右上の「**+**」→「**New repository**」をクリック
3. **Repository name**に「**my-first-cicd-app**」と入力
4. 「**Public**」を選択（無料でActionsを使うため）
5. **「Add a README file」などはチェックしない**（空のまま）
6. 「**Create repository**」をクリック

### 2-6. GitHubにプッシュ

GitHubのページに表示される指示のうち、「**…or push an existing repository from the command line**」のコマンドをコピーして実行：

```bash
git remote add origin https://github.com/あなたのユーザー名/my-first-cicd-app.git
git branch -M main
git push -u origin main
```

**✅ 成功の目安**: GitHubのページでファイル（`app.js`、`package.json`など）が見えればOK！

---

## ステップ3: GitHub上でワークフローを作成（CI部分）

ここからが本番！GitHub上でCI/CDを設定します。

### 3-1. Actionsタブを開く

1. GitHubのリポジトリページで「**Actions**」タブをクリック
2. 「**Get started with GitHub Actions**」というページが表示される
3. 「**set up a workflow yourself**」のリンクをクリック

**🔍 これは何？**: GitHub上でワークフローファイルを直接作成・編集できるエディタが開きます

### 3-2. ワークフローファイルを編集

エディタが開いたら、以下の内容に**すべて置き換えて**ください：

```yaml
name: CI Pipeline

# いつ実行するか
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

# 実行する処理
jobs:
  build-and-test:
    runs-on: ubuntu-latest
    
    steps:
    # 1. コードをチェックアウト（取得）
    - name: コードを取得
      uses: actions/checkout@v3
    
    # 2. Node.jsをセットアップ
    - name: Node.jsをセットアップ
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    # 3. 依存パッケージをインストール
    - name: 依存関係をインストール
      run: npm install
    
    # 4. アプリを実行
    - name: アプリを実行
      run: node app.js
```

**🔍 各部分の説明**:

- `name: CI Pipeline` = ワークフローの名前（自由に変更OK）
- `on: push:` = mainブランチにpushされたときに実行
- `jobs:` = 実際に行う作業の内容
- `runs-on: ubuntu-latest` = Linux環境で実行
- `steps:` = 上から順番に実行される手順

**例え話**: レストランの調理手順書のようなものです
1. 材料を取り出す（コードを取得）
2. 調理器具を準備する（Node.jsをセットアップ）
3. 下ごしらえをする（依存関係をインストール）
4. 料理を作る（アプリを実行）

### 3-3. ファイル名を確認

- 右上のファイル名が「**main.yml**」や「**blank.yml**」になっているので、**ci.yml**に変更
- パスは `.github/workflows/ci.yml` のままでOK

### 3-4. コミット（保存）

1. 右上の「**Commit changes...**」ボタンをクリック
2. ダイアログが表示されるので：
   - **Commit message**: 「CI設定を追加」などと入力
   - **Commit directly to the main branch** を選択
3. 「**Commit changes**」をクリック

**🎉 これでCI設定完了！**

### 3-5. 動作確認

1. 自動的に「**Actions**」タブに移動する（移動しない場合は手動でクリック）
2. 左側に「**CI Pipeline**」が表示される
3. 中央に実行中のワークフローが表示される
   - 🟡 黄色の丸：実行中
   - 🟢 緑のチェック：成功！
   - 🔴 赤のバツ：エラー
4. ワークフロー名をクリックすると詳細が見られる

**✅ 成功の目安**: 
- 緑色の✓マークが表示される
- 各ステップをクリックすると実行ログが見られる
- 「アプリを実行」のログに「計算機アプリ起動！」などが表示される

---

## ステップ4: 自動テストを追加する

### 4-1. ローカルにワークフローの変更を反映

GitHub上でファイルを変更したので、ローカルに取り込みます：

```bash
git pull
```

### 4-2. テストライブラリをインストール

```bash
npm install --save-dev jest
```

**🔍 これは何？**: Jest = JavaScript用のテストツール

### 4-3. package.jsonにテストコマンドを追加

`package.json` をエディタで開き、`"scripts"` セクションを以下のように編集：

```json
"scripts": {
  "test": "jest"
}
```

**完成形の例**:
```json
{
  "name": "my-first-cicd-app",
  "version": "1.0.0",
  "scripts": {
    "test": "jest"
  },
  "devDependencies": {
    "jest": "^29.7.0"
  }
}
```

### 4-4. テストファイルを作成

`app.test.js` というファイルを作成：

```javascript
const { add, subtract } = require('./app.js');

// addのテスト
test('5 + 3 は 8 になる', () => {
  expect(add(5, 3)).toBe(8);
});

test('0 + 0 は 0 になる', () => {
  expect(add(0, 0)).toBe(0);
});

// subtractのテスト
test('10 - 4 は 6 になる', () => {
  expect(subtract(10, 4)).toBe(6);
});

test('5 - 5 は 0 になる', () => {
  expect(subtract(5, 5)).toBe(0);
});
```

**🔍 これは何？**: 
- `test()`: テストケースを定義
- `expect()`: 期待する結果
- `toBe()`: 実際の結果と比較

**例え話**: 商品の品質チェックのようなものです
「この計算機は正しく動くか？」を自動でチェック

### 4-5. ローカルでテスト実行

```bash
npm test
```

**✅ 成功の目安**: 
```
PASS  ./app.test.js
✓ 5 + 3 は 8 になる
✓ 0 + 0 は 0 になる
✓ 10 - 4 は 6 になる
✓ 5 - 5 は 0 になる
```

### 4-6. GitHub上でワークフローにテストを追加

1. GitHubのリポジトリページで「**Actions**」タブをクリック
2. 左側の「**CI Pipeline**」をクリック
3. 右上の「**...** (3点メニュー)」→「**View workflow file**」をクリック
4. 鉛筆マーク（✏️ Edit）をクリック

以下のように編集（`# 4. アプリを実行`の**前に**テストを追加）：

```yaml
name: CI Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    
    steps:
    - name: コードを取得
      uses: actions/checkout@v3
    
    - name: Node.jsをセットアップ
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: 依存関係をインストール
      run: npm install
    
    # ⭐ テストを追加！
    - name: テストを実行
      run: npm test
    
    - name: アプリを実行
      run: node app.js
```

### 4-7. 変更をコミット

1. 右上の「**Commit changes...**」をクリック
2. Commit message: 「自動テストを追加」
3. 「**Commit changes**」をクリック

### 4-8. ローカルファイルもコミット＆プッシュ

```bash
git add .
git commit -m "テストファイルとJestを追加"
git push
```

### 4-9. 動作確認

Actionsタブで、2つのワークフローが実行されているのを確認！
両方とも緑のチェックマークが付けばテスト成功🎉

---

## ステップ5: 自動デプロイを追加する（CD部分）

ここでは、GitHub Pagesに簡単なWebページを自動デプロイします。

### 5-1. 簡単なHTMLページを作成

ローカルで`index.html` を作成：

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>私の計算機アプリ</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      background-color: #f0f0f0;
    }
    .calculator {
      background: white;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    h1 {
      color: #333;
    }
    input {
      width: 100%;
      padding: 10px;
      margin: 10px 0;
      font-size: 16px;
      box-sizing: border-box;
    }
    button {
      background: #007bff;
      color: white;
      border: none;
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      border-radius: 5px;
      margin: 5px;
    }
    button:hover {
      background: #0056b3;
    }
    #result {
      margin-top: 20px;
      font-size: 20px;
      font-weight: bold;
      color: #28a745;
    }
  </style>
</head>
<body>
  <div class="calculator">
    <h1>🧮 簡単な計算機</h1>
    <p>CI/CDで自動デプロイされました！</p>
    
    <input type="number" id="num1" placeholder="数値1を入力">
    <input type="number" id="num2" placeholder="数値2を入力">
    
    <button onclick="calculate('add')">足し算</button>
    <button onclick="calculate('subtract')">引き算</button>
    
    <div id="result"></div>
  </div>

  <script>
    function calculate(operation) {
      const num1 = parseFloat(document.getElementById('num1').value);
      const num2 = parseFloat(document.getElementById('num2').value);
      let result;
      
      if (operation === 'add') {
        result = num1 + num2;
      } else if (operation === 'subtract') {
        result = num1 - num2;
      }
      
      document.getElementById('result').textContent = `結果: ${result}`;
    }
  </script>
</body>
</html>
```

### 5-2. ファイルをコミット＆プッシュ

```bash
git add index.html
git commit -m "計算機のHTMLページを追加"
git push
```

### 5-3. GitHub上でデプロイ用ワークフローを作成

1. GitHubのリポジトリページで「**Actions**」タブをクリック
2. 「**New workflow**」ボタンをクリック
3. 「**set up a workflow yourself**」をクリック

### 5-4. デプロイ用ワークフローの内容

エディタの内容を以下に置き換え：

```yaml
name: Deploy to GitHub Pages

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

**🔍 これは何？**: 
- mainブランチが更新されたら、自動的にGitHub Pagesに公開する設定
- `publish_dir: ./` = プロジェクトのルートフォルダを公開

**例え話**: 新しい料理ができたら、自動的にお店に並べるようなもの

### 5-5. ファイル名を変更してコミット

1. ファイル名を **deploy.yml** に変更
2. 「**Commit changes...**」をクリック
3. Commit message: 「GitHub Pagesへのデプロイを追加」
4. 「**Commit changes**」をクリック

### 5-6. 権限設定を変更

デプロイには書き込み権限が必要です：

1. リポジトリの「**Settings**」タブをクリック
2. 左メニューから「**Actions**」→「**General**」を選択
3. 下にスクロールして「**Workflow permissions**」セクションを探す
4. **「Read and write permissions」**を選択
5. 「**Save**」をクリック

### 5-7. GitHub Pagesを有効化

1. 「**Settings**」タブのまま
2. 左メニューから「**Pages**」をクリック
3. 「**Source**」で「**Deploy from a branch**」を選択
4. 「**Branch**」で「**gh-pages**」を選択（まだ表示されない場合は次のステップへ）
5. フォルダは「**/ (root)**」を選択
6. 「**Save**」をクリック

**💡 注意**: `gh-pages`ブランチは、デプロイワークフローが一度実行されると自動作成されます

### 5-8. デプロイを実行

権限を変更したので、もう一度ワークフローをトリガーします：

```bash
# ローカルで最新の変更を取得
git pull

# 空のコミットを作成してpush
git commit --allow-empty -m "デプロイをトリガー"
git push
```

### 5-9. 動作確認

1. 「**Actions**」タブで「**Deploy to GitHub Pages**」が実行されるのを確認
2. 緑のチェックマークが付くまで待つ（1〜2分）
3. 「**Settings**」→「**Pages**」を開く
4. 上部に公開URLが表示される：
   ```
   Your site is live at https://あなたのユーザー名.github.io/my-first-cicd-app/
   ```
5. URLをクリックして計算機アプリが表示されればCD成功！

**✅ 成功の目安**: ブラウザで計算機が動作すれば完璧！

---

## 🎉 完成！あなたはCI/CDを実現しました！

### 今、何ができるようになったか

1. **コードを書く** → `git push` で自動的に...
2. **CI（継続的インテグレーション）** が実行される
   - コードの取得
   - テストの実行
   - エラーチェック
3. **CD（継続的デプロイ）** が実行される
   - 自動的にGitHub Pagesに公開

### 実際に試してみよう！

計算機に掛け算機能を追加してみましょう！

#### index.htmlに掛け算ボタンを追加

`<button onclick="calculate('subtract')">引き算</button>`の下に追加：

```html
<button onclick="calculate('multiply')">掛け算</button>
```

`calculate`関数内に追加：

```javascript
function calculate(operation) {
  const num1 = parseFloat(document.getElementById('num1').value);
  const num2 = parseFloat(document.getElementById('num2').value);
  let result;
  
  if (operation === 'add') {
    result = num1 + num2;
  } else if (operation === 'subtract') {
    result = num1 - num2;
  } else if (operation === 'multiply') {
    result = num1 * num2;  // ← これを追加
  }
  
  document.getElementById('result').textContent = `結果: ${result}`;
}
```

#### プッシュする

```bash
git add .
git commit -m "掛け算機能を追加"
git push
```

Actionsタブで、自動的にテストとデプロイが実行されるのを確認！
数分後、公開サイトに掛け算ボタンが追加されています🎉

---

## トラブルシューティング

### ❌ Actionsでエラーが出る

**症状**: ワークフローが赤い✗マークになる

**解決方法**:
1. Actionsタブでエラーログを確認
2. よくあるエラー：
   - `npm install`失敗 → `package.json`の記述ミスをチェック
   - テスト失敗 → `npm test`をローカルで実行して確認
   - 権限エラー → Settings > Actions > General で「Read and write permissions」を有効化

### ❌ GitHub Pagesが表示されない

**解決方法**:
1. Settings > Pages で`gh-pages`ブランチが選択されているか確認
2. Actionsタブで「Deploy to GitHub Pages」が成功（緑チェック）しているか確認
3. 5〜10分待ってから再度アクセス
4. ブラウザのキャッシュをクリア（Ctrl+Shift+R / Cmd+Shift+R）

### ❌ "Resource not accessible by integration"エラー

**解決方法**:
Settings > Actions > General > Workflow permissions で
「**Read and write permissions**」を選択して保存

### ❌ gh-pagesブランチが表示されない

**解決方法**:
1. まず「Deploy to GitHub Pages」ワークフローを1回実行させる
2. 実行後、自動的に`gh-pages`ブランチが作成される
3. その後、Settings > Pages で選択できるようになる

---

## 📚 次のステップ

1. **他のテストケースを追加**
   - 負の数の計算
   - 小数点の計算
   - エラーハンドリング

2. **CSSを改善**
   - もっとおしゃれなデザインに
   - レスポンシブ対応

3. **より複雑なアプリに挑戦**
   - React/Vueなどのフレームワーク
   - バックエンドAPI

4. **CI/CDを深く学ぶ**
   - 環境変数の使い方
   - マルチステージデプロイ
   - ロールバック戦略

---

## 🎯 まとめ

**CI/CD = コードの変更を自動的にテスト＆公開する仕組み**

- **CI**: コードを変更したら自動テスト（品質チェック）
- **CD**: テストが通ったら自動公開（お客さんに届ける）

**メリット**:
- 手作業のミスが減る
- リリースが速くなる
- いつでも安心してコードを変更できる

**あなたが作ったワークフロー**:
1. `ci.yml` - コードをテストする（CI）
2. `deploy.yml` - GitHub Pagesに公開する（CD）

あなたは今、現代的なソフトウェア開発の基礎を身につけました！🎉

**公開URL**: https://あなたのユーザー名.github.io/my-first-cicd-app/