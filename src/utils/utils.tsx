import { autorun, set, toJS } from 'mobx';

import { authStore } from '../store/authStore';
import { diaryStore } from '../store/diaryStore';

export function autoSave(_this: typeof authStore | typeof diaryStore, name: string) {
  const storedJson = localStorage.getItem(name);

  if (storedJson) {
    set(_this, JSON.parse(storedJson));
  }

  autorun(() => {
    const value = toJS(_this);
    localStorage.setItem(name, JSON.stringify(value));
  });
}

export function formatTime(date: number) {
  const formatedDate = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone: 'Europe/Moscow',
  }).format(date);
  return formatedDate;
}
