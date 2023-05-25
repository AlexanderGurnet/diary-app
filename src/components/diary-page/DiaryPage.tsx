import { observer } from 'mobx-react-lite';

import { DiaryStoreType } from '../../store/diaryStore';
import DiaryEntryItem from '../diary-entry/DiaryEntry';
import Input from '../ui/input/Input';
import Button from '../ui/button/Button';

import {
  TITLE_PLACEHOLDER_TEXT,
  DESCRIPTION_PLACEHOLDER_TEXT,
  SEARCH_PLACEHOLDER_TEXT,
  EMPTY_MSG_TEXT,
} from '../../constants/text-constants';

import classes from './diary-page.module.scss';

const DiaryPage = observer(({ diaryStore }: DiaryStoreType) => {
  const handleAddNewEntry = () => {
    diaryStore.addDiaryEntry(diaryStore.newDiaryEntryTitle, diaryStore.newDiaryEntryDescription);
    diaryStore.setNewDiaryEntryTitle('');
    diaryStore.setNewDiaryEntryDescription('');
  };

  return (
    <>
      <section className={classes.diaryEntryList}>
        <div className={classes.createEntryBlock}>
          <Input
            placeholder={TITLE_PLACEHOLDER_TEXT}
            value={diaryStore.newDiaryEntryTitle}
            type="text"
            onChange={(e) => diaryStore.setNewDiaryEntryTitle(e.target.value)}
          />
          <Input
            placeholder={DESCRIPTION_PLACEHOLDER_TEXT}
            value={diaryStore.newDiaryEntryDescription}
            type="text"
            onChange={(e) => diaryStore.setNewDiaryEntryDescription(e.target.value)}
          />
          <Button
            type="button"
            className={classes.button}
            onClick={handleAddNewEntry}
            disabled={!(diaryStore.newDiaryEntryDescription.length !== 0 && diaryStore.newDiaryEntryTitle.length !== 0)}
          >
            add
          </Button>
          <Input
            placeholder={SEARCH_PLACEHOLDER_TEXT}
            value={diaryStore.serchString}
            type="text"
            onChange={(e) => diaryStore.setSerchString(e.target.value)}
          />
        </div>
        {diaryStore.fillteredDiary.map((diaryEntry) => (
          <DiaryEntryItem diaryStore={diaryStore} diaryEntry={diaryEntry} key={diaryEntry.id} />
        ))}
        {diaryStore.fillteredDiary.length === 0 && <div className={classes.emptyMessageBlock}>{EMPTY_MSG_TEXT}</div>}
      </section>
    </>
  );
});

export default DiaryPage;
