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