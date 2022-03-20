import { MaterialIcons } from '@expo/vector-icons';
import React, { SetStateAction, useEffect, useState } from 'react';
import { Modal, Pressable } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../../constants/Colors';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import {
  selectAccount,
  setSpendingFilter,
} from '../../../redux/reducers/accounts.reducers';
import LoadingSpinner from '../../reusable/LoadingSpinner';

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

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ModalView = styled.View`
  align-items: center;
  justify-content: flex-end;
  elevation: 10;
  border-radius: 10px;
  flex: 1;
`;
const ModalInner = styled.View`
  elevation: 10;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  flex: 0.6;
  width: 100%;
`;
const ModalRow = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 5px 0;
  padding: 10px 0;
`;
const ModalText = styled.Text`
  font-weight: 700;
  font-size: 15px;
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

  const spendingState = useAppSelector(selectAccount);
  ////////////////////////////////////////////////////
  const dispatch = useAppDispatch();
  /////////////////////////////////////////////////

  //set timkeframe in reducer
  const handleSetSpendingFilter = async (
    timeFrame: 'Year' | 'Month' | 'Week',
  ) => {
    dispatch(
      setSpendingFilter({
        spending: { filter: timeFrame, startDate: '', endDate: '' },
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

    let formattedTotal: string = '0.00';

    const totalSplitByDecimal = addedTransactions
      .toFixed(2)
      .toString()
      .split('.');

    const firstHalfOfTotal = totalSplitByDecimal[0].split('');

    if (firstHalfOfTotal.length > 4) {
      firstHalfOfTotal.reverse().forEach((s: string, index: number) => {
        if (index % 4 === 0) firstHalfOfTotal.splice(index, 0, ',');
      });
      //remove comma at end of array
      firstHalfOfTotal.reverse().pop();
    }
    //if total is just in the thousands, no need to loop through in order to insert comma
    if (firstHalfOfTotal.length === 4) firstHalfOfTotal.splice(1, 0, ',');
    //combine values before and after decimal point
    formattedTotal = firstHalfOfTotal.join('') + '.' + totalSplitByDecimal[1];
    //////////////////////////////////////////////////////
    setTotalDisplay(formattedTotal);
  };

  const handleDateChanges = () => {
    const {
      spending: { endDate, startDate },
    } = spendingState;
    if (startDate && endDate) {
      //start range
      const startArr = startDate.split('-');
      const year = startArr[0];
      startArr.shift();
      startArr.push(year);
      const newStart = startArr.join('/');
      //end range
      const endArr = endDate.split('-');
      const endYear = endArr[0];
      endArr.shift();
      endArr.push(endYear);
      const newEnd = endArr.join('/');

      setDates({ startDate: newStart, endDate: newEnd });
    }
  };

  useEffect(() => {
    if (spendingState.spending.totals.length > 0) {
      handleTotalSpendingSum(spendingState.spending.totals);
    }
  }, [spendingState.spending.totals]);

  useEffect(() => {
    handleDateChanges();
  }, [spendingState.spending]);

  //TODO spending filter update works, need to clean and refactor
  console.log(spendingState);
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
          {dates.startDate} - {dates.endDate}
        </DateRange>
      </Row>
      <Row>
        <SubHeading style={{ color: Colors[colorScheme].text }}>
          Spending This {spendingState.spending.filter}
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
        {spendingState.spending.isSpendingFilterLoading ? (
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

const TimeModal = ({
  modalVisible,
  setModalVisibility,
  colorScheme,
  data,
  setFilter,
  spendingFilter,
  dispatchAction,
}: {
  modalVisible: boolean;
  setModalVisibility: SetStateAction<any>;
  setFilter: SetStateAction<any>;
  data: SpendingProps;
  spendingFilter: number;
  dispatchAction: (val: 'Year' | 'Month' | 'Week') => void;
} & ColorScheme) => {
  return (
    <ModalContainer>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisibility(false)}
        style={{ height: '50%' }}
      >
        <ModalView>
          <ModalInner
            style={{
              backgroundColor: Colors[colorScheme].cardBg,
              elevation: 10,
            }}
          >
            <MaterialIcons
              name="date-range"
              size={25}
              color={Colors[colorScheme].text + 'cc'}
            />
            <ModalText
              style={{
                color: Colors[colorScheme].text,
                fontWeight: '100',
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              Set Filter By...
            </ModalText>
            {data.map((timeFrame: SpendingProps[0], key: number) => {
              return (
                <ModalRow
                  key={key}
                  style={{
                    borderColor: Colors[colorScheme].tint + '44',
                    borderBottomWidth: 1,
                  }}
                  onPress={() => {
                    setFilter(key);
                    //need to set filter in reducer
                    dispatchAction(timeFrame.type);
                    //close modal
                    setModalVisibility(false);
                  }}
                >
                  {spendingFilter === key ? (
                    <ModalText
                      style={{
                        color: Colors[colorScheme].text + '60',
                        fontWeight: '100',
                        fontSize: 16,
                      }}
                    >
                      Current
                    </ModalText>
                  ) : null}
                  <ModalText style={{ color: Colors[colorScheme].text }}>
                    {timeFrame.type}ly spending
                  </ModalText>
                </ModalRow>
              );
            })}
            <Pressable
              onPress={() => setModalVisibility(false)}
              style={{
                backgroundColor: Colors[colorScheme].danger,
                padding: 10,
                borderRadius: 5,
                elevation: 3,
                marginTop: 20,
                width: 100,
                alignItems: 'center',
              }}
            >
              <ModalText style={{ color: Colors[colorScheme].text }}>
                Close
              </ModalText>
            </Pressable>
          </ModalInner>
        </ModalView>
      </Modal>
    </ModalContainer>
  );
};

export default Spending;
