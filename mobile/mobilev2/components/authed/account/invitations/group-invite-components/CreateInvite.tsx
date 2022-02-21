import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components/native';
import { Modal, ScrollView } from 'react-native';
import useColorScheme from '../../../../../hooks/useColorScheme';
import Colors from '../../../../../constants/Colors';
import HeadingComponent from './HeadingComponent';
import ToggleSearchButton from './ToggleSearchButton';
import SearchContainer from './SearchContainer';
import CreateGroup from './CreateGroup';

const ModalView = styled.View`
  flex: 1;
  align-items: center;
`;

const Heading = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  width: 100%;
`;

type ModalProps = {
  showModal: boolean;
  setModalVisibility: Dispatch<
    SetStateAction<{ type: 'group' | 'occasion'; show: boolean }>
  >;
};

const CreateInvite = ({ showModal, setModalVisibility }: ModalProps) => {
  const colorScheme = useColorScheme();

  const [showSearch, toggleSearch] = useState<boolean>(false);

  return (
    <ScrollView style={{ flex: 1 }}>
      <Modal
        animationType="slide"
        visible={showModal}
        onRequestClose={() =>
          setModalVisibility({ type: 'group', show: false })
        }
      >
        <ModalView style={{ backgroundColor: Colors[colorScheme].background }}>
          <Heading
            style={{
              borderBottomWidth: 1,
              borderBottomColor: Colors[colorScheme].tint + '80',
            }}
          >
            <HeadingComponent
              toggleSearch={toggleSearch}
              setModalVisibility={setModalVisibility}
              colorScheme={colorScheme}
              showSearch={showSearch}
            />
          </Heading>
          {!showSearch ? (
            <>
              <CreateGroup
                colorScheme={colorScheme}
                setModalVisibility={setModalVisibility}
              />
              <ToggleSearchButton
                colorScheme={colorScheme}
                toggleSearch={toggleSearch}
              />
            </>
          ) : (
            <SearchContainer colorScheme={colorScheme} />
          )}
        </ModalView>
      </Modal>
    </ScrollView>
  );
};

export default CreateInvite;
