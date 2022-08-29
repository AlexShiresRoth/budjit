import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Colors from '../../../../../constants/Colors';
import useColorScheme from '../../../../../hooks/useColorScheme';
import {
  MaterialIcons,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import Input from '../../../../inputs/Input';
import InputList from '../../../../inputs/InputList';
import DatePickerModal from '../../../../reusable/DatePickerModal';
import PrimaryButton from '../../../../buttons/PrimaryButton';
import { useMutation } from '@apollo/client';
import {
  CREATE_TRANSACTION,
  DELETE_TRANSACTION,
  EDIT_TRANSACTION,
} from '../../../../../graphql/mutations/spending.mutation';
import LoadingSpinner from '../../../../reusable/LoadingSpinner';
import Alert from '../../../../alerts/Alert';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../hooks/reduxHooks';
import {
  selectAlert,
  setAlert,
} from '../../../../../redux/reducers/alerts.reducers';
import {
  addManualTransaction,
  insertEditedTransaction,
  deleteTransaction as deleteTransactionAction,
} from '../../../../../redux/reducers/accounts.reducers';
import { TransactionItemType } from '../../../../../types/Transaction.types';
import DeleteButton from '../../../../buttons/DeleteButton';
import ModalContainer from '../../../../modals/ModalContainer';
import ModalHeader from '../../../../modals/ModalHeader';

const Row = styled.View`
  flex-direction: row;
`;

const Column = styled.View``;

const IconContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  width: 50px;
`;

const DateContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 5px;
  border-radius: 5px;
`;

type Props = {
  isModalVisible: boolean;
  toggleModal: Dispatch<SetStateAction<boolean>>;
  itemToEdit: TransactionItemType | null;
  modalTitle: string;
  isEditMode: boolean;
};

type FormData = {
  name: string;
  category: string;
  amount: string;
  date: string;
  accountType: string;
  location: string;
};

export type TransactionInputArrData = {
  component: React.ReactNode;
  title: string;
};

//TODO: REFACTOR THIS COMPONENT
const ManualTransactionModal = ({
  isModalVisible,
  toggleModal,
  itemToEdit,
  modalTitle,
  isEditMode,
}: Props) => {
  const colorScheme = useColorScheme();

  const dispatch = useAppDispatch();

  const [createTransaction, { error, loading }] =
    useMutation(CREATE_TRANSACTION);

  //TODO: add edit transaction mutation
  const [editTransaction, { error: editError, loading: editLoading }] =
    useMutation(EDIT_TRANSACTION);

  const [
    deleteTransaction,
    { error: deleteError, loading: deleteLoading, data: deleteData },
  ] = useMutation(DELETE_TRANSACTION);

  //change step for creating a transaction
  const [currentStep, setStep] = useState<number>(0);

  const [data, setData] = useState<FormData>({
    name: itemToEdit?.name || '',
    amount: itemToEdit?.amount.toString() || '',
    date: itemToEdit?.date || new Date().toISOString(),
    accountType: itemToEdit?.accountType || '',
    category: itemToEdit?.category || '',
    location: itemToEdit?.location || '',
  });

  const { name, date, accountType, category, location, amount } = data;

  const handleTextChange = (name: string, text: string) =>
    setData({ ...data, [name]: text });

  const handleAmountFiltering = (text: string) => {
    const regex = new RegExp(/^\d*\.?\d*$/);
    if (regex.test(text)) {
      console.log('text', text);
      handleTextChange('amount', text);
    }
  };

  const handleResetOnClose = () => {
    //reset
    setStep(0);
    //revert data
    setData({
      name: itemToEdit?.name || '',
      amount: itemToEdit?.amount.toString() || '',
      date: itemToEdit?.date || new Date().toISOString(),
      accountType: itemToEdit?.accountType || '',
      category: itemToEdit?.category || '',
      location: itemToEdit?.location || '',
    });

    //and close
    toggleModal(false);
  };

  const handleDeleteTransaction = async (_id: string | undefined) => {
    if (!_id) return;
    try {
      const deleteRequest = await deleteTransaction({
        variables: { input: { _id } },
      });

      if (deleteRequest?.data?.deleteTransaction?.success) {
        if (itemToEdit) dispatch(deleteTransactionAction({ _id }));

        dispatch(
          setAlert({
            type: 'success',
            message: 'Transaction deleted successfully',
          }),
        );

        handleResetOnClose();
      }
    } catch (error) {
      console.error('ERROR_DELETING_TRANSACTION', error);
      dispatch(
        setAlert({
          type: 'danger',
          message: 'Error deleting transaction',
        }),
      );
    }
  };

  const submit = async () => {
    const { amount } = data;
    try {
      let transaction;

      if (!isEditMode) {
        transaction = await createTransaction({
          variables: { input: { ...data, amount: parseFloat(amount) } },
        });

        //add new transaction to redux store
        dispatch(
          addManualTransaction(
            transaction?.data?.createTransaction?.Transaction,
          ),
        );

        dispatch(
          setAlert({
            type: 'success',
            message: transaction?.data?.createTransaction?.message,
          }),
        );
      }

      if (isEditMode) {
        transaction = await editTransaction({
          variables: {
            input: {
              ...data,
              amount: parseFloat(amount),
              _id: itemToEdit?._id,
            },
          },
        });

        dispatch(
          insertEditedTransaction(
            transaction?.data?.editTransaction?.Transaction,
          ),
        );

        console.log('transaction', transaction?.data?.editransaction?.message);

        dispatch(
          setAlert({
            type: 'success',
            message: transaction?.data?.editTransaction?.message,
          }),
        );
      }

      //@desc close modal on success!
      handleResetOnClose();
    } catch (error) {
      return error;
    }
  };

  //Refactor this to just be a JSON object and render inputs in the flatlist
  const DATA: Array<TransactionInputArrData> = [
    {
      title: 'Transaction',
      component: (
        <Input
          value={name}
          callback={(e: string) => handleTextChange('name', e)}
          style={{ color: Colors[colorScheme].text }}
          labelStyle={{ color: Colors[colorScheme].text }}
          label={'What did you purchase?'}
          isSecure={false}
          descriptor="Transaction Name"
          icon={
            <FontAwesome
              name="shopping-bag"
              color={Colors[colorScheme].tint}
              size={20}
            />
          }
          color={Colors[colorScheme].tint}
        />
      ),
    },
    {
      title: 'Location',
      component: (
        <Input
          value={location}
          callback={(e: string) => handleTextChange('location', e)}
          style={{ color: Colors[colorScheme].text }}
          label="Location"
          descriptor="Where was this?"
          isSecure={false}
          icon={
            <Ionicons
              name="location-sharp"
              color={Colors[colorScheme].tint}
              size={28}
            />
          }
          color={Colors[colorScheme].tint}
          labelStyle={{ color: Colors[colorScheme].text }}
        />
      ),
    },
    {
      title: 'Amount',
      component: (
        <Input
          value={amount}
          callback={(e: string) => handleAmountFiltering(e)}
          style={{ color: Colors[colorScheme].text }}
          label={'Amount'}
          descriptor="What was the amount?"
          isSecure={false}
          icon={
            <MaterialIcons
              name="attach-money"
              color={Colors[colorScheme].tint}
              size={26}
            />
          }
          color={Colors[colorScheme].tint}
          labelStyle={{ color: Colors[colorScheme].text }}
        />
      ),
    },
    {
      title: 'Category',
      component: (
        <Input
          value={category}
          callback={(e: string) => handleTextChange('category', e)}
          style={{ color: Colors[colorScheme].text }}
          label={'Category'}
          descriptor="ex: food, entertainment, groceries..."
          isSecure={false}
          icon={
            <Ionicons
              name="fast-food-sharp"
              color={Colors[colorScheme].tint}
              size={26}
            />
          }
          color={Colors[colorScheme].tint}
          labelStyle={{ color: Colors[colorScheme].text }}
        />
      ),
    },
    {
      title: 'Account Type',
      component: (
        <Input
          value={accountType}
          callback={(e: string) => handleTextChange('accountType', e)}
          style={{ color: Colors[colorScheme].text }}
          label="Account type"
          descriptor="Cash, credit, debit, etc..."
          isSecure={false}
          icon={
            <MaterialCommunityIcons
              name="credit-card-multiple"
              color={Colors[colorScheme].tint}
              size={26}
            />
          }
          color={Colors[colorScheme].tint}
          labelStyle={{ color: Colors[colorScheme].text }}
        />
      ),
    },
    {
      title: 'Date',
      component: (
        <DateContainer
          style={{ backgroundColor: Colors[colorScheme].tint + '45' }}
        >
          <IconContainer>
            <Ionicons
              name="md-calendar-sharp"
              color={Colors[colorScheme].tint}
              size={26}
            />
          </IconContainer>
          <Column>
            <DatePickerModal
              value={date}
              param="date"
              onChange={handleTextChange}
              placeholder={'Transaction date'}
              placeholderTextColor={Colors[colorScheme].text + '60'}
              style={{ marginLeft: 10, color: Colors[colorScheme].text }}
            />
          </Column>
        </DateContainer>
      ),
    },
  ];

  useEffect(() => {
    if (error || editError || deleteError) {
      // @desc set alert in state
      if (error) {
        dispatch(setAlert({ type: 'danger', message: error?.message }));
      }
      if (editError) {
        dispatch(setAlert({ type: 'danger', message: editError?.message }));
      }
      if (deleteError) {
        dispatch(setAlert({ type: 'danger', message: deleteError?.message }));
      }
    }
  }, [error]);

  if (!isModalVisible) {
    return null;
  }

  return (
    <ModalContainer
      isModalVisible={isModalVisible}
      handleResetOnClose={handleResetOnClose}
    >
      <ModalHeader
        modalTitle="Manually Enter New Transaction"
        handleResetOnClose={handleResetOnClose}
      />
      {isEditMode ? (
        <Row>
          <DeleteButton
            handleDeleteTransaction={handleDeleteTransaction}
            id={itemToEdit?._id.toString() ?? ''}
            buttonText="Delete Transaction"
          />
        </Row>
      ) : null}
      <InputList inputList={DATA} isEditMode={isEditMode} />

      {!loading || !editLoading || !deleteLoading ? (
        <PrimaryButton
          buttonText={'Submit transaction'}
          buttonTextColor={Colors[colorScheme].background}
          callBack={submit}
          callBackArgs={currentStep + 1}
          colorArr={[Colors[colorScheme].tint, Colors[colorScheme].tint]}
        />
      ) : (
        <LoadingSpinner />
      )}
    </ModalContainer>
  );
};

export default ManualTransactionModal;
