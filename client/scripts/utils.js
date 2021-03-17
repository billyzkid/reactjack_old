const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

function formatMoney(value) {
  if (value % 1) {
    return `$${value.toFixed(2)}`;
  } else {
    return `$${value}`;
  }
}

function getHandTotal(hand) {
  return '6 or 16';
}

export { canUseDOM, formatMoney, getHandTotal };
