export type TransactionItemType = {
  name: string;
  date: string;
  amount: number;
  transaction_id: string;
  _id: string;
  location: string | null;
};

export interface AccountsInitialStateParams {
  myAccount: {
    email: string;
    name: string;
    profile: string;
  };
  plaidAccounts: {
    connection: any;
    modalVisible: boolean;
    accessTokens: Array<string>;
  };
  spending: {
    filter: 'Month' | 'Year' | 'Week';
    totals: Array<{ id: string; amount: number }>;
    startDate: string;
    endDate: string;
    isSpendingFilterLoading: boolean;
    account_transactions: Array<{
      account_id: string;
      transactions: Array<TransactionItemType>;
    }>;
  };
  isAuthenticated: boolean;
}
