# 🧪 ゼロから始めるJest入門ガイド
## JavaScriptテストの基礎から実践まで

---

## 📚 目次
1. [Jestとは？](#1-jestとは)
2. [環境準備](#2-環境準備)
3. [最初のテストを書く](#3-最初のテストを書く)
4. [テストの基本文法](#4-テストの基本文法)
5. [マッチャー完全ガイド](#5-マッチャー完全ガイド)
6. [実践的なテスト例](#6-実践的なテスト例)
7. [テストの整理とベストプラクティス](#7-テストの整理とベストプラクティス)
8. [トラブルシューティング](#8-トラブルシューティング)

---

## 1. Jestとは？

### Jestの説明

**Jest = JavaScriptのテストツール**

**例え話**:
レストランに例えると、Jestは「品質チェック係」です。
- 料理人（開発者）が新しい料理（コード）を作る
- 品質チェック係（Jest）が「味は大丈夫？」「見た目は？」とチェック
- 合格したら客（ユーザー）に提供

### なぜテストが必要？

**テストなし**:
```javascript
function add(a, b) {
  return a + b;
}

// 動くかな...？たぶん大丈夫...？
// バグがあっても気づかない！
```

**テストあり**:
```javascript
function add(a, b) {
  return a + b;
}

test('5 + 3 は 8 になる', () => {
  expect(add(5, 3)).toBe(8);  // ✅ 自動でチェック！
});
```

### Jestの特徴

| 特徴 | 説明 |
|------|------|
| ⚡ 速い | 並列実行でテストが高速 |
| 📦 簡単 | 設定ほぼゼロで使える |
| 🎯 わかりやすい | エラーメッセージが親切 |
| 🔧 多機能 | カバレッジ、モック、スナップショット対応 |

---

## 2. 環境準備

### 前提条件

以下がインストール済みであること:
- ✅ Node.js（バージョン14以上）
- ✅ npm（Node.jsに同梱）

**確認方法**:
```bash
node --version
# v18.0.0 などと表示されればOK

npm --version
# 9.0.0 などと表示されればOK
```

### プロジェクトの作成

#### ステップ1: プロジェクトフォルダを作成

```bash
# フォルダを作成
mkdir jest-practice
cd jest-practice

# package.jsonを生成
npm init -y
```

**✅ 成功の目安**: `package.json`ファイルが作成される

#### ステップ2: Jestをインストール

```bash
npm install --save-dev jest
```

**🔍 これは何？**:
- `npm install`: パッケージをインストール
- `--save-dev`: 開発時のみ使用（本番環境には不要）
- `jest`: Jestパッケージ

**✅ 成功の目安**: 
```
added 300 packages...  ← こんな感じのメッセージ
```

`package.json`に以下が追加される:
```json
"devDependencies": {
  "jest": "^29.7.0"
}
```

#### ステップ3: テストコマンドを設定

`package.json`を開いて、`"scripts"`セクションを編集:

**編集前**:
```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

**編集後**:
```json
"scripts": {
  "test": "jest"
}
```

**完成形**:
```json
{
  "name": "jest-practice",
  "version": "1.0.0",
  "scripts": {
    "test": "jest"
  },
  "devDependencies": {
    "jest": "^29.7.0"
  }
}
```

---

## 3. 最初のテストを書く

### 超シンプルな例

#### ステップ1: テスト対象のコードを作成

`math.js`というファイルを作成:

```javascript
// 足し算をする関数
function add(a, b) {
  return a + b;
}

// この関数を他のファイルから使えるようにする
module.exports = { add };
```

**🔍 これは何？**:
- `function add(a, b)`: 2つの数を足す関数
- `module.exports`: 他のファイルから使えるようにする（重要！）

#### ステップ2: テストファイルを作成

`math.test.js`というファイルを作成:

```javascript
// テスト対象の関数を読み込む
const { add } = require('./math.js');

// テストを書く
test('5 + 3 は 8 になる', () => {
  expect(add(5, 3)).toBe(8);
});
```

**🔍 これは何？**:
- `require('./math.js')`: math.jsから関数を読み込む
- `test()`: テストを定義する関数
- `expect()`: 期待する結果
- `.toBe()`: 実際の結果と比較

**命名規則**:
```
テスト対象: math.js
テストファイル: math.test.js  ← .test.js を付ける
```

#### ステップ3: テストを実行

```bash
npm test
```

**✅ 成功すると**:
```
PASS  ./math.test.js
  ✓ 5 + 3 は 8 になる (2 ms)

Tests:       1 passed, 1 total
Time:        1.234 s
```

**❌ 失敗すると**:
```
FAIL  ./math.test.js
  ✕ 5 + 3 は 8 になる (5 ms)

  Expected: 8
  Received: 9

Tests:       1 failed, 1 total
```

**🎉 おめでとうございます！最初のテストが完成しました！**

---

## 4. テストの基本文法

### test() と it() の使い分け

**どちらも同じ機能**:
```javascript
// 書き方1: test()
test('5 + 3 は 8 になる', () => {
  expect(add(5, 3)).toBe(8);
});

// 書き方2: it()（まったく同じ）
it('5 + 3 は 8 になる', () => {
  expect(add(5, 3)).toBe(8);
});
```

**どちらを使う？**:
- `test()`: シンプルでわかりやすい（**初心者におすすめ**）
- `it()`: 英語として自然（`it should...`の形）

### テストの構造

```javascript
test('テストの説明', () => {
  // テストコード
});
```

**3つの部分**:
1. **テストの説明**（文字列）
   - 何をテストするか
   - 日本語OK
   
2. **アロー関数** `() => {}`
   - テストの本体を囲む
   
3. **テストコード**
   - `expect()`を使って検証

### expect() の使い方

**基本形**:
```javascript
expect(実際の値).toBe(期待する値);
```

**例**:
```javascript
// 計算結果をテスト
expect(2 + 2).toBe(4);

// 関数の戻り値をテスト
expect(add(5, 3)).toBe(8);

// 変数の値をテスト
const result = add(10, 20);
expect(result).toBe(30);
```

**例え話**:
`expect()`は「答え合わせ」
- 先生（expect）: 「2 + 2 の答えは？」
- 生徒: 「4です！」
- 先生: 「正解！（toBe(4)）」

---

## 5. マッチャー完全ガイド

**マッチャー = 「どう比較するか」を決めるメソッド**

### 5-1. 基本的なマッチャー

#### toBe() - 厳密な等価性

```javascript
test('厳密に等しい', () => {
  expect(2 + 2).toBe(4);           // ✅ 合格
  expect('hello').toBe('hello');    // ✅ 合格
  expect(true).toBe(true);          // ✅ 合格
});
```

**注意**: オブジェクトや配列では使えない
```javascript
test('オブジェクトの比較', () => {
  expect({a: 1}).toBe({a: 1});  // ❌ 失敗！
  // 理由: 別々のオブジェクトとして扱われる
});
```

#### toEqual() - 値の等価性

```javascript
test('値が等しい', () => {
  // オブジェクトの比較
  expect({a: 1, b: 2}).toEqual({a: 1, b: 2});  // ✅ 合格
  
  // 配列の比較
  expect([1, 2, 3]).toEqual([1, 2, 3]);         // ✅ 合格
});
```

**使い分け**:
```javascript
// プリミティブ型（数値、文字列など）
expect(5).toBe(5);        // これを使う

// オブジェクト、配列
expect({a: 1}).toEqual({a: 1});  // これを使う
```

---

### 5-2. 真偽値のマッチャー

```javascript
test('真偽値のテスト', () => {
  // 真（true）
  expect(true).toBe(true);
  expect(1 > 0).toBeTruthy();      // 真として評価される値
  
  // 偽（false）
  expect(false).toBe(false);
  expect(0).toBeFalsy();           // 偽として評価される値
  
  // null, undefined
  expect(null).toBeNull();
  expect(undefined).toBeUndefined();
  
  // 定義されている
  const value = 'hello';
  expect(value).toBeDefined();
});
```

**偽として評価される値**:
- `false`
- `0`
- `''`（空文字列）
- `null`
- `undefined`
- `NaN`

---

### 5-3. 数値のマッチャー

```javascript
test('数値の比較', () => {
  const value = 10;
  
  // より大きい
  expect(value).toBeGreaterThan(5);           // 10 > 5 ✅
  
  // 以上
  expect(value).toBeGreaterThanOrEqual(10);   // 10 >= 10 ✅
  
  // より小さい
  expect(value).toBeLessThan(20);             // 10 < 20 ✅
  
  // 以下
  expect(value).toBeLessThanOrEqual(10);      // 10 <= 10 ✅
});

test('浮動小数点の比較', () => {
  const value = 0.1 + 0.2;
  
  // 浮動小数点は toBeCloseTo を使う
  expect(value).toBeCloseTo(0.3);  // ✅ 合格
  expect(value).toBe(0.3);         // ❌ 失敗（0.30000000000000004になるため）
});
```

---

### 5-4. 文字列のマッチャー

```javascript
test('文字列の検証', () => {
  const text = 'Hello World';
  
  // 完全一致
  expect(text).toBe('Hello World');
  
  // 部分一致（含む）
  expect(text).toContain('World');       // ✅ 合格
  expect(text).toContain('Hello');       // ✅ 合格
  expect(text).toContain('Bye');         // ❌ 失敗
  
  // 正規表現
  expect(text).toMatch(/World/);         // ✅ 合格
  expect(text).toMatch(/^Hello/);        // ✅ 先頭がHello
  expect(text).toMatch(/World$/);        // ✅ 末尾がWorld
});
```

---

### 5-5. 配列のマッチャー

```javascript
test('配列の検証', () => {
  const fruits = ['apple', 'banana', 'orange'];
  
  // 配列に要素が含まれる
  expect(fruits).toContain('apple');     // ✅ 合格
  expect(fruits).toContain('grape');     // ❌ 失敗
  
  // 配列の長さ
  expect(fruits).toHaveLength(3);        // ✅ 合格
  
  // 配列全体の比較
  expect(fruits).toEqual(['apple', 'banana', 'orange']);  // ✅ 合格
});
```

---

### 5-6. オブジェクトのマッチャー

```javascript
test('オブジェクトの検証', () => {
  const user = {
    name: 'Alice',
    age: 25,
    email: 'alice@example.com'
  };
  
  // プロパティの存在
  expect(user).toHaveProperty('name');           // ✅ 合格
  expect(user).toHaveProperty('name', 'Alice');  // ✅ 値も確認
  
  // 部分的な一致
  expect(user).toMatchObject({
    name: 'Alice',
    age: 25
  });  // ✅ email は無視される
  
  // 完全一致
  expect(user).toEqual({
    name: 'Alice',
    age: 25,
    email: 'alice@example.com'
  });
});
```

---

### 5-7. 否定（not）

**すべてのマッチャーに`.not`を付けられる**:

```javascript
test('否定のテスト', () => {
  // ～でない
  expect(5).not.toBe(3);
  expect('hello').not.toBe('world');
  
  // 含まない
  expect([1, 2, 3]).not.toContain(4);
  
  // nullでない
  expect('value').not.toBeNull();
  
  // 等しくない
  expect({a: 1}).not.toEqual({a: 2});
});
```

---

### 5-8. 例外（エラー）のマッチャー

```javascript
function divide(a, b) {
  if (b === 0) {
    throw new Error('0で割ることはできません');
  }
  return a / b;
}

test('エラーが発生する', () => {
  // エラーが投げられることを期待
  expect(() => divide(10, 0)).toThrow();
  
  // 特定のエラーメッセージ
  expect(() => divide(10, 0)).toThrow('0で割ることはできません');
  
  // 正規表現でメッセージを確認
  expect(() => divide(10, 0)).toThrow(/割ることはできません/);
});

test('エラーが発生しない', () => {
  // エラーが投げられないことを期待
  expect(() => divide(10, 2)).not.toThrow();
});
```

**⚠️ 注意**: 関数は`() =>`で囲む必要がある
```javascript
❌ 間違い:
expect(divide(10, 0)).toThrow();  // すぐに実行されてしまう

✅ 正しい:
expect(() => divide(10, 0)).toThrow();  // 関数として渡す
```

---

## 6. 実践的なテスト例

### 例1: 電卓アプリのテスト

#### calculator.js
```javascript
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('0で割ることはできません');
  }
  return a / b;
}

module.exports = { add, subtract, multiply, divide };
```

#### calculator.test.js
```javascript
const { add, subtract, multiply, divide } = require('./calculator');

// グループ化
describe('電卓の機能', () => {
  
  // 足し算のテスト
  describe('add関数', () => {
    test('正の数の足し算', () => {
      expect(add(5, 3)).toBe(8);
    });
    
    test('負の数の足し算', () => {
      expect(add(-5, -3)).toBe(-8);
    });
    
    test('0との足し算', () => {
      expect(add(5, 0)).toBe(5);
    });
  });
  
  // 引き算のテスト
  describe('subtract関数', () => {
    test('正の数の引き算', () => {
      expect(subtract(10, 4)).toBe(6);
    });
    
    test('結果が負になる引き算', () => {
      expect(subtract(3, 5)).toBe(-2);
    });
  });
  
  // 掛け算のテスト
  describe('multiply関数', () => {
    test('正の数の掛け算', () => {
      expect(multiply(5, 3)).toBe(15);
    });
    
    test('0との掛け算', () => {
      expect(multiply(5, 0)).toBe(0);
    });
  });
  
  // 割り算のテスト
  describe('divide関数', () => {
    test('正の数の割り算', () => {
      expect(divide(10, 2)).toBe(5);
    });
    
    test('小数の割り算', () => {
      expect(divide(10, 3)).toBeCloseTo(3.333, 2);
    });
    
    test('0で割るとエラー', () => {
      expect(() => divide(10, 0)).toThrow('0で割ることはできません');
    });
  });
});
```

**実行結果**:
```
 PASS  ./calculator.test.js
  電卓の機能
    add関数
      ✓ 正の数の足し算 (2 ms)
      ✓ 負の数の足し算
      ✓ 0との足し算
    subtract関数
      ✓ 正の数の引き算
      ✓ 結果が負になる引き算
    multiply関数
      ✓ 正の数の掛け算
      ✓ 0との掛け算
    divide関数
      ✓ 正の数の割り算
      ✓ 小数の割り算
      ✓ 0で割るとエラー

Tests:       10 passed, 10 total
```

---

### 例2: ユーザー情報の検証

#### user.js
```javascript
function createUser(name, age, email) {
  // バリデーション
  if (!name || name.trim() === '') {
    throw new Error('名前は必須です');
  }
  
  if (age < 0 || age > 150) {
    throw new Error('年齢が不正です');
  }
  
  if (!email.includes('@')) {
    throw new Error('メールアドレスが不正です');
  }
  
  return {
    name: name.trim(),
    age: age,
    email: email.toLowerCase(),
    createdAt: new Date()
  };
}

function isAdult(user) {
  return user.age >= 18;
}

module.exports = { createUser, isAdult };
```

#### user.test.js
```javascript
const { createUser, isAdult } = require('./user');

describe('ユーザー管理', () => {
  
  describe('createUser関数', () => {
    test('正常なユーザーを作成', () => {
      const user = createUser('Alice', 25, 'alice@example.com');
      
      expect(user).toHaveProperty('name', 'Alice');
      expect(user).toHaveProperty('age', 25);
      expect(user).toHaveProperty('email', 'alice@example.com');
      expect(user).toHaveProperty('createdAt');
      expect(user.createdAt).toBeInstanceOf(Date);
    });
    
    test('メールアドレスを小文字に変換', () => {
      const user = createUser('Bob', 30, 'BOB@EXAMPLE.COM');
      expect(user.email).toBe('bob@example.com');
    });
    
    test('名前の前後の空白を削除', () => {
      const user = createUser('  Charlie  ', 20, 'charlie@example.com');
      expect(user.name).toBe('Charlie');
    });
    
    test('名前が空の場合エラー', () => {
      expect(() => createUser('', 25, 'test@example.com'))
        .toThrow('名前は必須です');
    });
    
    test('年齢が負の場合エラー', () => {
      expect(() => createUser('Alice', -1, 'alice@example.com'))
        .toThrow('年齢が不正です');
    });
    
    test('年齢が150を超える場合エラー', () => {
      expect(() => createUser('Alice', 151, 'alice@example.com'))
        .toThrow('年齢が不正です');
    });
    
    test('メールアドレスが不正な場合エラー', () => {
      expect(() => createUser('Alice', 25, 'invalid-email'))
        .toThrow('メールアドレスが不正です');
    });
  });
  
  describe('isAdult関数', () => {
    test('18歳以上は成人', () => {
      const user = createUser('Adult', 18, 'adult@example.com');
      expect(isAdult(user)).toBe(true);
    });
    
    test('18歳未満は未成年', () => {
      const user = createUser('Child', 17, 'child@example.com');
      expect(isAdult(user)).toBe(false);
    });
    
    test('30歳は成人', () => {
      const user = createUser('Senior', 30, 'senior@example.com');
      expect(isAdult(user)).toBe(true);
    });
  });
});
```

---

### 例3: 配列操作のテスト

#### arrayUtils.js
```javascript
function findMax(numbers) {
  if (numbers.length === 0) {
    return null;
  }
  return Math.max(...numbers);
}

function findMin(numbers) {
  if (numbers.length === 0) {
    return null;
  }
  return Math.min(...numbers);
}

function average(numbers) {
  if (numbers.length === 0) {
    return 0;
  }
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}

function removeDuplicates(array) {
  return [...new Set(array)];
}

module.exports = { findMax, findMin, average, removeDuplicates };
```

#### arrayUtils.test.js
```javascript
const { findMax, findMin, average, removeDuplicates } = require('./arrayUtils');

describe('配列ユーティリティ', () => {
  
  describe('findMax関数', () => {
    test('最大値を見つける', () => {
      expect(findMax([1, 5, 3, 9, 2])).toBe(9);
    });
    
    test('負の数を含む配列', () => {
      expect(findMax([-5, -1, -10])).toBe(-1);
    });
    
    test('1つの要素の配列', () => {
      expect(findMax([42])).toBe(42);
    });
    
    test('空の配列', () => {
      expect(findMax([])).toBeNull();
    });
  });
  
  describe('findMin関数', () => {
    test('最小値を見つける', () => {
      expect(findMin([1, 5, 3, 9, 2])).toBe(1);
    });
    
    test('負の数を含む配列', () => {
      expect(findMin([-5, -1, -10])).toBe(-10);
    });
  });
  
  describe('average関数', () => {
    test('平均値を計算', () => {
      expect(average([1, 2, 3, 4, 5])).toBe(3);
    });
    
    test('小数を含む平均', () => {
      expect(average([1, 2, 3])).toBeCloseTo(2);
    });
    
    test('空の配列は0', () => {
      expect(average([])).toBe(0);
    });
  });
  
  describe('removeDuplicates関数', () => {
    test('重複を削除', () => {
      expect(removeDuplicates([1, 2, 2, 3, 3, 3]))
        .toEqual([1, 2, 3]);
    });
    
    test('重複がない配列', () => {
      expect(removeDuplicates([1, 2, 3]))
        .toEqual([1, 2, 3]);
    });
    
    test('文字列の配列', () => {
      expect(removeDuplicates(['a', 'b', 'a', 'c']))
        .toEqual(['a', 'b', 'c']);
    });
  });
});
```

---

## 7. テストの整理とベストプラクティス

### 7-1. describe()でグループ化

**テストをまとめて整理**:

```javascript
describe('大きなグループ', () => {
  
  describe('小グループ1', () => {
    test('テスト1', () => {
      // テストコード
    });
    
    test('テスト2', () => {
      // テストコード
    });
  });
  
  describe('小グループ2', () => {
    test('テスト3', () => {
      // テストコード
    });
  });
});
```

**メリット**:
- テストが見やすくなる
- 実行結果が階層的に表示される
- 関連するテストをまとめられる

---

### 7-2. beforeEach() と afterEach()

**各テストの前後に実行**:

```javascript
describe('ユーザー管理', () => {
  let database;
  
  // 各テストの前に実行
  beforeEach(() => {
    database = createTestDatabase();
    console.log('データベースを準備');
  });
  
  // 各テストの後に実行
  afterEach(() => {
    database.clear();
    console.log('データベースをクリア');
  });
  
  test('ユーザーを追加', () => {
    // database は新しい状態
    database.addUser('Alice');
    expect(database.count()).toBe(1);
  });
  
  test('ユーザーを削除', () => {
    // database はまた新しい状態
    database.addUser('Bob');
    database.removeUser('Bob');
    expect(database.count()).toBe(0);
  });
});
```

**種類**:
- `beforeEach()`: 各テストの前に実行
- `afterEach()`: 各テストの後に実行
- `beforeAll()`: すべてのテストの前に1回だけ実行
- `afterAll()`: すべてのテストの後に1回だけ実行

---

### 7-3. テストのスキップと限定

#### テストをスキップ

```javascript
// このテストはスキップされる
test.skip('まだ実装していない機能', () => {
  // テストコード
});

// グループごとスキップ
describe.skip('未実装の機能', () => {
  test('テスト1', () => {});
  test('テスト2', () => {});
});
```

#### 特定のテストのみ実行

```javascript
// このテストだけ実行
test.only('このテストだけ実行', () => {
  expect(1 + 1).toBe(2);
});

test('これは実行されない', () => {
  expect(2 + 2).toBe(4);
});
```

**⚠️ 注意**: `only`は本番環境では削除すること

---

### 7-4. テストの命名規則

**良いテスト名**:
```javascript
✅ 良い例:
test('5 + 3 は 8 になる', () => {});
test('空の配列の場合、0を返す', () => {});
test('ユーザー名が空の場合、エラーを投げる', () => {});

❌ 悪い例:
test('テスト1', () => {});
test('動作確認', () => {});
test('test', () => {});
```

**命名のコツ**:
1. 何をテストするか明確に
2. 期待する結果を含める
3. 具体的に書く

---

### 7-5. テストカバレッジ

**どれだけコードがテストされているか**を確認:

```bash
npm test -- --coverage
```

**結果例**:
```
--------------------|---------|----------|---------|---------|
File                | % Stmts | % Branch | % Funcs | % Lines |
--------------------|---------|----------|---------|---------|
All files           |     100 |      100 |     100 |     100 |
 calculator.js      |     100 |      100 |     100 |     100 |
 user.js            |     100 |      100 |     100 |     100 |
--------------------|---------|----------|---------|---------|
```

**目標**:
- 80%以上が理想
- 100%は必須ではない（コストが高い）
- 重要な部分を優先的にテスト

---

### 7-6. テストのベストプラクティス

#### 1. テストは独立させる

```javascript
❌ 悪い例（テストが依存している）:
let counter = 0;

test('カウンターを増やす', () => {
  counter++;
  expect(counter).toBe(1);
});

test('さらに増やす', () => {
  counter++;  // 前のテストに依存
  expect(counter).toBe(2);
});

✅ 良い例（テストが独立）:
test('カウンターを増やす', () => {
  let counter = 0;
  counter++;
  expect(counter).toBe(1);
});

test('ゼロから2に増やす', () => {
  let counter = 0;
  counter += 2;
  expect(counter).toBe(2);
});
```

#### 2. 1つのテストで1つのことをテスト

```javascript
❌ 悪い例（複数のことをテスト）:
test('ユーザー機能', () => {
  const user = createUser('Alice', 25, 'alice@example.com');
  expect(user.name).toBe('Alice');
  expect(user.age).toBe(25);
  expect(isAdult(user)).toBe(true);
  expect(user.email).toBe('alice@example.com');
  // 多すぎる！
});

✅ 良い例（分割）:
test('ユーザーを作成できる', () => {
  const user = createUser('Alice', 25, 'alice@example.com');
  expect(user).toHaveProperty('name', 'Alice');
});

test('18歳以上は成人と判定', () => {
  const user = createUser('Alice', 25, 'alice@example.com');
  expect(isAdult(user)).toBe(true);
});
```

#### 3. エッジケースをテスト

```javascript
// 通常のケース
test('正の数の足し算', () => {
  expect(add(5, 3)).toBe(8);
});

// エッジケース
test('0との足し算', () => {
  expect(add(5, 0)).toBe(5);
});

test('負の数の足し算', () => {
  expect(add(-5, -3)).toBe(-8);
});

test('非常に大きな数', () => {
  expect(add(999999999, 1)).toBe(1000000000);
});
```

---

## 8. トラブルシューティング

### エラー1: "Cannot find module"

**症状**:
```
Cannot find module './math.js'
```

**原因**: ファイルパスが間違っている

**解決方法**:
```javascript
// ファイル構造を確認
project/
├── math.js
└── math.test.js

// math.test.js
const { add } = require('./math.js');  // ./を忘れずに
```

---

### エラー2: "module.exports is not defined"

**症状**:
```
ReferenceError: module is not defined
```

**原因**: module.exportsを書き忘れ

**解決方法**:
```javascript
// math.js に追加
function add(a, b) {
  return a + b;
}

module.exports = { add };  // ← これを追加
```

---

### エラー3: テストが見つからない

**症状**:
```
No tests found
```

**原因**: ファイル名が間違っている

**解決方法**:
```
✅ 正しい命名:
math.test.js
math.spec.js

❌ 間違った命名:
mathTest.js     # test. が必要
math_test.js    # ハイフンではなくドット
```

---

### エラー4: 非同期テストのタイムアウト

**症状**:
```
Timeout - Async callback was not invoked within the 5000 ms timeout
```

**解決方法**:
```javascript
// タイムアウトを延長
test('時間がかかる処理', async () => {
  // テストコード
}, 10000);  // 10秒に延長
```

---

## まとめ

### Jestの基本を振り返り

1. **インストール**: `npm install --save-dev jest`
2. **ファイル命名**: `*.test.js` または `*.spec.js`
3. **基本構文**: 
   ```javascript
   test('説明', () => {
     expect(実際の値).toBe(期待する値);
   });
   ```
4. **実行**: `npm test`

### 重要なマッチャー

| マッチャー | 用途 |
|-----------|------|
| `toBe()` | プリミティブ型の比較 |
| `toEqual()` | オブジェクト・配列の比較 |
| `toContain()` | 配列に含まれるか |
| `toThrow()` | エラーが発生するか |
| `toBeGreaterThan()` | 数値の大小比較 |

### 次のステップ

1. **非同期テスト**: Promise、async/awaitのテスト
2. **モック**: 外部依存をテストで置き換える
3. **スナップショットテスト**: UI コンポーネントのテスト
4. **統合テスト**: 複数の機能を組み合わせたテスト

---

これでJestの基礎は完璧です！🎉

実際にコードを書いて、たくさんテストを書いてみましょう！
