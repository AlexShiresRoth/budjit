export type TransactionItemType = {
  name: string;
  date: string;
  amount: number;
  transaction_id: string;
  account_id: string | null;
  _id: string;
  location: string | null;
  category: string;
  accountType: string;
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
    transactions_in_date_range: Array<TransactionItemType>;
  };
  isAuthenticated: boolean;
}

export type SpendingStateParams = {
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
    transactions_in_date_range: Array<TransactionItemType>;
  };
};
