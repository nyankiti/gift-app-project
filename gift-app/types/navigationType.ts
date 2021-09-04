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
  Auth: undefined;
  Hidden: undefined;
};

export type DrawerParamaList = {
  home: undefined;
  EditProfileScreen: undefined;
  GiftInfoScreen: undefined;
  QuestionnaireScreen: undefined;
};

export type NewsTabParamList = {
  NewsScreen: {
    openDrawer: any;
  };
  AddPostScreen: undefined;
  NewsDetailScreen: undefined;
  NewsExampleScreen: undefined;
  ArticleScreen: {
    article: object;
  };
  QuestionnaireScreen: undefined;
  EditProfileScreen: undefined;
  GiftInfoScreen: undefined;
};

export type StudyReportTabParamList = {
  StudyReportScreen: undefined;
  EditGoalScreen: {
    post: object;
    selectedDate: any;
    dateString: string;
  };
};

export type AuthTabParamList = {
  SingInScreen: undefined;
};

export type SeatBookingTabParamList = {
  SeatBookingScreen: undefined;
};

export type AudioTabParamList = {
  PlayerScreen: undefined;
};
