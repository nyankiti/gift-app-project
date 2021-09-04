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
};
