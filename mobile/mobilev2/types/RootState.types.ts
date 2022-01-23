export interface AccountTypes {
  accounts: {
    myAccount: null | { name: string; email: string; profile: string };
    isAuthenticated: boolean;
  };
}
