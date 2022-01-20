export interface ProfileInterface {
  name: string;
  avatar: string;
  accountId: string;
}

export interface UpdateProfileInterface {
  name: string;
  avatar: string;
  profileId: string;
}

export interface MyProfile {
  name: string;
  avatar: string;
  _id: string;
}
