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