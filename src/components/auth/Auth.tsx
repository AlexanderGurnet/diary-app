import { SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import fakeAuth from 'fake-auth';

import Overlay from '../ui/overlay/Overlay';
import Modal from '../ui/modal/Modal';
import Button from '../ui/button/Button';
import Input from '../ui/input/Input';

import classes from './auth.module.scss';
import { AuthStoreType } from '../../store/authStore';
import { DIARY_PATH, LOADING_STATE_TEXT, SIGN_IN_TEXT } from '../../constants/text-constants';

type Props = {
  modalTitle: string;
  handleHideModal: () => void;
};

const Auth = observer(({ authStore, modalTitle, handleHideModal }: Props & AuthStoreType) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<Error | undefined>(undefined);
  const navigate = useNavigate();

  const handleHideModalAndReset = () => {
    handleHideModal();
    setEmail('');
    setPassword('');
    setError(undefined);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (e.currentTarget.checkValidity()) {
      e.preventDefault();

      if (modalTitle === 'Sign Up') {
        setIsLoading(true);
        setError(undefined);
        fakeAuth
          .signup(email, password)
          .then(() => {
            handleHideModalAndReset();
          })
          .catch((error: SetStateAction<Error | undefined>) => {
            setError(error);
          })
          .finally(() => setIsLoading(false));
      }

      if (modalTitle === SIGN_IN_TEXT) {
        setIsLoading(true);
        setError(undefined);
        fakeAuth
          .signin(email, password)
          .then(() => {
            handleHideModal();
            authStore.loggedIn();
            navigate(DIARY_PATH);
          })
          .catch((error: SetStateAction<Error | undefined>) => {
            setError(error);
          })
          .finally(() => setIsLoading(false));
      }
    }
  };

  return (
    <Overlay hideOverlay={handleHideModalAndReset}>
      <Modal onHideModal={handleHideModalAndReset} title={modalTitle}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Input type="email" placeholder="email" value={email} onChange={handleEmailChange} />
          <Input type="password" placeholder="password" value={password} onChange={handlePasswordChange} />
          <Button className={classes.loginButton} type="submit">
            {modalTitle}
          </Button>
          {error && <p className={classes.error}>{error.message}</p>}
          {isLoading && <p className={classes.loading}>{LOADING_STATE_TEXT}</p>}
        </form>
      </Modal>
    </Overlay>
  );
});

export default Auth;
