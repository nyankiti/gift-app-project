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

export const convertTimeToPlaybak = (minutes: number): string => {
  if (minutes) {
    const hrs = minutes / 60;
    const minute = hrs.toString().split(".")[0];
    const percent = parseInt(hrs.toString().split(".")[1].slice(0, 2));
    const sec = Math.ceil((60 * percent) / 100);
    if (parseInt(minute) < 10 && sec < 10) {
      return `0${minute}:0${sec}`;
    }

    if (sec == 60) {
      return `${minute + 1}:00`;
    }

    if (parseInt(minute) < 10) {
      return `0${minute}:${sec}`;
    }

    if (sec < 10) {
      return `${minute}:0${sec}`;
    }

    return `${minute}:${sec}`;
  }
  return "";
};
