import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import { autoSave, formatTime } from '../utils/utils';

export interface DiaryEntry {
  id: string;
  title: string;
  description: string;
  isReadOnly: boolean;
  created_date: string | undefined;
  updated_date: string | undefined;
}

export interface DiaryStoreType {
  diaryStore: DiaryStore;
}

export class DiaryStore {
  diary: DiaryEntry[] = [];
  newDiaryEntryTitle: string;
  newDiaryEntryDescription: string;
  serchString: string;

  constructor() {
    makeAutoObservable(this);
    this.newDiaryEntryTitle = '';
    this.newDiaryEntryDescription = '';
    this.serchString = '';
    this.diary = [
      {
        id: uuidv4(),
        title: 'test 1',
        description: 'test 1',
        isReadOnly: true,
        created_date: formatTime(Date.now()),
        updated_date: undefined,
      },
      {
        id: uuidv4(),
        title: 'test 2',
        description: 'test 2',
        isReadOnly: true,
        created_date: formatTime(Date.now()),
        updated_date: undefined,
      },
      {
        id: uuidv4(),
        title: 'test 3',
        description: 'test 3',
        isReadOnly: true,
        created_date: formatTime(Date.now()),
        updated_date: undefined,
      },
      {
        id: uuidv4(),
        title: 'test 4',
        description: 'test 4',
        isReadOnly: true,
        created_date: formatTime(Date.now()),
        updated_date: undefined,
      },
      {
        id: uuidv4(),
        title: 'test 5',
        description: 'test 5',
        isReadOnly: true,
        created_date: formatTime(Date.now()),
        updated_date: undefined,
      },
      {
        id: uuidv4(),
        title: 'test 6',
        description: 'test 6',
        isReadOnly: true,
        created_date: formatTime(Date.now()),
        updated_date: undefined,
      },
    ];
    autoSave(this, 'diaryStore');
  }

  addDiaryEntry = (title: string, description: string) => {
    const entry = {
      id: uuidv4(),
      title,
      description,
      isReadOnly: true,
      created_date: formatTime(Date.now()),
      updated_date: undefined,
    };
    this.diary.push(entry);
  };

  removeDiaryEntry = (id: string) => {
    this.diary = this.diary.filter((diaryEntry) => diaryEntry.id !== id);
  };

  setDiaryEntryReadOnly = (id: string) => {
    this.diary.forEach((diaryEntry) => {
      if (diaryEntry.id === id) {
        diaryEntry.isReadOnly = !diaryEntry.isReadOnly;
      }
    });
  };

  changeDiaryEntryTitle = (id: string, value: string) => {
    this.diary.forEach((diaryEntry) => {
      if (diaryEntry.id === id) {
        diaryEntry.title = value;
        diaryEntry.updated_date = formatTime(Date.now());
      }
    });
  };

  changeDiaryEntryDescription = (id: string, value: string) => {
    this.diary.forEach((diaryEntry) => {
      if (diaryEntry.id === id) {
        diaryEntry.description = value;
        diaryEntry.updated_date = formatTime(Date.now());
      }
    });
  };

  setNewDiaryEntryDescription = (description: string) => {
    this.newDiaryEntryDescription = description;
  };

  setNewDiaryEntryTitle = (title: string) => {
    this.newDiaryEntryTitle = title;
  };

  setSerchString = (serchString: string) => {
    this.serchString = serchString;
  };

  get fillteredDiary() {
    return this.diary.filter(
      (diaryEntry) =>
        diaryEntry.title.toLowerCase().includes(this.serchString.toLowerCase()) ||
        diaryEntry.description.toLowerCase().includes(this.serchString.toLowerCase())
    );
  }
}

export const diaryStore = new DiaryStore();
