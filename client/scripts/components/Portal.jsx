import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { usePortal } from '../hooks.js';

const Portal = (props) => {
  console.log('Portal render', props);

  const { className, children } = props;
  const container = usePortal('root', className);

  return ReactDOM.createPortal(children, container);
};

Portal.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default Portal;
