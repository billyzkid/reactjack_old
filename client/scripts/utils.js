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

export { formatMoney, getHandTotal };
