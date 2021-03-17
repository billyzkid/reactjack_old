import { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Portal = (props) => {
  console.log('Portal render', props);

  const { node, children } = props;
  const defaultNodeRef = useRef(null);

  useEffect(() => () => {
    if (defaultNodeRef.current) {
      document.body.removeChild(defaultNodeRef.current);
    }
  }, []);

  if (!node && !defaultNodeRef.current) {
    const defaultNode = document.createElement('div');
    defaultNode.className = 'popup-portal';
    defaultNodeRef.current = defaultNode;
    document.body.appendChild(defaultNode);
  }

  return ReactDOM.createPortal(children, node || defaultNodeRef.current);
};

Portal.propTypes = {
  node: PropTypes.instanceOf(HTMLElement),
  children: PropTypes.node
};

export default Portal;
