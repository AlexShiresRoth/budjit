import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  FlatList,
  Modal,
  ScrollView,
  Text,
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
import IconContainerWithRightBorder from '../icons/IconContainerWithRightBorder';
import Input from '../inputs/Input';
import RemovableUserItem from '../list-items/RemovableUserItem';
import ModalContainer from '../modals/ModalContainer';
import ModalHeader from '../modals/ModalHeader';
import DatePickerModal from '../reusable/DatePickerModal';
import Row from '../reusable/layout/Row';
import RowSpaceBetween from '../reusable/layout/RowSpaceBetween';
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

const CreateOccasions = ({ isVisible, handleModalVisibility }: Props) => {
  const colorScheme = useColorScheme();
  //set starting date to today
  const OccasionDate = new Date().toISOString();

  //contacts that the user selects, show these in a list
  const [selectedContacts, selectContacts] = useState<any[]>([]);

  //handle the ability to create occasion by toggling button disabled
  const [canCreateOccasion, setCanCreateOccasion] = useState<boolean>(false);

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

  //name must be first, and value second for date picker
  const handleChangeEvent = (name: string, value: string) =>
    setOccasionData({
      ...occasionData,
      [name]: value,
    });

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

  const handleCreateOccasion = async () => {};

  const handleSubModalOnClose = () => {
    selectContacts([]);
    toggleContactsModal(false);
  };

  const renderItem = ({ item }: any) => (
    <View
      style={{
        minWidth: 200,
        backgroundColor: Colors[colorScheme].alertBackground + '80',
        padding: 5,
        marginRight: 5,
        borderRadius: 10,
      }}
    >
      <RemovableUserItem
        user={item}
        removeFunc={() => removeSelectedContact(item)}
        key={item.lookupKey}
      />
    </View>
  );

  //only allow user to create occasion if title field is filled
  useEffect(() => {
    if (title !== '') {
      setCanCreateOccasion(true);
    }
  }, [title]);

  return (
    <ModalContainer
      handleResetOnClose={handleResetOnClose}
      isModalVisible={isVisible}
    >
      <ModalHeader
        modalTitle="Create New Occasion"
        handleResetOnClose={handleResetOnClose}
      />
      <ScrollView style={{ paddingBottom: 50 }}>
        <Row>
          <Heading headingText="Create An Occasion" />
        </Row>

        {/* TITLE INPUT */}
        <Spacer amount={10} />
        <Row>
          <Input
            value={title}
            descriptor={'Give this occasion a name'}
            label={'Name'}
            callback={(text) => handleChangeEvent('title', text)}
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
        {/* TITLE INPUT */}

        {/* BUDGET INPUT */}
        <Spacer amount={10} />
        <Row>
          <Input
            value={budget}
            descriptor={'Set a max budget for this occasion'}
            label={'Budget'}
            callback={(text) => handleChangeEvent('budget', text)}
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
        {/* BUDGET INPUT */}

        {/* DATE PICKER */}
        <Spacer amount={10} />
        <Row>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 5,
              borderColor: Colors[colorScheme].tint,
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <IconContainerWithRightBorder
              icon={
                <FontAwesome
                  name="calendar"
                  size={22}
                  color={Colors[colorScheme].tint}
                />
              }
              borderRightColor={Colors[colorScheme].tint}
            />

            <DatePickerModal
              value={occasionStartDate}
              onChange={handleChangeEvent}
              param={'occasionStartDate'}
              label={'Set a start date'}
            />
          </View>
        </Row>
        {/* DATE PICKER */}

        {/* Contact List   */}
        <Spacer amount={10} />
        <RowSpaceBetween>
          <ToggleButton
            buttonColor={Colors[colorScheme].tint + '60'}
            text="Add contacts to occasion"
            textColor={Colors[colorScheme].background}
            onPress={() => toggleContactsModal(!isContactsModalVisible)}
          />
          <Text style={{ color: Colors[colorScheme].text + '60' }}>
            Contacts: {selectedContacts.length}
          </Text>
        </RowSpaceBetween>

        <Spacer amount={5} />
        <Row>
          {selectedContacts.length > 0 ? (
            <FlatList
              data={selectedContacts}
              renderItem={renderItem}
              style={{
                padding: 5,
              }}
              horizontal={true}
            />
          ) : null}
        </Row>
        {/* Contact List   */}

        {/* Member list */}
        <Spacer amount={5} />
        <RowSpaceBetween>
          <ToggleButton
            buttonColor={Colors[colorScheme].success + '60'}
            text="Add members to occasion"
            textColor={Colors[colorScheme].background}
            onPress={() => toggleContactsModal(!isContactsModalVisible)}
          />
          <Text style={{ color: Colors[colorScheme].text + '60' }}>
            Members: {0}
          </Text>
        </RowSpaceBetween>
        {/* Member list */}

        <PrimaryButton
          buttonText="Create Occasion"
          disabled={canCreateOccasion ? false : true}
          colorArr={[Colors[colorScheme].tint, Colors[colorScheme].tint]}
          callBack={() => console.log('create occasion')}
          callBackArgs={occasionData}
          buttonTextColor={Colors[colorScheme].background}
        />

        <OccasionContacts
          selectFunction={handleSelectContact}
          selectedContacts={selectedContacts}
          isModalVisible={isContactsModalVisible}
          toggleModal={toggleContactsModal}
          handleResetOnClose={handleSubModalOnClose}
        />
      </ScrollView>
    </ModalContainer>
  );
};

export default CreateOccasions;
