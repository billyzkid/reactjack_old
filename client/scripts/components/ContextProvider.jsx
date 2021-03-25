import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import { setAutoFreeze } from 'immer';
import { useImmerReducer } from 'use-immer';
import { sitPlayers } from '../utils.js';

// disable auto freezing so we can call sitPlayers from the reducer below
// TODO: figure out an alternative way?
// see https://immerjs.github.io/immer/freezing
setAutoFreeze(false);

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
      const index = draft.players.findIndex((player) => player.id === action.playerId);
      draft.players.splice(index, 1);
      sitPlayers(draft.players);
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
