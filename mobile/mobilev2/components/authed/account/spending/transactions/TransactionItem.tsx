import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import useColorScheme from '../../../../../hooks/useColorScheme';
import Colors from '../../../../../constants/Colors';
import { TransactionItemType } from '../../../../../types/Transaction.types';
import { format } from 'date-fns';
import { Feather } from '@expo/vector-icons';
import ManualTransactionModal from '../../../../modals/transaction-modal/ManualTransactionModal';

const Item = styled.TouchableOpacity`
  padding: 20px;
  margin: 0 10px 0 0;
  border-radius: 5px;
  min-width: 200px;
`;
const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Text = styled.Text``;

const TransactionItem = ({
  item,
}: {
  item: TransactionItemType;
  filter: 'Week' | 'Month' | 'Year';
  startDate: string;
  endDate: string;
}) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);

  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);

  const colorScheme = useColorScheme();

  const handleNavigationToEditableItem = (isEditable: boolean): void => {
    if (!isEditable) return;
    setIsEditModalVisible(true);
  };

  useEffect(() => {
    if (item.account_id === 'manual_transaction') {
      setIsEditable(true);
    }
  }, [item]);

  return (
    <>
      {/* modal renders stale data if conditionally handled in modal component */}
      {isEditModalVisible ? (
        <ManualTransactionModal
          isModalVisible={isEditModalVisible}
          toggleModal={setIsEditModalVisible}
          itemToEdit={item}
          modalTitle="Edit Manual Transaction"
          isEditMode={true}
        />
      ) : null}
      <Item
        style={{
          backgroundColor: Colors[colorScheme].success + '20',
          // elevation: 3,
        }}
        onPress={() => handleNavigationToEditableItem(isEditable)}
      >
        <Row
          style={{
            borderBottomWidth: 1,
            borderBottomColor: Colors[colorScheme].tint + '20',
          }}
        >
          <Text
            style={{
              color: Colors[colorScheme].text + '60',
              fontWeight: '400',
              marginBottom: 2,
              marginTop: 2,
              fontSize: 15,
            }}
          >
            {typeof item?.location === 'string'
              ? item?.location?.length > 8
                ? item?.location?.substring(0, 8) + '...'
                : item?.location
              : 'N/A'}
          </Text>
          <Text
            style={{
              color: Colors[colorScheme].tint + '80',
              fontWeight: '200',
              marginBottom: 5,
              marginTop: 5,
              fontStyle: 'italic',
              fontSize: 12,
            }}
          >
            {format(new Date(item.date).getTime(), 'P')}
          </Text>
        </Row>
        <Text
          style={{
            color: Colors[colorScheme].text + '90',
            fontWeight: '700',
            marginBottom: 5,
            marginTop: 5,
          }}
        >
          {item.name}
        </Text>

        <Text
          style={{
            color: item.amount < 0 ? 'green' : Colors[colorScheme].danger,
            fontWeight: '700',
            marginBottom: 5,
            marginTop: 5,
          }}
        >
          ${item.amount.toFixed(2)}
        </Text>

        {isEditable ? (
          <Row>
            <Row>
              <Text
                style={{
                  color: Colors[colorScheme].tint,
                  fontSize: 12,
                  marginRight: 2,
                }}
              >
                Edit
              </Text>
              <Feather name="edit" size={12} color={Colors[colorScheme].tint} />
            </Row>
          </Row>
        ) : null}
      </Item>
    </>
  );
};

export default TransactionItem;
