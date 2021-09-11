import { HatenaArticle } from "./news";

// NavigationのParamaList
export type RootStackParamList = {
  Root: undefined;
  Auth: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  News: undefined;
  StudyReport: undefined;
  Audio: undefined;
  SeatBooking: undefined;
  // Auth: undefined;
};

export type DrawerParamList = {
  home: undefined;
  EditProfileScreen: undefined;
  GiftInfoScreen: undefined;
  QuestionnaireScreen: undefined;
};

export type NewsTabParamList = {
  NewsScreen: undefined;
  ArticleScreen: {
    article: HatenaArticle;
  };
};

export type StudyReportTabParamList = {
  StudyReportScreen: undefined;
  EditGoalScreen: {
    post: object;
    selectedDate: any;
    dateString: string;
  };
  SignInScreen: {
    stackName: string;
  };
  SignUpScreen: {
    stackName: string;
  };
};

export type AuthTabParamList = {
  SignInScreen: undefined;
  SignUpScreen: undefined;
};

export type SeatBookingTabParamList = {
  SeatBookingScreen: undefined;
  SeatUnBookingScreen: undefined;
  SignInScreen: {
    stackName: string;
  };
  SignUpScreen: {
    stackName: string;
  };
};

export type AudioTabParamList = {
  AudioListScreen: undefined;
  PlayerScreen: undefined;
};
