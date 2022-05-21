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
    loadDraftHandler,
    activeLesson,
  } = props;
  const [displayedLessons, setDisplayedLessons] = useState([]);
  const [subjectSort, setSubjectSort] = useState();
  const [dateSort, setDateSort] = useState();

  library.add(faCaretUp, faCaretDown);

  useEffect(() => {
    if (lessons) setDisplayedLessons(lessons);
  }, [lessons]);

  //sorting handlers
  const sortDateHandler = () => {
    const sortedLessons = sortDate(displayedLessons, dateSort);
    setDisplayedLessons(sortedLessons);
    setDateSort(!dateSort);
  };

  const sortSubjectHandler = () => {
    const sortedLessons = sortSubject(displayedLessons, subjectSort);
    setDisplayedLessons(sortedLessons);
    setSubjectSort(!subjectSort);
  };

  const lessonsList = displayedLessons?.map((lesson) => (
    <LessonItem
      key={lesson.id}
      id={lesson.id}
      subject={lesson.subject}
      date={lesson.date}
      content={lesson.content}
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
            {subjectSort && <FontAwesomeIcon icon="fa-solid fa-caret-up" />}
            {!subjectSort && <FontAwesomeIcon icon="fa-solid fa-caret-down" />}
          </span>
        </div>
        <div className={styles.headerColRight}>
          <span onClick={sortDateHandler}>
            Date
            {dateSort && <FontAwesomeIcon icon="fa-solid fa-caret-up" />}
            {!dateSort && <FontAwesomeIcon icon="fa-solid fa-caret-down" />}
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
        <button onClick={loadDraftHandler} className={styles.button}>
          Load Draft
        </button>
        <button onClick={newLessonHandler} className={styles.button}>
          New Lesson
        </button>
      </div>
    </div>
  );
};

export default LessonList;
