import { useMutation } from '@apollo/client';
import { MaterialIcons } from '@expo/vector-icons';
import React, {
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Modal, Pressable } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../../constants/Colors';
import { GET_PLAID_TRANSACTIONS_BY_TIMEFRAME } from '../../../graphql/mutations/accounts.mutations';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import {
  selectAccount,
  setSpendingAmount,
  setSpendingFilter,
} from '../../../redux/reducers/accounts.reducers';
import LoadingSpinner from '../../reusable/LoadingSpinner';

const Content = styled.View`
  margin-top: -70px;
  width: 90%;
  padding: 40px 20px;
  border-radius: 10px;
`;
const Row = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-top: -20px;
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
  const [spendingFilter, setFilter] = useState<number>(2);
  const [modalVisible, setModalVisibility] = useState<boolean>(false);
  const spendingData: SpendingProps = [
    { type: 'Year', spending: 0 },
    { type: 'Month', spending: 0 },
    { type: 'Week', spending: 0 },
  ];

  const [totalToDisplay, setTotalDisplay] = useState<number>(0);

  const [setSpending, { error, data, loading }] = useMutation(
    GET_PLAID_TRANSACTIONS_BY_TIMEFRAME,
  );

  const spendingState = useAppSelector(selectAccount);
  ////////////////////////////////////////////////////
  const dispatch = useAppDispatch();
  /////////////////////////////////////////////////

  const handleSpendingMutationAsync = async (
    token: string,
    timeFrame: 'Year' | 'Month' | 'Week',
  ) => {
    try {
      await setSpending({
        variables: {
          input: {
            accessToken: token,
            filter: timeFrame,
          },
        },
      });

      // console.log('request!', request);
    } catch (error) {
      console.error(error);
      return error;
    }
  };
  //set timkeframe in reducer
  const handleSetSpendingFilter = async (
    timeFrame: 'Year' | 'Month' | 'Week',
  ) => {
    dispatch(
      setSpendingFilter({
        spending: { filter: timeFrame },
      }),
    );
    console.log(
      'spending statelength',
      spendingState.plaidAccounts.accessTokens.length,
    );

    if (spendingState.plaidAccounts.accessTokens.length > 0) {
      spendingState.plaidAccounts.accessTokens.forEach((token: string) => {
        handleSpendingMutationAsync(token, timeFrame);
      });
    }
  };

  const handleTotalSpendingSum = (
    totals: Array<{ id: string; amount: number }>,
  ) => {
    //////////////////////////////////////////////////////
    const addedTransactions = totals.reduce(
      (prev, next) => prev + next.amount,
      0,
    );
    //////////////////////////////////////////////////////
    setTotalDisplay(addedTransactions);
  };
  //FSAD TODO NOTHING  FUCKOING WORKS UPDATINGSPENDINGN CORRECTLY
  return (
    <Content
      style={{
        marginBottom: 30,
        borderWidth: 1.5,
        borderColor: Colors[colorScheme].tint + '40',
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
      <Row>
        <SubHeading>Spending This {spendingState.spending.filter}</SubHeading>
        <DateToggler
          style={{
            backgroundColor: Colors[colorScheme].tint + '80',
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
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Total>${totalToDisplay.toFixed(2)}</Total>
      )}
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
          <ModalInner style={{ backgroundColor: '#0a363c', elevation: 10 }}>
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
