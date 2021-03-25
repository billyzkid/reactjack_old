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

function sitPlayers(players) {
  const primaryPlayer = players.find((player) => player.primary);

  if (primaryPlayer) {
    const otherPlayers = players.filter((player) => player !== primaryPlayer);

    switch (otherPlayers.length) {
      case 0:
        primaryPlayer.style = { gridColumn: '3' };
        break;

      case 1:
        primaryPlayer.style = { gridColumn: '3' };
        otherPlayers[0].style = { gridColumn: '1' };
        break;

      case 2:
        primaryPlayer.style = { gridColumn: '3' };
        otherPlayers[0].style = { gridColumn: '1' };
        otherPlayers[1].style = { gridColumn: '2' };
        break;

      case 3:
        primaryPlayer.style = { gridColumn: '3' };
        otherPlayers[0].style = { gridColumn: '1' };
        otherPlayers[1].style = { gridColumn: '2' };
        otherPlayers[2].style = { gridColumn: '4' };
        break;

      case 4:
        primaryPlayer.style = { gridColumn: '3' };
        otherPlayers[0].style = { gridColumn: '1' };
        otherPlayers[1].style = { gridColumn: '2' };
        otherPlayers[2].style = { gridColumn: '4' };
        otherPlayers[3].style = { gridColumn: '5' };
        break;

      default:
        throw new Error('Table can seat a maximum of 5 players.');
    }
  } else {
    switch (players.length) {
      case 0:
        break;

      case 1:
        players[0].style = { gridColumn: '1' };
        break;

      case 2:
        players[0].style = { gridColumn: '1' };
        players[1].style = { gridColumn: '2' };
        break;

      case 3:
        players[0].style = { gridColumn: '1' };
        players[1].style = { gridColumn: '2' };
        players[2].style = { gridColumn: '3' };
        break;

      case 4:
        players[0].style = { gridColumn: '1' };
        players[1].style = { gridColumn: '2' };
        players[2].style = { gridColumn: '3' };
        players[3].style = { gridColumn: '4' };
        break;

      case 5:
        players[0].style = { gridColumn: '1' };
        players[1].style = { gridColumn: '2' };
        players[2].style = { gridColumn: '3' };
        players[3].style = { gridColumn: '4' };
        players[4].style = { gridColumn: '5' };
        break;

      default:
        throw new Error('Table can seat a maximum of 5 players.');
    }
  }
}

function positionHands(hands) {
  switch (hands.length) {
    case 0:
      break;

    case 1:
      hands[0].style = { transform: 'translate3d(0,0,0)' };
      break;

    case 2:
      hands[0].style = { transform: 'translate3d(-1.25em,-0.625em,0)' };
      hands[1].style = { transform: 'translate3d(1.25em,0.625em,0)' };
      break;

    case 3:
      hands[0].style = { transform: 'translate3d(-2.5em,-1.25em,0)' };
      hands[1].style = { transform: 'translate3d(0,0,0)' };
      hands[2].style = { transform: 'translate3d(2.5em,1.25em,0)' };
      break;

    case 4:
      hands[0].style = { transform: 'translate3d(-3.75em,-1.875em,0)' };
      hands[1].style = { transform: 'translate3d(-1.25em,-0.625em,0)' };
      hands[2].style = { transform: 'translate3d(1.25em,0.625em,0)' };
      hands[3].style = { transform: 'translate3d(3.75em,1.875em,0)' };
      break;

    default:
      throw new Error('Players can have a maximum of 4 hands.');
  }
}

export { getFocusableChildren, isTabFocusable, setAriaHidden, setAriaVisible, getNumberOrString, getClassNames, getHandTotal, formatMoney, sitPlayers, positionHands };
