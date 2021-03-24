import io from 'socket.io-client';

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
  players: [
    {
      id: 100,
      name: 'Will',
      primary: true,
      active: true,
      chips: 1000,
      hands: [
        {
          active: true,
          bet: 10,
          cards: [
            { rank: 'ace', suit: 'hearts' },
            { rank: 'two', suit: 'spades' }
          ]
        },
        {
          active: false,
          bet: 20,
          cards: [
            { rank: 'ace', suit: 'hearts' },
            { rank: 'two', suit: 'spades' }
          ]
        },
        {
          active: false,
          bet: 30,
          cards: [
            { rank: 'ace', suit: 'hearts' },
            { rank: 'two', suit: 'spades' }
          ]
        }
      ]
    },
    {
      id: 101,
      name: 'Lisa',
      primary: false,
      active: false,
      chips: 1000,
      hands: [
        {
          active: false,
          bet: 10,
          cards: [
            { rank: 'ace', suit: 'hearts' },
            { rank: 'two', suit: 'spades' }
          ]
        }
      ]
    },
    {
      id: 102,
      name: 'Tyler',
      primary: false,
      active: false,
      chips: 1000,
      hands: [
        {
          active: false,
          bet: 10,
          cards: [
            { rank: 'ace', suit: 'hearts' },
            { rank: 'two', suit: 'spades' }
          ]
        }
      ]
    },
    {
      id: 103,
      name: 'Dan',
      primary: false,
      active: false,
      chips: 1000,
      hands: [
        {
          active: false,
          bet: 10,
          cards: [
            { rank: 'ace', suit: 'hearts' },
            { rank: 'two', suit: 'spades' }
          ]
        }
      ]
    },
    {
      id: 104,
      name: 'Avery',
      primary: false,
      active: false,
      chips: 1000,
      hands: [
        {
          active: false,
          bet: 10,
          cards: [
            { rank: 'ace', suit: 'hearts' },
            { rank: 'two', suit: 'spades' }
          ]
        }
      ]
    }
  ],
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
      return;
    }

    case 'removePlayer': {
      const index = draft.players.findIndex((player) => player.id === action.id)
      draft.players.splice(index, 1);
      return;
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

export { socket, initialState, reducer };
