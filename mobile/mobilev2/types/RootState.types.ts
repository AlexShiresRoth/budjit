export interface AccountTypes {
  accounts: {
    myAccount: null | { name: string; email: string };
    isAuthenticated: boolean;
  };
}
