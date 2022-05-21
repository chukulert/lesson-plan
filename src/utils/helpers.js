export const dateStringConverter = (date) => {
  const dateArr = date.split("-");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${dateArr[2]} ${monthNames[dateArr[1] - 1]} ${dateArr[0]}`;
};

export const sortDate = (arr, sort) => {
  return [...arr].sort((a, b) => {
    let aDate = new Date(a.date),
      bDate = new Date(b.date);
    return sort ? bDate - aDate : aDate - bDate;
  });
};

export const sortSubject = (arr, sort) => {
  return [...arr].sort((a, b) => {
    let lessonA = a.subject.toLowerCase(),
      lessonB = b.subject.toLowerCase();
    if (sort) {
      return lessonA === lessonB ? 0 : lessonA < lessonB ? 1 : -1;
    } else {
      return lessonA === lessonB ? 0 : lessonA < lessonB ? -1 : 1; //asc first
    }
  });
};
