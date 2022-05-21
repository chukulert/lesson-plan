import { useState, useRef, useEffect } from "react";
import styles from "./LessonForm.module.css";

const LessonForm = (props) => {
  const { saveDraft, saveLesson, draft } = props;
  const [draftChecked, setDraftChecked] = useState(false);
  const subjectInputEle = useRef();
  const dateInputEle = useRef();
  const lessonContentInputEle = useRef();

  //set form inputs if there is a draft
  useEffect(() => {
    if (draft.subject !== undefined) {
      setDraftChecked(true);
      subjectInputEle.current.value = draft.subject
      dateInputEle.current.value  = draft.date
     lessonContentInputEle.current.value = draft.content
    } else {
      setDraftChecked(false);
      clearFormInputs()
    }
  }, [draft]);

  const clearFormInputs = () => {
    subjectInputEle.current.value = ''
    dateInputEle.current.value  = ''
    lessonContentInputEle.current.value = ''
  }

  const draftCheckBoxHandler = () => {
    draftChecked ? setDraftChecked(false) : setDraftChecked(true);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const lessonData = {
      subject: subjectInputEle.current.value || "",
      date: dateInputEle.current.value || "",
      content: lessonContentInputEle.current.value || "",
    };

    if (draftChecked) {
      saveDraft(lessonData);
    } else {
        saveLesson({ ...lessonData, id: Date.now() });
    }
    clearFormInputs()
  };

  return (
    <form onSubmit={submitHandler} className={styles.container}>
      <label htmlFor="subject" className={styles.label}>
        Subject Name
        <div className={styles.subjectHeader}>
          <input
            id="subject"
            type="text" 
            className={`${styles.input} ${styles.subject}`}
            required
            ref={subjectInputEle}
          />
          <label htmlFor="draft" className={styles.checkboxLabel}>
            <input
              id="draft"
              type="checkbox"
              className={styles.checkbox}
              onChange={draftCheckBoxHandler}
              checked={draftChecked}
            />
            Draft
          </label>
        </div>
      </label>

      <label htmlFor="date" className={styles.label}>
        Date
        <input
          id="date"
          type="date"
          className={`${styles.input} ${styles.date}`}
          required
          ref={dateInputEle}
        />
      </label>
      <label htmlFor="content" className={`${styles.label} ${styles.content}`}>
        Lesson Content
        <textarea
          id="content"
          className={styles.input}
          ref={lessonContentInputEle}
          required
        />
      </label>
      <button
        type="submit"
        formNoValidate={draftChecked}
        className={styles.button}
      >
        Save
      </button>
    </form>
  );
};

export default LessonForm;
