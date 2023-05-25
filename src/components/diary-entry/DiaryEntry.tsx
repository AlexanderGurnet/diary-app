import { observer } from 'mobx-react-lite';

import Input from '../ui/input/Input';
import Button from '../ui/button/Button';
import { DiaryStore, DiaryEntry } from '../../store/diaryStore';

import {
  CREATED_TEXT,
  DELETE_BTN_TEXT,
  DESCRIPTION_EMPTY_PLACEHOLDER_TEXT,
  EDIT_BTN_TEXT,
  TITLE_EMPTY_PLACEHOLDER_TEXT,
  UPDATED_DEFAULT_TEXT,
  UPDATED_TEXT,
} from '../../constants/text-constants';

import classes from './diary-entry.module.scss';

interface Props {
  diaryStore: DiaryStore;
  diaryEntry: DiaryEntry;
}

const DiaryEntryItem = observer(({ diaryStore, diaryEntry }: Props) => {
  return (
    <div className={classes.diaryEntry}>
      <div className={classes.leftBlock}>
        <Input
          readOnly={diaryEntry.isReadOnly}
          placeholder={TITLE_EMPTY_PLACEHOLDER_TEXT}
          value={diaryEntry.title}
          type="text"
          onChange={(e) => diaryStore.changeDiaryEntryTitle(diaryEntry.id, e.target.value)}
        />
        <Input
          readOnly={diaryEntry.isReadOnly}
          placeholder={DESCRIPTION_EMPTY_PLACEHOLDER_TEXT}
          value={diaryEntry.description}
          type="text"
          onChange={(e) => diaryStore.changeDiaryEntryDescription(diaryEntry.id, e.target.value)}
        />
        <div className={classes.timeTextContainer}>
          <p className={classes.timeText}>
            {CREATED_TEXT} {diaryEntry.created_date}
          </p>
          <p className={classes.timeText}>
            {UPDATED_TEXT} {diaryEntry.updated_date ? diaryEntry.updated_date : UPDATED_DEFAULT_TEXT}
          </p>
        </div>
      </div>
      <div className={classes.rightBlock}>
        <Button
          type="button"
          className={classes.button}
          onClick={() => diaryStore.setDiaryEntryReadOnly(diaryEntry.id)}
        >
          {EDIT_BTN_TEXT}
        </Button>
        <Button type="button" className={classes.button} onClick={() => diaryStore.removeDiaryEntry(diaryEntry.id)}>
          {DELETE_BTN_TEXT}
        </Button>
      </div>
    </div>
  );
});

export default DiaryEntryItem;
