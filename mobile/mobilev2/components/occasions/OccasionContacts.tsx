import React, { useState } from 'react';
import ContactsModal from '../contacts/ContactsModal';

type Props = {
  selectFunction: (data: any) => void;
  selectedContacts: any[];
  isModalVisible: boolean;
  toggleModal: (val: boolean) => void;
  handleResetOnClose: () => void;
};

const OccasionContacts = ({
  selectFunction,
  selectedContacts,
  isModalVisible,
  toggleModal,
  handleResetOnClose,
}: Props) => {
  return (
    <ContactsModal
      isModalVisible={isModalVisible}
      handleRequestOnClose={handleResetOnClose}
      toggleModal={() => toggleModal(!isModalVisible)}
      selectFunction={selectFunction}
      selectedContacts={selectedContacts}
    />
  );
};

export default OccasionContacts;
