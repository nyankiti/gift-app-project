// NavigationのParamaList
export type RootStackParamList = {
  Root: undefined;
  Auth: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  News: undefined;
  StudyReport: undefined;
  Users: undefined;
  AccountInfo: undefined;
  Chat: undefined;
  Support: undefined;
  SeatBooking: undefined;
};

export type DrawerParamaList = {
  home: undefined;
  EditProfileScreen: undefined;
  GiftInfoScreen: undefined;
}

export type UsersStackParamList = {
  User: undefined;
}

export type NewsTabParamList = {
  NewsScreen: undefined;
  AddPostScreen: undefined;
  NewsDetailScreen: undefined;
  NewsExampleScreen: undefined;
  ArticleScreen: {
    article: object,
  };
};

export type StudyReportTabParamList = {
  StudyReportScreen: undefined;
  EditGoalScreen: {
    post: object, 
    selectedDate: any, 
    dateString: string
  };
};
export type UsersTabParamList = {
  UsersScreen: undefined;
  UserDetailScreen: undefined;
  ChatScreen: undefined;
};

export type ChatTabParamList = {
  ChatHomeScreen: undefined;
  AdminChatHomeScreen: undefined;
  RoomScreen: {
    thread: object
  };
  AddRoomScreen: undefined;
  QuestionnaireScreen: undefined;
}

export type AccountInfoTabParamList = {
  AccountInfoScreen: undefined;
  EditProfileScreen: undefined;
};
export type SupportTabParamList = {
  SupportScreen: undefined;
  GiftInfoScreen: undefined;
  EditProfileScreen: undefined;
// ChatTabへの遷移もできるようにTabをもたせる
  Chat: undefined;
}

export type SeatBookingTabParamList = {
  SeatBookingScreen: undefined;
  SeatUnBookingScreen: undefined;
  // drawerからの遷移用
  EditProfileScreen: undefined;
  GiftInfoScreen: undefined;
}


// --------------------------------------------------
export type User = {
  uid: any;
  displayName: string;
  fname: string;
  lname: string;
  email: string;
  // 任意の値は?をつける
  pushToken?: string;
  userImg: string;
  createdAt: any;
  updatedAt: any;
}


// ------------------------------------------------------
export type SeatObject = {
  'A': Array<boolean>,
  'B': Array<boolean>,
  'C': Array<boolean>,
  'D': Array<boolean>,
  'E': Array<boolean>,
}
