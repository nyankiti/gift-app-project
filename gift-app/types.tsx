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
  AddPost: undefined;
  NewsDetail: undefined;
};

export type StudyReportTabParamList = {
  StudyReportScreen: undefined;
};
export type UsersTabParamList = {
  UsersScreen: undefined;
  UserDetailScreen: undefined;
  ChatScreen: undefined;
};

export type ChatTabParamList = {
  ChatHomeScreen: undefined;
  RoomScreen: undefined;
  AddRoomScreen: undefined;
}

export type AccountInfoTabParamList = {
  AccountInfoScreen: undefined;
  EditProfileScreen: undefined;
};
export type SupportTabParamList = {
  SupportScreen: undefined;
}


// --------------------------------------------------
export type User = {
  uid: any;
  fname: string;
  lname: string;
  email: string;
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
