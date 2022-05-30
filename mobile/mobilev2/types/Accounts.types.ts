export type AccountParams = {
  myAccount: {
    email: string;
    name: string;
    profile: string;
  };
  token: string;
};

export type PlaidAccountsModal = {
  modalVisible: boolean;
  connection: any;
};
