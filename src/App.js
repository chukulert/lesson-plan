import "./App.css";
import { useState, useEffect } from "react";
import LessonForm from "./components/LessonForm";
import LessonList from "./components/LessonList/LessonList";
import LessonDisplay from "./components/LessonDisplay";

function App() {
  const [lessons, setLessons] = useState([]);
  const [draft, setDraft] = useState({});
  const [displayDraft, setDisplayDraft] = useState({});
  const [displayedLesson, setDisplayedLesson] = useState(null);
  const [displayForm, setDisplayForm] = useState(true);
  const [activeLesson, setActiveLesson] = useState({});

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem("lessons"));
    if (storageData) {
      const { storageLessons, storageDraft } = storageData;
      setLessons(storageLessons);
      setDraft(storageDraft);
    }
  }, []);

  const saveLesson = (lesson) => {
    const newLessonList = [...lessons, lesson];
    setLessons(newLessonList);
    localStorage.setItem(
      "lessons",
      JSON.stringify({ storageLessons: newLessonList, storageDraft: draft })
    );
  };

  const saveDraft = (draft) => {
    setDraft(draft);
    setDisplayDraft(draft);
    localStorage.setItem(
      "lessons",
      JSON.stringify({ storageLessons: lessons, storageDraft: draft })
    );
  };

  const handleLessonClick = (event) => {
    const clickedLesson = lessons.find(
      (lesson) => lesson.id === +event.currentTarget.id
    );
    setDisplayedLesson(clickedLesson);
    setActiveLesson(clickedLesson);
    setDisplayForm(false);
    setDisplayDraft({});
  };

  const loadDraft = () => {
    setDisplayForm(true);
    setDisplayDraft(draft);
    setActiveLesson({});
  };

  const loadNewForm = () => {
    setDisplayForm(true);
    setDisplayDraft({});
    setActiveLesson({});
  };

  return (
    <div className="container">
      <LessonList
        lessons={lessons}
        handleLessonClick={handleLessonClick}
        newLessonHandler={loadNewForm}
        loadDraftHandler={loadDraft}
        activeLesson={activeLesson}
      />
      {displayForm && (
        <LessonForm
          saveLesson={saveLesson}
          saveDraft={saveDraft}
          draft={displayDraft}
        />
      )}
      {!displayForm && <LessonDisplay lesson={displayedLesson} />}
    </div>
  );
}

export default App;
