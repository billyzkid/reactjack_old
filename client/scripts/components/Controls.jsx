import React, { useRef, useState, useCallback } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useStateContext } from '../hooks.js';
import { formatMoney } from '../utils.js';

const DEFAULT_NAME = '';
const DEFAULT_BUY_IN = 1000;
const DEFAULT_BET = 10;

const timeouts = {
  enter: 200,
  exit: 200
}

const Controls = (props) => {
  console.log('Controls render', props);

  return (
    <div className="controls">
      <NameControl />
      <SitControl />
      <InOutControl />
      <BuyInControl />
      <BetControl />
      <InsuranceControl />
      <EvenMoneyControl />
      <DecisionControl />
    </div>
  );
};

const NameControl = (props) => {
  console.log('NameControl render', props);

  const nameContainerRef = useRef(null);
  const nameInputRef = useRef(null);
  const [name, setName] = useState(DEFAULT_NAME);
  const { isNameControlVisible } = useStateContext();

  const onEnter = useCallback(() => nameInputRef.current.select(), []);
  const onNameInputChange = useCallback((event) => setName(event.currentTarget.value), []);
  const onGoButtonClick = useCallback(() => console.log('name', name), [name]);

  return (
    <CSSTransition nodeRef={nameContainerRef} in={isNameControlVisible} timeout={timeouts} onEnter={onEnter} mountOnEnter unmountOnExit>
      <div ref={nameContainerRef} className="name-container">
        <p>Welcome! What's your name?</p>
        <div>
          <input ref={nameInputRef} type="text" minLength="1" maxLength="20" placeholder="Name" spellCheck="false" value={name} onChange={onNameInputChange} />
          <button className="silver" onClick={onGoButtonClick}>Go</button>
        </div>
      </div>
    </CSSTransition>
  );
};

const SitControl = (props) => {
  console.log('SitControl render', props);

  const sitContainerRef = useRef(null);
  const sitButtonRef = useRef(null);
  const { isSitControlVisible } = useStateContext();

  const onEnter = useCallback(() => sitButtonRef.current.focus(), []);
  const onSitButtonClick = useCallback(() => console.log('sit'), []);

  return (
    <CSSTransition nodeRef={sitContainerRef} in={isSitControlVisible} timeout={timeouts} onEnter={onEnter} mountOnEnter unmountOnExit>
      <div ref={sitContainerRef} className="sit-container">
        <button ref={sitButtonRef} className="silver" onClick={onSitButtonClick}>Sit</button>
      </div>
    </CSSTransition>
  );
};

const InOutControl = (props) => {
  console.log('InOutControl render', props);

  const inOutContainerRef = useRef(null);
  const inButtonRef = useRef(null);
  const outButtonRef = useRef(null);
  const { isInOutControlVisible } = useStateContext();

  const onEnter = useCallback(() => inButtonRef.current.focus(), []);
  const onInButtonClick = useCallback(() => console.log('in'), []);
  const onOutButtonClick = useCallback(() => console.log('out'), []);

  return (
    <CSSTransition nodeRef={inOutContainerRef} in={isInOutControlVisible} timeout={timeouts} onEnter={onEnter} mountOnEnter unmountOnExit>
      <div ref={inOutContainerRef} className="in-out-container">
        <button ref={inButtonRef} className="silver" onClick={onInButtonClick}>I'm In</button>
        <button ref={outButtonRef} className="silver" onClick={onOutButtonClick}>I'm Out</button>
      </div>
    </CSSTransition>
  );
};

const BuyInControl = (props) => {
  console.log('BuyInControl render', props);

  const buyInContainerRef = useRef(null);
  const buyInInputRef = useRef(null);
  const [buyIn, setBuyIn] = useState(DEFAULT_BUY_IN);
  const { isBuyInControlVisible, settings } = useStateContext();
  const { minBet, minBuyIn, maxBuyIn } = settings;

  const onEnter = useCallback(() => buyInInputRef.current.select(), []);
  const onBuyInInputChange = useCallback((event) => setBuyIn(event.currentTarget.value), []);
  const onBuyInButtonClick = useCallback(() => console.log('buy in', buyIn), [buyIn]);

  return (
    <CSSTransition nodeRef={buyInContainerRef} in={isBuyInControlVisible} timeout={timeouts} onEnter={onEnter} mountOnEnter unmountOnExit>
      <div ref={buyInContainerRef} className="buy-in-container">
        <p>The minimum bet is {formatMoney(minBet)}. Need more chips?</p>
        <div>
          <input ref={buyInInputRef} type="number" min={minBuyIn} max={maxBuyIn} placeholder="Amount" value={buyIn} onChange={onBuyInInputChange} />
          <button className="silver" onClick={onBuyInButtonClick}>Buy In</button>
        </div>
      </div>
    </CSSTransition>
  );
};

const BetControl = (props) => {
  console.log('BetControl render', props);

  const betContainerRef = useRef(null);
  const betInputRef = useRef(null);
  const [bet, setBet] = useState(DEFAULT_BET);
  const { isBetControlVisible, settings } = useStateContext();
  const { minBet, maxBet } = settings;

  const onEnter = useCallback(() => betInputRef.current.select(), []);
  const onBetInputChange = useCallback((event) => setBet(event.currentTarget.value), []);
  const onBetButtonClick = useCallback(() => console.log('bet', bet), [bet]);

  return (
    <CSSTransition nodeRef={betContainerRef} in={isBetControlVisible} timeout={timeouts} onEnter={onEnter} mountOnEnter unmountOnExit>
      <div ref={betContainerRef} className="bet-container">
        <input ref={betInputRef} type="number" min={minBet} max={maxBet} placeholder="Amount" value={bet} onChange={onBetInputChange} />
        <button className="silver" onClick={onBetButtonClick}>Bet</button>
      </div>
    </CSSTransition>
  );
};

const InsuranceControl = (props) => {
  console.log('InsuranceControl render', props);

  const insuranceContainerRef = useRef(null);
  const yesButtonRef = useRef(null);
  const noButtonRef = useRef(null);
  const { isInsuranceControlVisible } = useStateContext();

  const onEnter = useCallback(() => noButtonRef.current.focus(), []);
  const onYesButtonClick = useCallback(() => console.log('yes'), []);
  const onNoButtonClick = useCallback(() => console.log('no'), []);

  return (
    <CSSTransition nodeRef={insuranceContainerRef} in={isInsuranceControlVisible} timeout={timeouts} onEnter={onEnter} mountOnEnter unmountOnExit>
      <div ref={insuranceContainerRef} className="insurance-container">
        <p>Insurance?</p>
        <div>
          <button ref={yesButtonRef} className="silver" onClick={onYesButtonClick}>Yes</button>
          <button ref={noButtonRef} className="silver" onClick={onNoButtonClick}>No</button>
        </div>
      </div>
    </CSSTransition>
  );
};

const EvenMoneyControl = (props) => {
  console.log('EvenMoneyControl render', props);

  const evenMoneyContainerRef = useRef(null);
  const yesButtonRef = useRef(null);
  const noButtonRef = useRef(null);
  const { isEvenMoneyControlVisible } = useStateContext();

  const onEnter = useCallback(() => noButtonRef.current.focus(), []);
  const onYesButtonClick = useCallback(() => console.log('yes'), []);
  const onNoButtonClick = useCallback(() => console.log('no'), []);

  return (
    <CSSTransition nodeRef={evenMoneyContainerRef} in={isEvenMoneyControlVisible} timeout={timeouts} onEnter={onEnter} mountOnEnter unmountOnExit>
      <div ref={evenMoneyContainerRef} className="even-money-container">
        <p>Even money?</p>
        <div>
          <button ref={yesButtonRef} className="silver" onClick={onYesButtonClick}>Yes</button>
          <button ref={noButtonRef} className="silver" onClick={onNoButtonClick}>No</button>
        </div>
      </div>
    </CSSTransition>
  );
};

const DecisionControl = (props) => {
  console.log('DecisionControl render', props);

  const decisionContainerRef = useRef(null);
  const { isDecisionControlVisible } = useStateContext();

  const onHitButtonClick = useCallback(() => console.log('hit'), []);
  const onStandButtonClick = useCallback(() => console.log('stand'), []);
  const onSplitButtonClick = useCallback(() => console.log('split'), []);
  const onDoubleButtonClick = useCallback(() => console.log('double'), []);
  const onSurrenderButtonClick = useCallback(() => console.log('surrender'), []);

  return (
    <CSSTransition nodeRef={decisionContainerRef} in={isDecisionControlVisible} timeout={timeouts} mountOnEnter unmountOnExit>
      <div ref={decisionContainerRef} className="decision-container">
        <button className="gold" onClick={onHitButtonClick}>Hit</button>
        <button className="gold" onClick={onStandButtonClick}>Stand</button>
        <button className="gold" onClick={onSplitButtonClick}>Split</button>
        <button className="gold" onClick={onDoubleButtonClick}>Double</button>
        <button className="gold" onClick={onSurrenderButtonClick}>Surrender</button>
      </div>
    </CSSTransition>
  );
};

export default Controls;
