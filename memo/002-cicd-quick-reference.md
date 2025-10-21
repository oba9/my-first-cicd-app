# 🎓 CI/CD 重要概念クイックリファレンス

## 📖 基本用語集

### CI（Continuous Integration / 継続的インテグレーション）
**簡単に言うと**: コードの変更を頻繁に統合して、自動テストする仕組み

**例え話**: 
料理人が新しいレシピを試すたびに、味見係が自動的にチェックしてくれるシステム

**具体的にやること**:
- ✅ コードをpushすると自動でテスト実行
- ✅ ビルドが成功するかチェック
- ✅ コードの品質をチェック
- ✅ エラーがあればすぐに通知

**メリット**:
- バグを早期発見できる
- 複数人で開発してもコードの衝突が減る
- 常に動作するコードを維持できる

---

### CD（Continuous Delivery / Deployment）
**簡単に言うと**: テストに合格したコードを自動的に本番環境に届ける仕組み

**Continuous DeliveryとDeploymentの違い**:
- **Delivery**: 自動でデプロイ「準備」まで（最後のボタンは人間が押す）
- **Deployment**: 完全自動でデプロイ（ボタンを押すのも自動）

**例え話**:
- **Delivery**: 料理を厨房から受け渡しカウンターまで自動で運ぶ（店員が客に渡す）
- **Deployment**: 料理を厨房から客のテーブルまで自動で運ぶ（全自動）

**具体的にやること**:
- ✅ テスト合格後、自動でデプロイ
- ✅ 環境設定を自動化
- ✅ ロールバック（元に戻す）の準備
- ✅ 監視とログの記録

---

## 🔧 GitHub Actions の基本構成

### ワークフローファイルの構造

```yaml
name: ワークフローの名前

on: いつ実行するか（トリガー）

jobs: 何をするか（処理内容）
  job-name:
    runs-on: どこで実行するか（環境）
    steps: 具体的な手順
      - name: 手順の名前
        run: 実行するコマンド
```

### よく使うトリガー（on:）

| トリガー | 説明 | 使用例 |
|---------|------|--------|
| `push` | コードがpushされたとき | mainブランチ更新時 |
| `pull_request` | PRが作られたとき | コードレビュー前 |
| `schedule` | 定期実行 | 毎日深夜にテスト |
| `workflow_dispatch` | 手動実行 | ボタンクリックで実行 |

**例**:
```yaml
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
```

### よく使う実行環境（runs-on:）

| 環境 | 説明 |
|------|------|
| `ubuntu-latest` | Linux（最も一般的） |
| `windows-latest` | Windows |
| `macos-latest` | macOS |

---

## 🛠️ よく使うActions（uses:）

### 公式Actions

```yaml
# 1. コードを取得
- uses: actions/checkout@v3

# 2. Node.jsをセットアップ
- uses: actions/setup-node@v3
  with:
    node-version: '18'

# 3. Pythonをセットアップ
- uses: actions/setup-python@v4
  with:
    python-version: '3.11'

# 4. Javaをセットアップ
- uses: actions/setup-java@v3
  with:
    java-version: '17'
```

### サードパーティActions

```yaml
# GitHub Pagesにデプロイ
- uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./dist
```

---

## 🔐 シークレット（秘密情報）の管理

### シークレットとは？
APIキーやパスワードなど、公開してはいけない情報

### 設定方法
1. GitHubリポジトリ → Settings
2. Secrets and variables → Actions
3. New repository secret

### 使い方
```yaml
steps:
  - name: デプロイ
    run: deploy.sh
    env:
      API_KEY: ${{ secrets.MY_API_KEY }}
```

**⚠️ 重要**: シークレットはコードに直接書いてはダメ！

---

## 📊 ワークフローの状態

### ステータスバッジ

GitHubのREADME.mdに表示できるバッジ：

```markdown
![CI](https://github.com/ユーザー名/リポジトリ名/workflows/CI/badge.svg)
```

### ステータスの意味

| アイコン | 状態 | 意味 |
|---------|------|------|
| 🟢 ✓ | Success | すべて成功 |
| 🔴 ✗ | Failure | エラー発生 |
| 🟡 ● | In progress | 実行中 |
| ⚪ ○ | Skipped | スキップされた |

---

## 🚀 デプロイ先の選択肢

### 無料で使える主なサービス

| サービス | 特徴 | おすすめ用途 |
|---------|------|------------|
| **GitHub Pages** | 静的サイト専用 | ポートフォリオ、ドキュメント |
| **Vercel** | Next.js/Reactに最適 | Webアプリ |
| **Netlify** | 静的サイト + 関数 | JAMstackアプリ |
| **Heroku** | バックエンドも可 | フルスタックアプリ |
| **Railway** | DB込みで簡単 | 小規模アプリ |

---

## 🎯 CI/CDのベストプラクティス

### 1. テストを書く習慣
```javascript
// ❌ 悪い例：テストなし
function calculate(a, b) {
  return a + b;
}

// ✅ 良い例：テストあり
function calculate(a, b) {
  return a + b;
}

test('計算が正しい', () => {
  expect(calculate(2, 3)).toBe(5);
});
```

### 2. 小さく頻繁にpush
- ❌ 1週間分の変更をまとめてpush
- ✅ 1機能ごとに小さくpush

### 3. mainブランチを守る
- ❌ 直接mainにpush
- ✅ ブランチを作ってPR経由でマージ

### 4. 失敗したらすぐ修正
- ❌ CIが赤いまま放置
- ✅ すぐに原因を調査して修正

---

## 🐛 トラブルシューティングチェックリスト

### ワークフローが実行されない
- [ ] `.github/workflows/` にファイルがあるか？
- [ ] YAMLの構文は正しいか？（インデントに注意）
- [ ] トリガー（`on:`）は正しいか？
- [ ] Actionsが有効化されているか？（Settings > Actions）

### テストが失敗する
- [ ] ローカルでテストは通るか？
- [ ] 依存パッケージはインストールされているか？
- [ ] 環境変数は設定されているか？
- [ ] Node.jsのバージョンは合っているか？

### デプロイが失敗する
- [ ] 権限設定は正しいか？（Settings > Actions > Permissions）
- [ ] シークレットは設定されているか？
- [ ] デプロイ先のサービスは正常か？
- [ ] ビルドは成功しているか？

### 権限エラーが出る
```
Error: Resource not accessible by integration
```
→ Settings > Actions > General > Workflow permissions
→ "Read and write permissions" を選択

---

## 📈 段階的な導入ステップ

### レベル1: 超基本
```yaml
# コードをpushしたら実行するだけ
on: push
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: echo "Hello CI/CD!"
```

### レベル2: テスト追加
```yaml
# テストを自動実行
steps:
  - uses: actions/checkout@v3
  - uses: actions/setup-node@v3
  - run: npm install
  - run: npm test
```

### レベル3: デプロイ追加
```yaml
# テストが通ったらデプロイ
jobs:
  test:
    # テスト処理
  deploy:
    needs: test  # testが成功したら実行
    # デプロイ処理
```

### レベル4: 環境分離
```yaml
# 開発環境と本番環境を分ける
jobs:
  deploy-staging:
    if: github.ref == 'refs/heads/develop'
  deploy-production:
    if: github.ref == 'refs/heads/main'
```

---

## 🎨 使える例文テンプレート集

### シンプルなNode.jsアプリ用
```yaml
name: Node.js CI

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: npm run build
```

### Pythonアプリ用
```yaml
name: Python CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-python@v4
        with:
          python-version: '3.11'
      - run: pip install -r requirements.txt
      - run: pytest
```

### 静的サイトデプロイ用
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

---

## 💡 よくある質問（FAQ）

### Q1: CIとCDは必ずセットで使う？
**A**: いいえ。CIだけでも十分価値があります。テストを自動化するだけでも開発効率が上がります。

### Q2: GitHub Actions以外のCI/CDツールは？
**A**: 主なツール：
- GitLab CI/CD
- CircleCI
- Jenkins
- Travis CI
- Azure Pipelines

### Q3: お金はかかる？
**A**: GitHub Actionsは：
- **Public リポジトリ**: 完全無料
- **Private リポジトリ**: 月2,000分まで無料

### Q4: ローカルでテストできる？
**A**: はい！`act`というツールを使えばローカルで実行可能：
```bash
brew install act
act
```

### Q5: エラーログはどこで見る？
**A**: GitHub > リポジトリ > Actions タブ > 該当のワークフローをクリック

---

## 🔗 参考リンク

### 公式ドキュメント
- [GitHub Actions 公式ドキュメント](https://docs.github.com/ja/actions)
- [GitHub Marketplace（Actions）](https://github.com/marketplace?type=actions)

### 学習リソース
- [GitHub Skills（インタラクティブ学習）](https://skills.github.com/)
- [GitHub Actions Examples](https://github.com/sdras/awesome-actions)

### コミュニティ
- [GitHub Community Forum](https://github.community/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/github-actions)

---

## ✅ CI/CD チェックリスト

自分のプロジェクトをチェックしてみましょう！

### 基本設定
- [ ] `.github/workflows/` フォルダが存在する
- [ ] ワークフローファイル（.yml）が存在する
- [ ] mainブランチへのpushでワークフローが実行される

### テスト
- [ ] 自動テストが設定されている
- [ ] テストが定期的に実行される
- [ ] テスト失敗時に通知が来る

### デプロイ
- [ ] mainブランチへのpushで自動デプロイされる
- [ ] デプロイ先のURLにアクセスできる
- [ ] ロールバック方法を理解している

### セキュリティ
- [ ] シークレットが適切に管理されている
- [ ] APIキーがコードに含まれていない
- [ ] 権限設定が適切

### ドキュメント
- [ ] README.mdにビルドステータスバッジがある
- [ ] セットアップ手順が記載されている
- [ ] トラブルシューティング情報がある

---

## 🎉 おめでとうございます！

このクイックリファレンスを見ながら、自分のプロジェクトにCI/CDを導入していきましょう！

**覚えておきたい3つのポイント**:
1. 🧪 **テストを書く**: コードの品質を保つ
2. 🚀 **小さく頻繁に**: 変更を細かく分けてpush
3. 🔄 **繰り返す**: CI/CDは一度設定したら終わりではなく、改善し続けるもの

始めは完璧を目指さず、少しずつ自動化していくのがコツです！
