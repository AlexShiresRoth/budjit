import { useMutation } from '@apollo/client';
import { MaterialIcons } from '@expo/vector-icons';
import React, { SetStateAction, useEffect } from 'react';
import { Modal, Pressable } from 'react-native';
import styled from 'styled-components/native';
import Colors, { ColorScheme } from '../../../../constants/Colors';
import { SET_TIMEFRAME } from '../../../../graphql/mutations/spending.mutation';

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
  dispatchAction: ({
    filter,
    startDate,
    endDate,
  }: {
    filter: 'Year' | 'Month' | 'Week';
    startDate: string;
    endDate: string;
  }) => void;
} & ColorScheme) => {
  //set timeframe for whole spending state
  const [setTimeFrame] = useMutation(SET_TIMEFRAME);

  const handleTimeFrame = async (filter: 'Week' | 'Year' | 'Month') => {
    try {
      const request = await setTimeFrame({ variables: { input: { filter } } });

      if (request?.data?.setTimeFrame?.success) {
        const { startDate, endDate } = request.data.setTimeFrame;
        //set filter time in redux store
        //set start and end date in redux store
        dispatchAction({ filter, startDate, endDate });
      }
    } catch (error) {
      //most likely error would be a connection issue
      console.error(error);
      return error;
    }
  };

  //set time frame on load
  useEffect(() => {
    handleTimeFrame('Week');
  }, []);

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
                    handleTimeFrame(timeFrame.type);
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

export default TimeModal;
