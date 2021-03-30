const IMAGES_PATH = '../images/';
const SOUNDS_PATH = '../sounds/';

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

function preloadImages() {
  const imageFiles = [
    `${IMAGES_PATH}cards/back.png`
  ];

  for (let i = 0; i < 54; i++) {
    imageFiles.push(`${IMAGES_PATH}cards/front-${i}.png`);
  }

  imageFiles.forEach((imageFile) => {
    const link = Object.assign(document.createElement('link'), { rel: 'preload', href: imageFile, as: 'image' });
    document.head.appendChild(link);
  });
}

function preloadSounds() {
  const soundFiles = [
    `${SOUNDS_PATH}deck-shuffle.ogg`
  ];

  for (let i = 0; i < 4; i++) {
    soundFiles.push(`${SOUNDS_PATH}card-flip-${i}.ogg`);
  }

  for (let i = 0; i < 8; i++) {
    soundFiles.push(`${SOUNDS_PATH}card-slide-${i}.ogg`);
  }

  for (let i = 0; i < 6; i++) {
    soundFiles.push(`${SOUNDS_PATH}chips-stack-${i}.ogg`);
  }

  soundFiles.forEach((soundFile) => {
    const link = Object.assign(document.createElement('link'), { rel: 'preload', href: soundFile, as: 'audio' });
    document.head.appendChild(link);
  });
}

function playCardFlipSound() {
  const randNum = Math.floor(Math.random() * 4);
  const audioElement = new Audio(`${SOUNDS_PATH}card-flip-${randNum}.ogg`);
  audioElement.play();
}

function playCardSlideSound() {
  const randNum = Math.floor(Math.random() * 8);
  const audioElement = new Audio(`${SOUNDS_PATH}card-slide-${randNum}.ogg`);
  audioElement.play();
}

function playChipsStackSound() {
  const randNum = Math.floor(Math.random() * 6);
  const audioElement = new Audio(`${SOUNDS_PATH}chips-stack-${randNum}.ogg`);
  audioElement.play();
}

function playDeckShuffleSound() {
  const audioElement = new Audio(`${SOUNDS_PATH}deck-shuffle.ogg`);
  audioElement.play();
}

export {
  getFocusableChildren,
  isTabFocusable,
  setAriaHidden,
  setAriaVisible,
  getNumberOrString,
  getClassNames,
  getPlayerPositions,
  getHandPositions,
  getHandTotal,
  formatMoney,
  preloadImages,
  preloadSounds,
  playCardFlipSound,
  playCardSlideSound,
  playChipsStackSound,
  playDeckShuffleSound
};
