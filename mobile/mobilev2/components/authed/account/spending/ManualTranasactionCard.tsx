import React, { useState } from 'react';
import FloatingButton from '../../../buttons/FloatingButton';
import ManualTransactionModal from './transaction-modal/ManualTransactionModal';

const ManualTransactionCard = () => {
  const [modalVisible, toggleModal] = useState(false);

  return (
    <FloatingButton
      buttonText="New Transaction"
      modalVisible={modalVisible}
      modalToggle={toggleModal}
      modalComponent={
        <ManualTransactionModal
          isModalVisible={modalVisible}
          toggleModal={toggleModal}
          modalTitle="Manually enter new transaction"
          itemToEdit={null}
          isEditMode={false}
        />
      }
    />
  );
};

export default ManualTransactionCard;
