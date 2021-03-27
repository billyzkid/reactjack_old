import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { useStateContext } from '../hooks.js';

const timeouts = {
  enter: 200,
  exit: 200
}

const NameControl = (props) => {
  console.log('NameControl render', props);

  const containerNodeRef = useRef(null);
  const { isNameControlVisible } = useStateContext();

  return (
    <CSSTransition nodeRef={containerNodeRef} in={isNameControlVisible} timeout={timeouts} mountOnEnter unmountOnExit>
      <div ref={containerNodeRef} className="name-container">
        <p>Welcome! What's your name?</p>
        <div>
          <input type="text" minLength="1" maxLength="20" placeholder="Name" spellCheck="false" />
          <button className="silver">Go</button>
        </div>
      </div>
    </CSSTransition>
  );
};

const SitControl = (props) => {
  console.log('SitControl render', props);

  const containerNodeRef = useRef(null);
  const { isSitControlVisible } = useStateContext();

  return (
    <CSSTransition nodeRef={containerNodeRef} in={isSitControlVisible} timeout={timeouts} mountOnEnter unmountOnExit>
      <div ref={containerNodeRef} className="sit-container">
        <button className="silver">Sit</button>
      </div>
    </CSSTransition>
  );
};

const InOutControl = (props) => {
  console.log('InOutControl render', props);

  const containerNodeRef = useRef(null);
  const { isInOutControlVisible } = useStateContext();

  return (
    <CSSTransition nodeRef={containerNodeRef} in={isInOutControlVisible} timeout={timeouts} mountOnEnter unmountOnExit>
      <div ref={containerNodeRef} className="in-out-container">
        <button className="silver">I'm In</button>
        <button className="silver">I'm Out</button>
      </div>
    </CSSTransition>
  );
};

const BuyInControl = (props) => {
  console.log('BuyInControl render', props);

  const containerNodeRef = useRef(null);
  const { isBuyInControlVisible } = useStateContext();

  return (
    <CSSTransition nodeRef={containerNodeRef} in={isBuyInControlVisible} timeout={timeouts} mountOnEnter unmountOnExit>
      <div ref={containerNodeRef} className="buy-in-container">
        <p>The minimum bet is $10. Need more chips?</p>
        <div>
          <input type="number" min="10" max="10000" placeholder="Amount" value="1000" />
          <button className="silver">Buy In</button>
        </div>
      </div>
    </CSSTransition>
  );
};

const BetControl = (props) => {
  console.log('BetControl render', props);

  const containerNodeRef = useRef(null);
  const { isBetControlVisible } = useStateContext();

  return (
    <CSSTransition nodeRef={containerNodeRef} in={isBetControlVisible} timeout={timeouts} mountOnEnter unmountOnExit>
      <div ref={containerNodeRef} className="bet-container">
        <input type="number" min="10" max="1000" placeholder="Amount" value="10" />
        <button className="silver">Bet</button>
      </div>
    </CSSTransition>
  );
};

const InsuranceControl = (props) => {
  console.log('InsuranceControl render', props);

  const containerNodeRef = useRef(null);
  const { isInsuranceControlVisible } = useStateContext();

  return (
    <CSSTransition nodeRef={containerNodeRef} in={isInsuranceControlVisible} timeout={timeouts} mountOnEnter unmountOnExit>
      <div ref={containerNodeRef} className="insurance-container">
        <p>Insurance?</p>
        <div>
          <button className="silver">Yes</button>
          <button className="silver">No</button>
        </div>
      </div>
    </CSSTransition>
  );
};

const EvenMoneyControl = (props) => {
  console.log('EvenMoneyControl render', props);

  const containerNodeRef = useRef(null);
  const { isEvenMoneyControlVisible } = useStateContext();

  return (
    <CSSTransition nodeRef={containerNodeRef} in={isEvenMoneyControlVisible} timeout={timeouts} mountOnEnter unmountOnExit>
      <div ref={containerNodeRef} className="even-money-container">
        <p>Even money?</p>
        <div>
          <button className="silver">Yes</button>
          <button className="silver">No</button>
        </div>
      </div>
    </CSSTransition>
  );
};

const DecisionControl = (props) => {
  console.log('DecisionControl render', props);

  const containerNodeRef = useRef(null);
  const { isDecisionControlVisible } = useStateContext();

  return (
    <CSSTransition nodeRef={containerNodeRef} in={isDecisionControlVisible} timeout={timeouts} mountOnEnter unmountOnExit>
      <div ref={containerNodeRef} className="decision-container">
        <button className="gold">Hit</button>
        <button className="gold">Stand</button>
        <button className="gold">Split</button>
        <button className="gold">Double</button>
        <button className="gold">Surrender</button>
      </div>
    </CSSTransition>
  );
};

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

// Controls.propTypes = {
//   foo: PropTypes.bool.isRequired
// };

export default Controls;
