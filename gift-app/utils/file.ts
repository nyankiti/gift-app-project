// ファイル操作で用いる共通関数をここに記述していく

// 拡張子を取り出すメソッド
export const getExtension = (path: string) => {
  return path.split("/")[1].split(';')[0];
}


export const formatDateUntilMinute = () => {
  // 変数を同時に複数個定義するときは以下のように書く
  let d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear(),
      hour = d.getHours(),
      minute = d.getMinutes();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day, hour, minute].join('-');
}

export const formatDateUntilDay = () => {
  let d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) 
    month = '0' + month;
  if (day.length < 2) 
    day = '0' + day;

  return [year, month, day].join('-');
}

export const formatDate = () => {
  let d = new Date()
  return d.getDate();
}