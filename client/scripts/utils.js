const HAND_DISTANCE_X = 5;
const HAND_DISTANCE_Y = 1.25;

const FOCUSABLE_SELECTORS = [
  '[contenteditable]:not([contenteditable="false"])',
  '[tabindex]',
  'a[href]',
  'audio[controls]',
  'video[controls]',
  'button',
  'iframe',
  'input',
  'select',
  'textarea'
];

function getFocusableChildren(node) {
  const focusableSelectors = FOCUSABLE_SELECTORS.join(',');
  const focusableNodes = node.querySelectorAll(focusableSelectors);

  return Array.from(focusableNodes);
}

function isTabFocusable(node) {
  return node.getAttribute('tabindex') >= 0;
}

function setAriaHidden(node) {
  node.setAttribute('aria-hidden', 'true');
}

function setAriaVisible(node) {
  node.removeAttribute('aria-hidden');
}

function getNumberOrString(value) {
  const number = Number(value);

  return !isNaN(number) ? number : value;
}

function getClassNames(obj) {
  return Object.keys(obj).filter((name) => obj[name]).join(' ');
}

function getPlayerPositions(players) {
  const primaryPlayer = players.find((player) => player.primary);
  const otherPlayers = players.filter((player) => !player.primary);
  const positions = [undefined, undefined, primaryPlayer, undefined, undefined];

  otherPlayers.forEach((player) => {
    if (!positions[0]) {
      positions[0] = player;
    } else if (!positions[4]) {
      positions[4] = player;
    } else if (!positions[2]) {
      positions[2] = player;
    } else if (!positions[1]) {
      positions[1] = player;
    } else if (!positions[3]) {
      positions[3] = player;
    } else {
      throw new Error('Table is full.');
    }
  });

  return positions;
}

function getHandPositions(hands) {
  const positions = [];

  if (hands.length > 0) {
    const initialX = -HAND_DISTANCE_X * (hands.length - 1) / 2;
    const initialY = -HAND_DISTANCE_Y * (hands.length - 1) / 2;

    hands.forEach((hand, index) => {
      const x = initialX + (HAND_DISTANCE_X * index);
      const y = initialY + (HAND_DISTANCE_Y * index);

      positions.push({ x, y });
    });
  }

  return positions;
}

function getHandTotal(hand) {
  return '6 or 16';
}

function formatMoney(value) {
  if (value % 1) {
    return `$${value.toFixed(2)}`;
  } else {
    return `$${value}`;
  }
}

export { getFocusableChildren, isTabFocusable, setAriaHidden, setAriaVisible, getNumberOrString, getClassNames, getPlayerPositions, getHandPositions, getHandTotal, formatMoney };
