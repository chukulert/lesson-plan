import { useState, useEffect } from "react";
import { sortDate, sortSubject } from "../../utils/helpers";
import LessonItem from "./LessonItem";
import styles from "./LessonList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

const LessonList = (props) => {
  const {
    lessons,
    handleLessonClick,
    newLessonHandler,
    activeLesson,
  } = props;
  const [displayedLessons, setDisplayedLessons] = useState([]);
  const [subjectSort, setSubjectSort] = useState({
    sorted: false,
    sortOrder: false,
  });
  const [dateSort, setDateSort] = useState({
    sorted: false,
    sortOrder: false,
  });

  library.add(faCaretUp, faCaretDown);

  useEffect(() => {
    if (lessons) setDisplayedLessons(lessons);
  }, [lessons]);

  //sorting handlers
  const sortDateHandler = () => {
    const sortedLessons = sortDate(displayedLessons, dateSort.sortOrder);
    setDisplayedLessons(sortedLessons);
    setDateSort({
      sorted: true,
      sortOrder: !dateSort.sortOrder,
    });
    setSubjectSort({ ...subjectSort, sorted: false });
  };

  const sortSubjectHandler = () => {
    const sortedLessons = sortSubject(displayedLessons, subjectSort.sortOrder);
    setDisplayedLessons(sortedLessons);
    setSubjectSort({
      sorted: true,
      sortOrder: !subjectSort.sortOrder,
    });
    setDateSort({ ...dateSort, sorted: false });
  };

  const lessonsList = displayedLessons?.map((lesson) => (
    <LessonItem
      key={lesson.id}
      id={lesson.id}
      subject={lesson.subject}
      date={lesson.date}
      content={lesson.content}
      draft={lesson.draft}
      handleLessonClick={handleLessonClick}
      active={activeLesson.id === lesson.id}
    />
  ));

  return (
    <div className={styles.container}>
      <div className={styles.listHeader}>
        <div className={styles.headerColLeft}>
          <span onClick={sortSubjectHandler}>
            Subject
            {subjectSort.sorted && subjectSort.sortOrder && (
              <FontAwesomeIcon icon="fa-solid fa-caret-up" />
            )}
            {subjectSort.sorted && !subjectSort.sortOrder && (
              <FontAwesomeIcon icon="fa-solid fa-caret-down" />
            )}
          </span>
        </div>
        <div className={styles.headerColRight}>
          <span onClick={sortDateHandler}>
            Date
            {dateSort.sorted && dateSort.sortOrder && (
              <FontAwesomeIcon icon="fa-solid fa-caret-up" />
            )}
            {dateSort.sorted && !dateSort.sortOrder && (
              <FontAwesomeIcon icon="fa-solid fa-caret-down" />
            )}
          </span>
        </div>
      </div>

      {lessonsList.length !== 0 && (
        <div className={styles.listContainer}>{lessonsList}</div>
      )}
      {lessonsList.length === 0 && (
        <div className={styles.noLessons}>You have no lessons saved.</div>
      )}

      <div className={styles.listFooter}>
        <button onClick={newLessonHandler} className={styles.button}>
          New Lesson
        </button>
      </div>
    </div>
  );
};

export default LessonList;
