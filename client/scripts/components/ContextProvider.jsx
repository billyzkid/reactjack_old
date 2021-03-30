import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import { useImmerReducer } from 'use-immer';
import { playCardFlipSound, playCardSlideSound, playHandSweepSound } from '../utils.js';

const initialState = {
  isInfoPopupOpen: false,
  isProfilePopupOpen: false,
  isChatPopupOpen: false,
  isMusicPopupOpen: false,
  isSettingsPopupOpen: false,
  isQuitPopupOpen: false,
  isNameControlVisible: false,
  isSitControlVisible: false,
  isInOutControlVisible: false,
  isBuyInControlVisible: false,
  isBetControlVisible: false,
  isInsuranceControlVisible: false,
  isEvenMoneyControlVisible: false,
  isDecisionControlVisible: false,
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
    playersCanSplitAnyTens: true,
    playersCanSplitAces: true,
    playersCanResplitAces: true,
    playersCanHitSplitAces: true,
    maxNumSplits: 3,
    cardNumBonus: 'NCC',
    surrender: 'LS',
    minBet: 10,
    maxBet: 1000,
    minBuyIn: 10,
    maxBuyIn: 10000
  },
  dealer: {
    name: 'Dealer',
    hand: {
      cards: []
    }
  },
  players: [],
  message: [
    'Welcome!'
  ]
};

const reducer = (draft, action) => {
  switch (action.type) {
    case 'reset': {
      return initialState;
    }

    case 'toggleInfoPopup':
    case 'toggleProfilePopup':
    case 'toggleChatPopup':
    case 'toggleMusicPopup':
    case 'toggleSettingsPopup':
    case 'toggleQuitPopup': {
      if (action.isOpen) {
        draft.isInfoPopupOpen = false;
        draft.isProfilePopupOpen = false;
        draft.isChatPopupOpen = false;
        draft.isMusicPopupOpen = false;
        draft.isSettingPopupOpen = false;
        draft.isQuitPopupOpen = false;
      }

      const popup = action.type.slice(6);
      const key = `is${popup}Open`;
      draft[key] = action.isOpen;
      return;
    }

    case 'toggleNameControl':
    case 'toggleSitControl':
    case 'toggleInOutControl':
    case 'toggleBuyInControl':
    case 'toggleBetControl':
    case 'toggleInsuranceControl':
    case 'toggleEvenMoneyControl':
    case 'toggleDecisionControl': {
      if (action.isVisible) {
        draft.isNameControlVisible = false;
        draft.isSitControlVisible = false;
        draft.isInOutControlVisible = false;
        draft.isBuyInControlVisible = false;
        draft.isBetControlVisible = false;
        draft.isInsuranceControlVisible = false;
        draft.isEvenMoneyControlVisible = false;
        draft.isDecisionControlVisible = false;
      }

      const control = action.type.slice(6);
      const key = `is${control}Visible`;
      draft[key] = action.isVisible;
      return;
    }

    case 'showMessage': {
      draft.message = action.message;
      return;
    }

    case 'hideMessage': {
      draft.message = [];
      return;
    }

    case 'updateSettings': {
      draft.settings = action.settings;
      return;
    }

    case 'dealCardToDealer': {
      draft.dealer.hand.cards.push(action.card);

      if (draft.settings.soundEffects) {
        playCardSlideSound();
      }

      return;
    }

    case 'dealCardToPlayer': {
      const player = draft.players.find((player) => player.id === action.playerId);
      const hand = player.hands[action.handIndex];
      hand.cards.push(action.card);

      if (draft.settings.soundEffects) {
        playCardSlideSound();
      }

      return;
    }

    case 'sweepDealerHand': {
      draft.dealer.hand.cards.splice(0, draft.dealer.hand.cards.length);

      if (draft.settings.soundEffects) {
        playHandSweepSound();
      }

      return;
    }

    case 'sweepPlayerHand': {
      const player = draft.players.find((player) => player.id === action.playerId);
      const hand = player.hands[action.handIndex];
      hand.cards.splice(0, hand.cards.length);

      if (draft.settings.soundEffects) {
        playHandSweepSound();
      }

      return;
    }

    case 'flipHoleCard': {
      const holeCard = draft.dealer.hand.cards[1];
      holeCard.hidden = !holeCard.hidden;

      if (draft.settings.soundEffects) {
        playCardFlipSound();
      }

      return;
    }

    case 'addPlayer': {
      draft.players.push(action.player);
      return;
    }

    case 'removePlayer': {
      const index = draft.players.findIndex((player) => player.id === action.playerId);
      draft.players.splice(index, 1);
      return;
    }

    case 'addPlayerHand': {
      const player = draft.players.find((player) => player.id === action.playerId);
      player.hands.push(action.hand);
      return;
    }

    case 'removePlayerHand': {
      const player = draft.players.find((player) => player.id === action.playerId);
      player.hands.splice(action.handIndex, 1);
      return;
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const socket = io();
const SocketContext = createContext();
const StateContext = createContext();
const DispatchContext = createContext();

const ContextProvider = (props) => {
  console.log('ContextProvider render', props);

  const { children } = props;
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  return (
    <SocketContext.Provider value={socket}>
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch} children={children} />
      </StateContext.Provider>
    </SocketContext.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default ContextProvider;
export { SocketContext, StateContext, DispatchContext };
