import React, { Dispatch, SetStateAction } from 'react';
import PropTypes from 'prop-types';
import { Modal, View } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../../../constants/Colors';
import useColorScheme from '../../../../hooks/useColorScheme';

const ModalContainer = styled.View`
  flex: 1;
`;

const ModalView = styled.View`
  flex: 1;
`;

const Text = styled.Text``;

type Props = {
  isVisible: boolean;
  handleModalVisibility: Dispatch<SetStateAction<boolean>>;
};
const CreateOccasions = ({ isVisible, handleModalVisibility }: Props) => {
  const colorScheme = useColorScheme();

  return (
    <ModalContainer>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => handleModalVisibility(false)}
      >
        <ModalView style={{ backgroundColor: Colors[colorScheme].background }}>
          <Text
            style={{
              fontSize: 40,
              fontWeight: '700',
              color: Colors[colorScheme].text,
            }}
          >
            HELLO MODAL
          </Text>
        </ModalView>
      </Modal>
    </ModalContainer>
  );
};

export default CreateOccasions;
