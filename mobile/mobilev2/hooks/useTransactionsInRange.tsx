import React, { useEffect, useState } from 'react';
import { selectAccount } from '../redux/reducers/accounts.reducers';
import { TransactionItemType } from '../types/Transaction.types';
import { useAppSelector } from './reduxHooks';

const useTransactionsInRange = () => {
  const [transactionsInRange, setRange] =
    useState<Array<TransactionItemType>>();

  const {
    spending: { endDate, startDate, account_transactions, filter },
  } = useAppSelector(selectAccount);

  const handleRange = () => {
    if (account_transactions.length > 0) {
      const transactions = account_transactions
        .map((account) => account.transactions)
        .flat();

      const filtered = transactions.filter((transaction) => {
        const transactionDateNum = new Date(transaction?.date).getTime();
        //@FIX
        //set end to the next day, not sure this is a good idea at the moment
        const extendedEnd = new Date(endDate);

        return (
          transactionDateNum > new Date(startDate).getTime() &&
          transactionDateNum <
            new Date(extendedEnd.setDate(extendedEnd.getDate() + 1)).getTime()
        );
      });

      const sorted = filtered.sort(
        (a: TransactionItemType, b: TransactionItemType) => {
          let aDate = new Date(a.date),
            bDate = new Date(b.date);

          return aDate.getTime() > bDate.getTime() ? -1 : 1;
        },
      );

      setRange(sorted);
    }
  };

  useEffect(() => {
    handleRange();
  }, [filter, account_transactions]);

  return { transactionsInRange };
};

export default useTransactionsInRange;
