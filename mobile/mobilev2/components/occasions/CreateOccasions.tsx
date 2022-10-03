import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  FlatList,
  Modal,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import PrimaryButton from '../buttons/PrimaryButton';
import ToggleButton from '../buttons/ToggleButton';
import ContactsList from '../contacts/ContactsList';
import ContactsModal from '../contacts/ContactsModal';
import Input from '../inputs/Input';
import RemovableUserItem from '../list-items/RemovableUserItem';
import ModalContainer from '../modals/ModalContainer';
import ModalHeader from '../modals/ModalHeader';
import DatePickerModal from '../reusable/DatePickerModal';
import Row from '../reusable/layout/Row';
import Spacer from '../reusable/layout/Spacer';
import Heading from '../text/Heading';
import OccasionContacts from './OccasionContacts';

type Props = {
  isVisible: boolean;
  handleModalVisibility: Dispatch<SetStateAction<boolean>>;
};

type OccasionParams = {
  title: string;
  group: string;
  budget: string;
  category: string;
  occasionStartDate: string;
};

//TODO figure out why date select does not work
const CreateOccasions = ({ isVisible, handleModalVisibility }: Props) => {
  const colorScheme = useColorScheme();
  //set starting date to today
  const OccasionDate = new Date().toISOString();

  //contacts that the user selects, show these in a list
  const [selectedContacts, selectContacts] = useState<any[]>([]);

  //toggle state of sub modal component
  const [isContactsModalVisible, toggleContactsModal] =
    useState<boolean>(false);

  const [occasionData, setOccasionData] = useState<OccasionParams>({
    title: '',
    group: '',
    budget: '0.00',
    category: '',
    occasionStartDate: OccasionDate,
  });

  const { title, group, budget, category, occasionStartDate } = occasionData;

  const handleSelectContact = (contact: any): void => {
    // console.log('in the hole', contact);
    if (selectedContacts.find((c) => c.id === contact.id)) {
      selectContacts(selectedContacts.filter((c) => c.id !== contact.id));
    }

    selectContacts(contact);
  };

  const removeSelectedContact = (contact: any): void =>
    selectContacts(selectedContacts.filter((c) => c.id !== contact.id));

  const handleChangeEvent = (text: string, name: string) =>
    setOccasionData({
      ...occasionData,
      [name]: text,
    });

  const handleDateSelect = (date: string) => console.log('new date', date);

  const handleResetOnClose = () => {
    //reset progress of creating new occasion
    setOccasionData({
      title: '',
      group: '',
      budget: '0.00',
      category: '',
      occasionStartDate: OccasionDate,
    });
    //set step back to start
    selectContacts([]);
    //close it!
    handleModalVisibility(false);
  };

  const handleSubModalOnClose = () => {
    selectContacts([]);
    toggleContactsModal(false);
  };

  console.log('occasion start date', occasionStartDate);

  const renderItem = ({ item }: any) => (
    <RemovableUserItem
      user={item}
      removeFunc={() => removeSelectedContact(item)}
      key={item.lookupKey}
    />
  );

  return (
    <ModalContainer
      handleResetOnClose={handleResetOnClose}
      isModalVisible={isVisible}
    >
      <ModalHeader
        modalTitle="Create New Occasion"
        handleResetOnClose={handleResetOnClose}
      />
      <Row>
        <Heading headingText="Create An Occasion" />
      </Row>

      <Spacer amount={10} />
      <Row>
        <Input
          value={title}
          descriptor={'Give this occasion a name'}
          label={'Name'}
          callback={(text) => handleChangeEvent(text, 'title')}
          style={null}
          isSecure={false}
          labelStyle={null}
          color={Colors[colorScheme].tint}
          icon={
            <FontAwesome
              name="edit"
              size={22}
              color={Colors[colorScheme].tint}
            />
          }
        />
      </Row>
      <Spacer amount={10} />
      <Row>
        <Input
          value={budget}
          descriptor={'Set a max budget for this occasion'}
          label={'Budget'}
          callback={(text) => handleChangeEvent(text, 'budget')}
          style={null}
          isSecure={false}
          labelStyle={null}
          color={Colors[colorScheme].tint}
          icon={
            <FontAwesome
              name="dollar"
              size={22}
              color={Colors[colorScheme].tint}
            />
          }
        />
      </Row>
      <Row>
        <DatePickerModal
          value={occasionStartDate}
          onChange={handleDateSelect}
          param={'date'}
        />
      </Row>
      <Spacer amount={10} />
      <Row>
        <ToggleButton
          buttonColor={Colors[colorScheme].tint + '60'}
          text="Add contacts to occasion"
          textColor={Colors[colorScheme].background}
          onPress={() => toggleContactsModal(!isContactsModalVisible)}
        />
      </Row>
      <Spacer amount={10} />
      <Row>
        {selectedContacts.length > 0 ? (
          <FlatList
            data={selectedContacts}
            renderItem={renderItem}
            style={{
              backgroundColor: Colors[colorScheme].alertBackground + '60',
              padding: 5,
              borderRadius: 5,
            }}
          />
        ) : null}
      </Row>

      <OccasionContacts
        selectFunction={handleSelectContact}
        selectedContacts={selectedContacts}
        isModalVisible={isContactsModalVisible}
        toggleModal={toggleContactsModal}
        handleResetOnClose={handleSubModalOnClose}
      />
    </ModalContainer>
  );
};

export default CreateOccasions;
