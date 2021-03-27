import React from 'react';
import PropTypes from 'prop-types';

const Controls = (props) => {
  console.log('Controls render', props);

  return (
    <div className="controls">
      <div className="name-container">
        <p>Welcome! What's your name?</p>
        <div>
          <input type="text" minLength="1" maxLength="20" placeholder="Name" spellCheck="false" />
          <button className="silver">Go</button>
        </div>
      </div>
      <div className="sit-container">
        <button className="silver">Sit</button>
      </div>
      <div className="sit-in-out-container">
        <button className="silver">I'm in</button>
        <button className="silver">I'm out</button>
      </div>
      <div className="buy-in-container">
        <p>The minimum bet is $10. Need more chips?</p>
        <div>
          <input type="number" min="10" max="10000" placeholder="Amount" value="1000" />
          <button className="silver">Buy In</button>
        </div>
      </div>
      <div className="bet-container">
        <input type="number" min="10" max="1000" placeholder="Amount" value="10" />
        <button className="silver">Bet</button>
      </div>
      <div className="insurance-container">
        <p>Insurance?</p>
        <div>
          <button className="silver">Yes</button>
          <button className="silver">No</button>
        </div>
      </div>
      <div className="even-money-container">
        <p>Even money?</p>
        <div>
          <button className="silver">Yes</button>
          <button className="silver">No</button>
        </div>
      </div>
      <div className="decision-container">
        <button className="gold">Hit</button>
        <button className="gold">Stand</button>
        <button className="gold">Split</button>
        <button className="gold">Double</button>
        <button className="gold">Surrender</button>
      </div>
    </div>
  );
};

// Controls.propTypes = {
//   foo: PropTypes.bool.isRequired
// };

export default Controls;
