export type User = {
  uid: any;
  displayName: string | undefined | null;
  fname?: string;
  lname?: string;
  email?: string;
  // 任意の値は?をつける
  pushToken?: string;
  userImg?: string;
  createdAt?: any;
  updatedAt?: any;
};
