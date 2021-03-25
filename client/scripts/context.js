import io from 'socket.io-client';
import { setAutoFreeze } from 'immer';

// Disabling immer's auto-freeze is required to call sitPlayers below
// TODO: Figure out an alternative way
setAutoFreeze(false);

const socket = io();

const initialState = {
  isInfoPopupOpen: false,
  isProfilePopupOpen: false,
  isChatPopupOpen: false,
  isMusicPopupOpen: false,
  isSettingsPopupOpen: false,
  isQuitPopupOpen: false,
  settings: {
    soundEffects: false,
    shuffleAfterEveryRound: false,
    numDecks: 6,
    blackjackPayout: 1.5,
    insurancePayout: 2,
    dealerStandsOn: 'S17',
    dealerPeeksOn: 'P',
    playersCanDoubleOn: 'D2',
    playersCanDoubleAfterSplit: true,
    playersCanSplitFoursFivesTens: true,
    playersCanSplitAnyTens: true,
    playersCanSplitAces: true,
    playersCanResplitAces: true,
    playersCanHitSplitAces: true,
    maxNumSplits: 3,
    cardNumBonus: 'NCC',
    surrender: 'LS'
  },
  dealer: {
    name: 'Dealer',
    hand: {
      cards: []
    }
  },
  players: [],
  message: ['This is the first line of the message.', 'This is the second line of the message.']
};

const reducer = (draft, action) => {
  switch (action.type) {

    case 'toggleInfoPopup': {
      draft.isInfoPopupOpen = action.isOpen;
      return;
    }

    case 'toggleProfilePopup': {
      draft.isProfilePopupOpen = action.isOpen;
      return;
    }

    case 'toggleChatPopup': {
      draft.isChatPopupOpen = action.isOpen;
      return;
    }

    case 'toggleMusicPopup': {
      draft.isMusicPopupOpen = action.isOpen;
      return;
    }

    case 'toggleSettingsPopup': {
      draft.isSettingsPopupOpen = action.isOpen;
      return;
    }

    case 'toggleQuitPopup': {
      draft.isQuitPopupOpen = action.isOpen;
      return;
    }

    case 'updateSettings': {
      draft.settings = action.settings;
      return;
    }

    case 'dealCardToDealer': {
      draft.dealer.hand.cards.push(action.card);
      return;
    }

    case 'dealCardToPlayer': {
      const player = draft.players.find((player) => player.id === action.playerId);
      const hand = player.hands[action.handIndex];
      hand.cards.push(action.card);
      return;
    }

    case 'sweepCardsFromDealer': {
      draft.dealer.hand.cards.splice(0, draft.dealer.hand.cards.length);
      return;
    }

    case 'sweepCardsFromPlayer': {
      const player = draft.players.find((player) => player.id === action.playerId);
      const hand = player.hands[action.handIndex];
      hand.cards.splice(0, hand.cards.length);
      return;
    }

    case 'flipHoleCard': {
      const holeCard = draft.dealer.hand.cards[1];
      holeCard.hidden = !holeCard.hidden;
      return;
    }

    case 'addPlayer': {
      draft.players.push(action.player);
      sitPlayers(draft.players);
      return;
    }

    case 'removePlayer': {
      const index = draft.players.findIndex((player) => player.id === action.id)
      draft.players.splice(index, 1);
      sitPlayers(draft.players);
      return;
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

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
        throw new Error('Table can only seat a maximum of 5 players.');
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
        throw new Error('Table can only seat a maximum of 5 players.');
    }
  }
}

export { socket, initialState, reducer };
