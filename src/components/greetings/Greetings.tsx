import { GREETINGS_TEXT } from '../../constants/text-constants';

import classes from './greetings.module.scss';

function Greetings() {
  return <section className={classes.section}>{GREETINGS_TEXT}</section>;
}

export default Greetings;
