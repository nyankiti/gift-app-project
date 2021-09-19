import React from "react";
import { db, FirebaseTimestamp } from "./firebae";
import { formatDateUntilDay } from "./utils/file";
/* types */
import { User, UserSeat } from "../types/user";
import { Target } from "../types/studyReport";
import { CarouselItemProps } from "../types/studyReport";
import { diffClamp } from "react-native-reanimated";

export const fetchDream = async (
  uid: string,
  setDreamStack: React.Dispatch<React.SetStateAction<string[]>>,
  setDream: React.Dispatch<React.SetStateAction<string>>,
  setCarouselItems: React.Dispatch<React.SetStateAction<CarouselItemProps[]>>
) => {
  const dreamDocRef = db
    .collection("users")
    .doc(uid)
    .collection("dream")
    .doc(uid);

  await dreamDocRef.get().then((doc) => {
    if (doc.exists && doc.data()?.dream) {
      const fetchedDream = doc.data()?.dream;

      setDreamStack(fetchedDream);
      setCarouselItems(renderCarouselItems(fetchedDream));
      setDream(fetchedDream[fetchedDream.length - 1]);
    } else {
    }
  });
};

export const fetchTargetByDate = async (
  uid: string,
  dateString: string,
  setTarget: React.Dispatch<React.SetStateAction<Target>>
) => {
  const targetRef = db
    .collection("users")
    .doc(uid)
    .collection("target")
    .doc(dateString);
  await targetRef.get().then((doc) => {
    if (doc.exists) {
      const selectedDateTarget = doc.data()?.target;
      setTarget(selectedDateTarget);
    } else {
      setTarget({
        "1": "   ",
        "2": "",
        "3": "",
        "4": "",
        "5": "",
      });
    }
  });
};

export const setStartTime = async (uid: string) => {
  const userSeatDocRef = db
    .collection("users")
    .doc(uid)
    .collection("seat")
    .doc(formatDateUntilDay());

  try {
    // 一人一席の制限をしているのでstarttimeは毎度更新する。
    // その日で2回目の登録の場合はtotalTimeが既に登録されているので、mergeをtrueにして消さないようにする
    await userSeatDocRef.set(
      {
        startTime: FirebaseTimestamp.now(),
      },
      { merge: true }
    );
  } catch (e) {
    console.log("something wrong in fetching user seat datas: " + e);
  }
};

export const setEndTime = async (uid: string) => {
  const userSeatDocRef = db
    .collection("users")
    .doc(uid)
    .collection("seat")
    .doc(formatDateUntilDay());

  try {
    // 既にtotalTimeがあるか確認するため、まずgetする
    await userSeatDocRef.get().then(async (doc) => {
      if (doc.exists) {
        const data = doc.data() as UserSeat;

        const now = FirebaseTimestamp.now();
        const diffMinutes = calcTotalTime(data?.startTime, now);

        // 既にtotalTimeがある場合は今回の勉強時間を足したものをtotalTimeに登録する
        let newTotalTime = 0;
        if (data.totalTime) {
          newTotalTime = data.totalTime + diffMinutes;
        } else {
          newTotalTime = diffMinutes;
        }

        await userSeatDocRef.set(
          {
            endTime: now,
            totalTime: newTotalTime,
          },
          { merge: true }
        );
      } else {
        // データがないとき(startTimeの登録に失敗している場合)
        await userSeatDocRef.set({
          endTime: FirebaseTimestamp.now(),
        });
      }
    });
  } catch (e) {
    console.log("something wrong in fetching user seat datas: " + e);
  }
};

// timestampの型が見つからなかった、、、
export const calcTotalTime = (startTime: any, endTime: any) => {
  const diffSeconds = endTime.seconds - startTime.seconds;

  // 分単位で返す
  return Math.floor(diffSeconds / 60);
};

export const setTotalStudyTimeViaClockGesture = async (
  uid: string,
  totalTime: number,
  dateString: string
) => {
  const userSeatDocRef = db
    .collection("users")
    .doc(uid)
    .collection("seat")
    .doc(dateString);

  try {
    await userSeatDocRef.set(
      {
        totalTimeViaClockGesture: totalTime,
      },
      { merge: true }
    );
  } catch (e) {}
};

export const fetchTotalStudyTime = async (
  uid: string,
  selectedDateString: string,
  setTotalStudyTime: React.Dispatch<React.SetStateAction<number>>
) => {
  const userSeatDocRef = db
    .collection("users")
    .doc(uid)
    .collection("seat")
    .doc(selectedDateString);

  await userSeatDocRef.get().then((doc) => {
    if (doc.exists) {
      const data = doc.data() as UserSeat;
      if (data.totalTimeViaClockGesture) {
        setTotalStudyTime(data.totalTimeViaClockGesture);
      } else if (data.totalTime) {
        setTotalStudyTime(data.totalTime);
      } else {
        setTotalStudyTime(0);
      }
    } else {
      setTotalStudyTime(0);
    }
  });
};

const initialItems = [
  {
    text: "夢を記入しよう",
    index: 0,
  },
];

export const renderCarouselItems = (arr: string[]) => {
  if (arr === undefined || arr.length == 0) {
    return initialItems;
  }
  return arr.map((item, index) => {
    // return arr.reverse().map((item) => {
    return { text: item, index: index };
  });
};

export const deleteDreamSpecifiedByIndex = async (
  index: number,
  uid: string,
  dreamStack: string[],
  setDreamStack: React.Dispatch<React.SetStateAction<string[]>>,
  carouselItems: CarouselItemProps[],
  setCarouselItems: React.Dispatch<React.SetStateAction<CarouselItemProps[]>>
) => {
  const dreamDocRef = db
    .collection("users")
    .doc(uid)
    .collection("dream")
    .doc(uid);

  console.log(dreamStack);
  console.log("selected index : " + index);
  const tempStack = dreamStack.filter((dream, i) => i !== index);
  console.log(tempStack);
  await dreamDocRef.set({
    dream: tempStack,
  });

  setDreamStack(tempStack);
  setCarouselItems(renderCarouselItems(tempStack));
};
