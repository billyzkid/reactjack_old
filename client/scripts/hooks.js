import { useRef, useEffect } from 'react';

function usePortal(id, className) {
  const portalElementRef = useRef(null);

  useEffect(() => {
    const rootElement = document.getElementById(id) ||
                        document.body.appendChild(Object.assign(document.createElement('div'), { id }));

    rootElement.appendChild(portalElementRef.current);

    return () => {
      portalElementRef.current.remove();

      if (!rootElement.childElementCount) {
        rootElement.remove();
      }
    };
  }, [id]);

  if (!portalElementRef.current) {
    portalElementRef.current = Object.assign(document.createElement('div'), { className });
  }

  return portalElementRef.current;
}

export { usePortal };
