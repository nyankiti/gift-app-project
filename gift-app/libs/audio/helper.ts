export const convertTime = (time: number) => {
  const minute = Math.floor(time / 60);
  const sec = time % 60;
  if (minute < 10 && sec < 10) {
    return `0${minute}:0${sec}`;
  }
  if (minute < 10) {
    return `0${minute}:${sec}`;
  }
  if (sec < 10) {
    return `${minute}:0${sec}`;
  }
  return `${minute}:${sec}`;
};
