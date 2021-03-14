import React from 'react';
import PropTypes from 'prop-types';

const Players = (props) => {
  console.log('Players render', props);

  return (
    <div id='players'>
    </div>
  );
};

// Players.propTypes = {
//   foo: PropTypes.bool.isRequired
// };

export default Players;
