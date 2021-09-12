import React from "react";
import { db } from "./firebae";
import { formatDateUntilDay } from "./utils/file";
import { Seats } from "../types/seat";
import { width } from "./utils/Dimension";
/* types */
import { User } from "../types/user";

export const seatWidth = width * 0.1;

//  useEffectの際に実行する座席の現在の状況を取得するメソッド
export const fetchSeatsState = async (
  setSeat: React.Dispatch<React.SetStateAction<Seats>>
) => {
  const seatDocRef = db.collection("seat").doc(formatDateUntilDay());
  try {
    await seatDocRef.get().then((doc) => {
      if (doc.exists) {
        console.log(doc.data());
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
  const seatDocRef = db.collection("seat").doc(formatDateUntilDay());
  try {
    await seatDocRef.set(initialSeatsObject);
  } catch (e) {
    console.log("something wrong in set initial seat status" + e);
  }
};

const handleSubmit = async (user: User, setUser: any) => {
  const seatDocRef = db.collection("seat").doc(formatDateUntilDay());

  // user情報(context)の更新
  setUser({
    ...user,
    seat: {
      position: "",
      color: "",
      icon: "",
    },
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
