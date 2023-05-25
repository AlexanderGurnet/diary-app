import { useEffect } from 'react';
import ReactDOM from 'react-dom';

import classes from './overlay.module.scss';

type Props = {
  children: React.ReactNode;
  hideOverlay: () => void;
};

function Overlay({ children, hideOverlay }: Props) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        hideOverlay();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [hideOverlay]);

  return ReactDOM.createPortal(
    <div className={classes.overlay} onClick={hideOverlay}>
      {children}
    </div>,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.getElementById('overlay')!
  );
}

export default Overlay;
