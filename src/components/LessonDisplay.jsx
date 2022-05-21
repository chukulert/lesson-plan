import styles from './LessonDisplay.module.css';
import { dateStringConverter } from "../utils/helpers";

const LessonDisplay = (props) => {
    const {lesson} = props
    const displayedDate = dateStringConverter(lesson.date)

    return (
        <div className={styles.container}>
            <div className={styles.row}><strong>Subject:</strong>{lesson.subject}</div>
            <div className={styles.row}><strong>Date:</strong>{displayedDate}</div>
            <div className={`${styles.row} ${styles.content}`}><strong>Content:</strong>{lesson.content}</div>
        </div>
    )
}

export default LessonDisplay;