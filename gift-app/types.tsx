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
};

export type DrawerParamaList = {
  home: undefined;
  SupportScreen: undefined;
  ChatScreen: undefined;
}

export type UsersStackParamList = {
  User: undefined;
}

export type NewsTabParamList = {
  NewsScreen: undefined;
  AddPostScreen: undefined;
  NewsDetailScreen: undefined;
  NewsExampleScreen: undefined;
  ArticleScreen: undefined;
};

export type StudyReportTabParamList = {
  StudyReportScreen: undefined;
  EditGoalScreen: undefined;
};
export type UsersTabParamList = {
  UsersScreen: undefined;
  UserDetailScreen: undefined;
  ChatScreen: undefined;
};

export type ChatTabParamList = {
  ChatHomeScreen: undefined;
  AdminChatHomeScreen: undefined;
  RoomScreen: undefined;
  AddRoomScreen: undefined;
}

export type AccountInfoTabParamList = {
  AccountInfoScreen: undefined;
  EditProfileScreen: undefined;
};
export type SupportTabParamList = {
  SupportScreen: undefined;
  GiftInfoScreen: undefined;
  EditProfileScreen: undefined;
}


// --------------------------------------------------
export type User = {
  uid: any;
  fname: string;
  lname: string;
  email: string;
  // 任意の値は?をつける
  pushToken?: string;
  userImg: string;
  createdAt: any;
  updatedAt: any;
}

export type AuthContextProps = {
  user: any;
  setUser: any;
  login: any;
  register: any;
  logout: any;
}
