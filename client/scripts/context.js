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
      name: 'Will',
      primary: true,
      active: false,
      chips: 1000,
      hands: [
        {
          bet: 10,
          cards: [
            { rank: 'ace', suit: 'hearts' },
            { rank: 'two', suit: 'spades' }
          ]
        },
        {
          bet: 20,
          cards: [
            { rank: 'ace', suit: 'hearts' },
            { rank: 'two', suit: 'spades' }
          ]
        },
        {
          bet: 30,
          cards: [
            { rank: 'ace', suit: 'hearts' },
            { rank: 'two', suit: 'spades' }
          ]
        }
      ]
    }
  ],
  message: [
    'This is the first line of the message.',
    'This is the second line of the message.'
  ]
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'toggleInfoPopup':
      return { ...state, isInfoPopupOpen: action.isOpen };

    case 'toggleProfilePopup':
      return { ...state, isProfilePopupOpen: action.isOpen };

    case 'toggleChatPopup':
      return { ...state, isChatPopupOpen: action.isOpen };

    case 'toggleMusicPopup':
      return { ...state, isMusicPopupOpen: action.isOpen };

    case 'toggleSettingsPopup':
      return { ...state, isSettingsPopupOpen: action.isOpen };

    case 'toggleQuitPopup':
      return { ...state, isQuitPopupOpen: action.isOpen };

    case 'updateSettings':
      return { ...state, settings: action.settings };

    case 'dealCardToDealer':
      return {
        ...state,
        dealer: {
          ...state.dealer,
          hand: {
            ...state.dealer.hand,
            cards: state.dealer.hand.cards.concat(action.card)
          }
        }
      };

    case 'sweepCardsFromDealer':
      return {
        ...state,
        dealer: {
          ...state.dealer,
          hand: {
            ...state.dealer.hand,
            cards: []
          }
        }
      };

    case 'flipHoleCard':
      return {
        ...state,
        dealer: {
          ...state.dealer,
          hand: {
            ...state.dealer.hand,
            cards: state.dealer.hand.cards.map((card) => {
              if (card.hidden) {
                return { ...card, hidden: false };
              } else {
                return card;
              }
            })
          }
        }
      };

    case 'addPlayer':
      return { ...state, players: state.players.concat(action.player) };

    case 'removePlayer':
      return { ...state, players: state.players.filter((player) => player.id !== action.id) };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export { socket, initialState, reducer };
