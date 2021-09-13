import React from "react";
import { db, seatDocRef } from "./firebae";
import { formatDateUntilDay } from "./utils/file";
import { width } from "./utils/Dimension";
import { setStartTime, setEndTime } from "./studyReportController";
/* types */
import { Seats } from "../types/seat";
import { User } from "../types/user";
import { SeatIconComponents } from "../types/seat";

export const seatWidth = width * 0.1;

//  useEffectの際に実行する座席の現在の状況を取得するメソッド
export const fetchSeatsState = async (
  setSeat: React.Dispatch<React.SetStateAction<Seats>>
) => {
  try {
    await seatDocRef.get().then((doc) => {
      if (doc.exists) {
        const temp = (doc.data() as Seats) ?? initialSeatsObject;
        setSeat(temp);
      } else {
        setInitialSeatData();
        setSeat(initialSeatsObject);
      }
    });
  } catch (e) {
    console.log("something wrong in fetching seat status" + e);
  }
};

// firestoreにデータがなかった場合に全てfalseを登録するメソッド
const setInitialSeatData = async () => {
  try {
    await seatDocRef.set(initialSeatsObject);
  } catch (e) {
    console.log("something wrong in set initial seat status" + e);
  }
};

export const handleSeatSubmit = async (
  user: User,
  setUser: React.Dispatch<React.SetStateAction<User>>,
  position: string,
  color: string,
  icon: [SeatIconComponents, any],
  setSeats: React.Dispatch<React.SetStateAction<Seats>>
) => {
  const tempSeatObj: any = {};
  tempSeatObj[position] = {
    uid: user.uid,
    icon: icon,
    color: "red",
  };
  await seatDocRef.set(tempSeatObj, { merge: true });

  // user情報の更新(contextとfirestoreどちらも更新)
  await setCurrentSeatInfoToUserInfo(user, setUser, position, color, icon);

  //studyReport用の時間を登録
  await setStartTime(user.uid);

  // SeatBookingScreenを更新するため、再度データを取り直す
  fetchSeatsState(setSeats);
};

export const handleSeatUnBooking = async (
  user: User,
  setUser: React.Dispatch<React.SetStateAction<User>>,
  position: string,
  setSeats: React.Dispatch<React.SetStateAction<Seats>>
) => {
  const tempSeatObj: any = {};
  tempSeatObj[position] = false;
  await seatDocRef.set(tempSeatObj, { merge: true });

  // user情報の更新(contextとfirestoreどちらも更新)
  await setUnBookingInfoToUserInfo(user, setUser);

  //studyReport用の時間を登録
  await setEndTime(user.uid);

  // SeatBookingScreenを更新するため、再度データを取り直す
  fetchSeatsState(setSeats);
};

const setCurrentSeatInfoToUserInfo = async (
  user: User,
  setUser: React.Dispatch<React.SetStateAction<User>>,
  position: string,
  color: string,
  icon: [SeatIconComponents, any]
) => {
  const userDocRef = db.collection("users").doc(user.uid);
  await userDocRef.set(
    {
      currentSeat: {
        position: position,
        color: color,
        icon: icon,
      },
    },
    { merge: true }
  );

  // user情報(context)の更新
  setUser({
    ...user,
    currentSeat: {
      position: position,
      color: color,
      icon: icon,
    },
  });
};

const setUnBookingInfoToUserInfo = async (
  user: User,
  setUser: React.Dispatch<React.SetStateAction<User>>
) => {
  const userDocRef = db.collection("users").doc(user.uid);
  try {
    await userDocRef.set(
      {
        currentSeat: null,
      },
      { merge: true }
    );
  } catch (e) {
    console.log("something went wrong in setting user info : " + e);
  }

  // user情報(context)の更新
  setUser({
    ...user,
    currentSeat: null,
  });
};

export const initialSeatsObject: Seats = {
  A1: false,
  A2: false,
  A3: false,
  A4: false,
  A5: false,
  A6: false,
  B1: false,
  B2: false,
  B3: false,
  B4: false,
  B5: false,
  B6: false,
  C1: false,
  C2: false,
  C3: false,
  C4: false,
  C5: false,
  C6: false,
  D1: false,
  D2: false,
  D3: false,
  D4: false,
  D5: false,
  D6: false,
  E1: false,
  E2: false,
  E3: false,
  E4: false,
  E5: false,
};

export const seatsArray = [
  ["A1", "A2", "A3", "A4", "A5", "A6"],
  ["B1", "B2", "B3", "B4", "B5", "B6"],
  ["C1", "C2", "C3", "C4", "C5", "C6"],
  ["D1", "D2", "D3", "D4", "D5", "D6"],
  ["E1", "E2", "E3", "E4", "E5"],
];
