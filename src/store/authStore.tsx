import { makeAutoObservable } from 'mobx';

import { autoSave } from '../utils/utils';

class AuthStore {
  isLoggedIn: boolean;

  constructor() {
    makeAutoObservable(this);
    this.isLoggedIn = false;
    autoSave(this, 'authStore');
  }

  loggedIn() {
    this.isLoggedIn = true;
  }

  loggedOut() {
    this.isLoggedIn = false;
  }
}

export type AuthStoreType = {
  authStore: AuthStore;
};

export const authStore = new AuthStore();
