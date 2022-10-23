import { FontAwesome } from '@expo/vector-icons';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { add } from 'date-fns';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import PrimaryButton from '../buttons/PrimaryButton';
import ToggleButton from '../buttons/ToggleButton';
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
import { useMutation } from '@apollo/client';
import { CREATE_OCCASION } from '../../graphql/mutations/occasions.mutations';
import LoadingSpinner from '../reusable/LoadingSpinner';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { addOccasion } from '../../redux/reducers/occasions.reducer';

type Props = {
  isVisible: boolean;
  handleModalVisibility: Dispatch<SetStateAction<boolean>>;
};

type OccasionParams = {
  title: undefined | string;
  budget: string;
  occasionStartDate: string;
  occasionEndDate: string;
};

const CreateOccasions = ({ isVisible, handleModalVisibility }: Props) => {
  const colorScheme = useColorScheme();
  //redux dispatch
  const dispatch = useAppDispatch();
  //need today's date to set a month from now as the default end date
  const today = new Date();
  //set starting date to today
  const OCCASION_START_DATE_TEMP = new Date().toISOString();
  //set default end date to 1 month from today
  const OCCASION_END_DATE_TEMP = add(today, { months: 1 }).toISOString();
  //contacts that the user selects, show these in a list
  const [selectedContacts, selectContacts] = useState<any[]>([]);
  //mutation for creating occasions
  const [createOccasion, { loading, data, error }] =
    useMutation(CREATE_OCCASION);

  //handle the ability to create occasion by toggling button disabled
  const [canCreateOccasion, setCanCreateOccasion] = useState<boolean>(false);

  //toggle state of sub modal component
  const [isContactsModalVisible, toggleContactsModal] =
    useState<boolean>(false);

  const [occasionData, setOccasionData] = useState<OccasionParams>({
    title: undefined,
    budget: '0.00',
    occasionStartDate: OCCASION_START_DATE_TEMP,
    occasionEndDate: OCCASION_END_DATE_TEMP,
  });

  const { title, budget, occasionStartDate, occasionEndDate } = occasionData;

  const handleSelectContact = (contact: any): void => {
    // console.log('in the hole', contact);
    if (selectedContacts.find((c) => c.id === contact.id)) {
      selectContacts(selectedContacts.filter((c) => c.id !== contact.id));
    }

    selectContacts(contact);
  };

  const removeSelectedContact = (contact: any): void =>
    selectContacts(selectedContacts.filter((c) => c.id !== contact.id));

  const handleBudgetSanitization = (budget: string): void => {
    //remove all non numeric characters
    const sanitizedBudget = budget.replace(/[^\d.-]/g, '');

    handleChangeEvent('budget', sanitizedBudget);
  };

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
      budget: '0.00',
      occasionStartDate: OCCASION_START_DATE_TEMP,
      occasionEndDate: OCCASION_END_DATE_TEMP,
    });
    //set step back to start
    selectContacts([]);
    //close it!
    handleModalVisibility(false);
  };

  //reset contacts and members selected if back out
  const handleSubModalOnClose = () => {
    selectContacts([]);
    toggleContactsModal(false);
  };

  const handleCreateOccasion = async (data: OccasionParams): Promise<void> => {
    try {
      const newOccasion = await createOccasion({
        variables: {
          input: occasionData,
        },
      });

      //@TODO: handle error with alert
      if (!newOccasion?.data?.createOccasion?.success) {
        return console.log(
          'error creating occasion',
          newOccasion?.data?.error?.message,
        );
      }
      //Add occasion to redux store
      dispatch(
        addOccasion({ occasion: newOccasion?.data?.createOccasion?.Occasion }),
      );
      //display alert upon creation
      //close out modal and return to main screen
      handleResetOnClose();
    } catch (error) {
      console.error('error creating occasion', error);
    }
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
    if (title && budget) {
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
            value={title ?? ""}
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
            callback={(text) => handleBudgetSanitization(text)}
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

        {/* END DATE PICKER */}
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
              value={occasionEndDate}
              onChange={handleChangeEvent}
              param={'occasionEndDate'}
              label={'Set an end date'}
            />
          </View>
        </Row>
        {/* END DATE PICKER */}

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

        {!loading ? (
          <PrimaryButton
            buttonText="Create Occasion"
            disabled={canCreateOccasion ? false : true}
            colorArr={[Colors[colorScheme].tint, Colors[colorScheme].tint]}
            callBack={handleCreateOccasion}
            callBackArgs={occasionData}
            buttonTextColor={Colors[colorScheme].background}
          />
        ) : (
          <View>
            <LoadingSpinner />
          </View>
        )}

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
