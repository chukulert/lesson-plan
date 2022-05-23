import "./App.css";
import { useState, useEffect } from "react";
import LessonForm from "./components/LessonForm";
import LessonList from "./components/LessonList/LessonList";
import LessonDisplay from "./components/LessonDisplay";

function App() {
  const [lessons, setLessons] = useState([]);
  const [displayDraft, setDisplayDraft] = useState({});
  const [displayLesson, setDisplayLesson] = useState({});
  const [displayForm, setDisplayForm] = useState(true);
  const [activeLesson, setActiveLesson] = useState({});

  useEffect(() => {
    const storageData = JSON.parse(localStorage.getItem("lessons"));
    if (storageData) {
      const { storageLessons } = storageData;
      setLessons(storageLessons);
    }
  }, []);

  const saveLesson = (lesson) => {
    let newLessonsList = lessons;
    if (displayDraft) {
      newLessonsList = lessons.filter(
        (lesson) => lesson.id !== displayDraft.id
      );
    }
    newLessonsList = [...newLessonsList, lesson];
    setLessons(newLessonsList);
    setDisplayDraft({});
    localStorage.setItem(
      "lessons",
      JSON.stringify({ storageLessons: newLessonsList })
    );
  };

  const handleLessonClick = (event) => {
    const clickedLesson = lessons.find(
      (lesson) => lesson.id === +event.currentTarget.id
    );
    if (clickedLesson.draft) {
      setDisplayForm(true);
      setDisplayLesson({});
      setDisplayDraft(clickedLesson);
    } else {
      setDisplayLesson(clickedLesson);
      setDisplayForm(false);
      setDisplayDraft({});
    }
    setActiveLesson(clickedLesson);
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
        activeLesson={activeLesson}
      />
      {displayForm && (
        <LessonForm
          saveLesson={saveLesson}
          draft={displayDraft}
        />
      )}
      {!displayForm && <LessonDisplay lesson={displayLesson} />}
    </div>
  );
}

export default App;
