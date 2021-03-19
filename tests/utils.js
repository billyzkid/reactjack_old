import { test } from 'uvu';
import * as assert from 'uvu/assert'; // See assert docs: https://github.com/lukeed/uvu/blob/next/docs/api.assert.md
import * as utils from '../client/scripts/utils.js';

test('getNumberOrString returns number from integer', () => {
  const result = utils.getNumberOrString(123);
  assert.is(result, 123);
});

test('getNumberOrString returns number from integer string', () => {
  const result = utils.getNumberOrString('123');
  assert.is(result, 123);
});

test('getNumberOrString returns number from decimal', () => {
  const result = utils.getNumberOrString(12.3);
  assert.is(result, 12.3);
});

test('getNumberOrString returns number from decimal string', () => {
  const result = utils.getNumberOrString('12.3');
  assert.is(result, 12.3);
});

test('getNumberOrString returns string from non-numeric string', () => {
  const result = utils.getNumberOrString('42px');
  assert.is(result, '42px');
});

test('formatMoney formats whole numbers', () => {
  const result = utils.formatMoney(10);
  assert.is(result, '$10');
});

test('formatMoney formats decimals', () => {
  const result = utils.formatMoney(0.5);
  assert.is(result, '$0.50');
});

test.run();
