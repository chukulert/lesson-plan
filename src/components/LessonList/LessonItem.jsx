import { dateStringConverter } from "../../utils/helpers";
import styles from "./LessonItem.module.css";

const LessonItem = (props) => {
  const { subject, date, id, draft, handleLessonClick, active } = props;
  const displayedDate = dateStringConverter(date);

  return (
    <div
      id={id}
      onClick={handleLessonClick}
      className={`${styles.lessonItem} ${draft ? styles.draft : ""} ${
        active ? styles.active : ""
      }`}
    >
      <div className={styles.subjectColLeft}>{subject}</div>
      <div className={styles.dateColRight}>{displayedDate}</div>
    </div>
  );
};

export default LessonItem;
