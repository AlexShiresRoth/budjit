import { MaterialIcons } from '@expo/vector-icons';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Modal, TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../../../constants/Colors';
import useColorScheme from '../../../../hooks/useColorScheme';
import PrimaryButton from '../../../reusable/PrimaryButton';
import BudgetComponent from './create/BudgetComponent';
import CategoryComponent from './create/CategoryComponent';
import DatePickComponent from './create/DatePickComponent';
import TitleComponent from './create/TitleComponent';

const ModalContainer = styled.View`
  flex: 1;
`;

const ModalView = styled.View`
  flex: 1;
  align-items: center;
`;

const ModalHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  margin: 10px 0;
  padding: 15px 0;
  border-bottom-width: 1px;
`;

const Column = styled.View`
  flex-direction: row;
`;

const Text = styled.Text``;

const Content = styled.View`
  width: 90%;
  justify-content: center;
  flex: 0.8;
`;

const Title = styled.Text`
  font-weight: 700;
`;

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
  //handle step in process for creating an occasion
  const [stepIndex, setIndex] = useState<number>(0);

  const [occasionData, setOccasionData] = useState<OccasionParams>({
    title: '',
    group: '',
    budget: '0.00',
    category: '',
    occasionStartDate: OccasionDate,
  });

  const { title, group, budget, category, occasionStartDate } = occasionData;

  const handleChangeEvent = (text: string, name: string) =>
    setOccasionData({
      ...occasionData,
      [name]: text,
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
    setIndex(0);
    //close it!
    handleModalVisibility(false);
  };

  const DATA: Array<{ component: React.ReactNode; headerTitle: string }> = [
    {
      component: (
        <TitleComponent
          value={title}
          setValue={handleChangeEvent}
          setStep={setIndex}
          currentStep={stepIndex}
        />
      ),
      headerTitle: 'Title',
    },
    {
      component: (
        <BudgetComponent
          value={budget}
          setValue={handleChangeEvent}
          setStep={setIndex}
          currentStep={stepIndex}
        />
      ),
      headerTitle: 'Budget',
    },
    {
      component: (
        <CategoryComponent
          value={category}
          setValue={handleChangeEvent}
          setStep={setIndex}
          currentStep={stepIndex}
        />
      ),
      headerTitle: 'Category',
    },
    {
      component: (
        <DatePickComponent
          value={occasionStartDate}
          setValue={handleChangeEvent}
          setStep={setIndex}
          currentStep={stepIndex}
        />
      ),
      headerTitle: 'Start Date',
    },
  ];

  return (
    <ModalContainer>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => handleResetOnClose()}
      >
        <ModalView style={{ backgroundColor: Colors[colorScheme].background }}>
          <ModalHeader
            style={{ borderBottomColor: Colors[colorScheme].cardBg }}
          >
            <Column style={{ maxWidth: '20%' }}>
              <TouchableOpacity
                onPress={() => handleResetOnClose()}
                style={{
                  backgroundColor: Colors[colorScheme].danger + '70',
                  padding: 5,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: Colors[colorScheme].danger,
                }}
              >
                <Text style={{ color: Colors[colorScheme].text, fontSize: 12 }}>
                  Close
                </Text>
              </TouchableOpacity>
            </Column>
            <Column>
              {DATA.map(
                (
                  obj: { component: React.ReactNode; headerTitle: string },
                  index: number,
                ) => {
                  return (
                    <TouchableOpacity
                      style={{
                        marginRight: 5,
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}
                      onPress={
                        index < stepIndex ? () => setIndex(index) : () => {}
                      }
                      key={index}
                    >
                      <Text
                        key={index}
                        style={{
                          color:
                            stepIndex >= index
                              ? Colors[colorScheme].tint
                              : Colors[colorScheme].text + '40',
                          fontSize: 12,
                        }}
                      >
                        {obj.headerTitle}
                      </Text>
                      {index < DATA.length - 1 ? (
                        <MaterialIcons
                          name="navigate-next"
                          color={
                            stepIndex >= index
                              ? Colors[colorScheme].tint
                              : Colors[colorScheme].text + '40'
                          }
                          size={12}
                        />
                      ) : null}
                    </TouchableOpacity>
                  );
                },
              )}
            </Column>
          </ModalHeader>
          <Column style={{ width: '90%' }}>
            <Text
              style={{
                color: Colors[colorScheme].text,
                fontWeight: '100',
                fontSize: 20,
                marginTop: 5,
                marginBottom: 5,
              }}
            >
              Create A New Occasion
            </Text>
          </Column>
          <Content>{DATA[stepIndex].component}</Content>
        </ModalView>
      </Modal>
    </ModalContainer>
  );
};

export default CreateOccasions;
