import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { AuthStoreType } from '../store/authStore';

type Props = {
  children: React.ReactElement;
  redirectTo: string;
};

const RequiredAuthRoute = observer(({ authStore, children, redirectTo }: Props & AuthStoreType) => {
  const isAuthenticated = authStore.isLoggedIn;

  return isAuthenticated ? children : <Navigate to={redirectTo} />;
});

export default RequiredAuthRoute;
