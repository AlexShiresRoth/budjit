import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Colors from '../../../../constants/Colors';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import {
  selectAccount,
  setSpendingFilter,
} from '../../../../redux/reducers/accounts.reducers';
import { format } from 'date-fns';
import LoadingSpinner from '../../../reusable/LoadingSpinner';
import TimeModal from './TimeModal';

const Content = styled.View`
  margin-top: -70px;
  width: 90%;
  padding: 20px 20px;
  border-radius: 10px;
`;
const Row = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0;
`;
const SubHeading = styled.Text`
  font-size: 16px;
  color: #fefefe;
  font-weight: 700;
`;
const Total = styled.Text`
  color: #fefefe;
  font-weight: 700;
  font-size: 50px;
`;
const AccountText = styled.Text`
  font-weight: 100;
  font-size: 12px;
`;
const Divider = styled.View`
  height: 1px;
  width: 100%;
`;
const DateToggler = styled.TouchableOpacity`
  padding: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DateText = styled.Text`
  font-size: 10px;
  font-weight: 700;
  margin-left: 5px;
`;

const DateRange = styled.Text`
  font-size: 12px;
`;

type SpendingProps = Array<{
  type: 'Year' | 'Month' | 'Week';
  spending: number;
}>;

type ColorScheme = { colorScheme: 'light' | 'dark' };

const Spending = ({ colorScheme }: ColorScheme) => {
  ///////////////////////////////////////////////////////
  const [spendingFilter, setFilter] = useState<number>(2);
  ///////////////////////////////////////////////////////
  const [modalVisible, setModalVisibility] = useState<boolean>(false);
  ///////////////////////////////////////////////////////
  const spendingData: SpendingProps = [
    { type: 'Year', spending: 0 },
    { type: 'Month', spending: 0 },
    { type: 'Week', spending: 0 },
  ];

  const [dates, setDates] = useState<{ startDate: string; endDate: string }>({
    startDate: '',
    endDate: '',
  });

  const [totalToDisplay, setTotalDisplay] = useState<string>('0.00');

  const { spending } = useAppSelector(selectAccount);
  ////////////////////////////////////////////////////
  const dispatch = useAppDispatch();
  /////////////////////////////////////////////////

  //set timeframe in reducer
  const handleSetSpendingFilter = async ({
    filter,
    startDate,
    endDate,
  }: {
    filter: 'Year' | 'Month' | 'Week';
    startDate: string;
    endDate: string;
  }) => {
    dispatch(
      setSpendingFilter({
        spending: { filter, startDate, endDate },
      }),
    );
  };

  const handleTotalSpendingSum = (
    totals: Array<{ id: string; amount: number }>,
  ) => {
    //////////////////////////////////////////////////////
    const addedTransactions = totals.reduce(
      (prev, next) => prev + next.amount,
      0,
    );

    console.log('formatted totalsss', addedTransactions);

    let formattedTotal: string = '0.00';

    if (addedTransactions)
      formattedTotal = addedTransactions.toFixed(2).toString();
    //////////////////////////////////////////////////////
    setTotalDisplay(formattedTotal);
  };

  const handleDateFormats = () => {
    if (spending.startDate && spending.endDate) {
      setDates({
        startDate: format(new Date(spending.startDate), 'P'),
        endDate: format(new Date(spending.endDate), 'P'),
      });
    }
  };

  useEffect(() => {
    handleDateFormats();
  }, [spending?.startDate, spending?.endDate]);

  useEffect(() => {
    if (spending.totals.length > 0) {
      handleTotalSpendingSum(spending.totals);
    }
  }, [spending.totals]);

  return (
    <Content
      style={{
        marginBottom: 30,
        borderWidth: 1.5,
        borderColor: Colors[colorScheme].tint + '90',
        backgroundColor: Colors[colorScheme].background,
        elevation: 10,
      }}
    >
      <TimeModal
        setModalVisibility={setModalVisibility}
        setFilter={setFilter}
        data={spendingData}
        modalVisible={modalVisible}
        colorScheme={colorScheme}
        spendingFilter={spendingFilter}
        dispatchAction={handleSetSpendingFilter}
      />
      <Row style={{ marginBottom: 0 }}>
        <DateRange
          style={{
            color: Colors[colorScheme].text + '80',
            margin: 0,
            fontStyle: 'italic',
          }}
        >
          {dates?.startDate} - {dates?.endDate}
        </DateRange>
      </Row>
      <Row>
        <SubHeading style={{ color: Colors[colorScheme].text }}>
          Spending This {spending.filter}
        </SubHeading>
        <DateToggler
          style={{
            backgroundColor: Colors[colorScheme].tint + '90',
            borderWidth: 3,
            borderColor: Colors[colorScheme].tint + '50',
          }}
          onPress={() => setModalVisibility(true)}
        >
          <MaterialIcons
            name="date-range"
            size={12}
            color={Colors[colorScheme].text + 'cc'}
          />
          <DateText style={{ color: Colors[colorScheme].text + 'cc' }}>
            Change Timeframe
          </DateText>
        </DateToggler>
      </Row>

      <Row>
        {spending.isSpendingFilterLoading ? (
          <LoadingSpinner />
        ) : (
          <Total style={{ color: Colors[colorScheme].text }}>
            ${totalToDisplay}
          </Total>
        )}
      </Row>
      <Divider style={{ backgroundColor: Colors[colorScheme].tint + '90' }} />
      <Row>
        <AccountText style={{ color: Colors[colorScheme].tint + '70' }}>
          Combined Accounts Total
        </AccountText>
      </Row>
    </Content>
  );
};

export default Spending;
