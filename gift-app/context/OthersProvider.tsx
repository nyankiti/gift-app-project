import React, { createContext, useState } from "react";
import { formatDateUntilDay } from "../libs/utils/file";

type OthersContextType = {
  totalStudyTime: number;
  setTotalStudyTime: React.Dispatch<React.SetStateAction<number>>;
  selectedDateString: string;
  setSelectedDateString: React.Dispatch<React.SetStateAction<string>>;
};

export const OthersContext = createContext<OthersContextType>({
  totalStudyTime: 0,
  setTotalStudyTime: () => {},
  selectedDateString: formatDateUntilDay(),
  setSelectedDateString: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const OthersProvider = ({ children }: Props) => {
  // totalStudyTimeを座席登録を退席した時点で更新することを可能にするためcontextで管理
  const [totalStudyTime, setTotalStudyTime] = useState<number>(0);
  const [selectedDateString, setSelectedDateString] = useState<string>(
    formatDateUntilDay()
  );

  return (
    <OthersContext.Provider
      value={{
        totalStudyTime,
        setTotalStudyTime,
        selectedDateString,
        setSelectedDateString,
      }}
    >
      {children}
    </OthersContext.Provider>
  );
};
