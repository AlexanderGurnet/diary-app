import classes from './input.module.scss';

type Props = {
  placeholder: string;
  value: string;
  type: string;
  minLength?: number;
  pattern?: string;
  className?: string;
  required?: boolean;
  readOnly?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({
  placeholder,
  value,
  type,
  minLength,
  pattern,
  className,
  required = true,
  readOnly = false,
  onChange,
}: Props) => {
  return (
    <input
      className={`${classes.input} ${className}`}
      readOnly={readOnly}
      placeholder={placeholder}
      value={value}
      type={type}
      autoComplete="on"
      pattern={pattern}
      onChange={onChange}
      required={required}
      minLength={minLength}
    />
  );
};

export default Input;
