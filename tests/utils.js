import { test } from 'uvu';
import * as assert from 'uvu/assert'; // See assert docs: https://github.com/lukeed/uvu/blob/next/docs/api.assert.md
import * as utils from '../client/scripts/utils.js';

test('formatMoney formats whole numbers', () => {
  const result = utils.formatMoney(10);
  assert.is(result, '$10');
});

test('formatMoney formats decimals', () => {
  const result = utils.formatMoney(0.5);
  assert.is(result, '$0.50');
});

test('getHandTotal', () => {
  const result = utils.getHandTotal({ cards: [] });
  assert.is(result, '6 or 16');
});

test.run();
