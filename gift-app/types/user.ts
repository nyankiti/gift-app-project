export type oldUser = {
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
  seat?: {
    position: string;
    color: string;
    icon: any;
  };
};

export type User = {
  uid: any;
  displayName: string | undefined | null;
  email?: string;
  userImg?: string;
  pushToken?: string;
  createdAt?: any;
  updatedAt?: any;
  seat?: {
    position: string;
    color: string;
    icon: any;
  };
};
