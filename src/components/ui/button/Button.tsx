import { SyntheticEvent } from 'react';

import classes from './button.module.scss';

type Props = {
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: (e: SyntheticEvent) => void;
};

function Button({ children, className, type = 'button', disabled = false, onClick }: Props) {
  return (
    <button disabled={disabled} type={type} className={`${classes.button} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
