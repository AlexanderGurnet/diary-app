import classes from './modal.module.scss';

type Props = {
  title: string;
  children: React.ReactNode;
  onHideModal: () => void;
};

const toUpperCase = (string: string) => string.toUpperCase();

function Modal({ title, children, onHideModal }: Props) {
  return (
    <div className={classes.modalContent} onClick={(e) => e.stopPropagation()}>
      <div className={classes.close} onClick={onHideModal} />
      <h2 className={classes.title}>{toUpperCase(title)}</h2>
      {children}
    </div>
  );
}

export default Modal;
