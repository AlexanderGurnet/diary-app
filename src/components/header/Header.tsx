import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import fakeAuth from 'fake-auth';

import Button from '../ui/button/Button';
import Auth from '../auth/Auth';
import { AuthStoreType } from '../../store/authStore';

import { HOME_PATH, LOGO_TEXT, LOG_OUT_TEXT, SIGN_IN_TEXT, SIGN_UP_TEXT } from '../../constants/text-constants';

import classes from './header.module.scss';

const Header = observer(({ authStore }: AuthStoreType) => {
  const [show, setShow] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const navigate = useNavigate();

  const handleShowModal = (title: string) => {
    if (title === LOG_OUT_TEXT) {
      fakeAuth.signout().then(() => {
        authStore.loggedOut();
        navigate(HOME_PATH);
      });
    } else {
      setModalTitle(title);
      setShow(true);
    }
  };

  const handleHideModal = () => {
    setShow(false);
  };

  return (
    <>
      {show && <Auth authStore={authStore} modalTitle={modalTitle} handleHideModal={handleHideModal} />}
      <header className={classes.header}>
        <h1 className={classes.logo}>{LOGO_TEXT}</h1>
        <div className={classes.btnContainer}>
          {authStore.isLoggedIn ? (
            <Button className={classes.button} onClick={() => handleShowModal(LOG_OUT_TEXT)}>
              {LOG_OUT_TEXT}
            </Button>
          ) : (
            <>
              <Button className={classes.button} onClick={() => handleShowModal(SIGN_IN_TEXT)}>
                {SIGN_IN_TEXT}
              </Button>
              <Button className={classes.button} onClick={() => handleShowModal(SIGN_UP_TEXT)}>
                {SIGN_UP_TEXT}
              </Button>
            </>
          )}
        </div>
      </header>
    </>
  );
});

export default Header;
