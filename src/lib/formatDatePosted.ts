const dateToTimePassed = (date: string): string => {
  // TODO: Improve function to return time passed in hours, minutes, and seconds
  const now = new Date(Date.now());
  const postDate = new Date(date);
  const diff = now.getTime() - postDate.getTime();
  const hours = diff / 1000 / 60 / 60;

  let timepassed: string = "";

  if (hours < 1) {
    timepassed = (hours * 60).toFixed(0) + " minutes";
    if (hours * 60 <= 1) {
      timepassed = (hours * 60 * 60).toFixed(0) + " seconds";
    }
  }

  if (hours > 24) {
    timepassed = (hours / 24).toFixed(0) + " days";
  }

  return timepassed;
};

export default dateToTimePassed;
