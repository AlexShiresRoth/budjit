import React from 'react';
import styled from 'styled-components/native';
import { Modal } from 'react-native';
import { useAppSelector } from '../../hooks/reduxHooks';
import { selectAlert } from '../../redux/reducers/alerts.reducers';
import Alert from '../alerts/Alert';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
const Container = styled.View`
  flex: 1;
`;
const ModalView = styled.View`
  width: 100%;
  align-items: center;
  flex: 1;
`;
const ModalInterior = styled.View`
  width: 90%;
  padding: 30px 0;
`;

type Props = {
  children: React.ReactNode;
  isModalVisible: boolean;
  handleResetOnClose: () => void;
};

const ModalContainer = ({
  children,
  isModalVisible,
  handleResetOnClose,
}: Props) => {
  const {
    isVisible,
    alert: { type },
  } = useAppSelector(selectAlert);

  const colorScheme = useColorScheme();

  return (
    <Container>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => handleResetOnClose()}
      >
        {isVisible && type === 'danger' ? <Alert /> : null}
        <ModalView
          style={{
            backgroundColor: Colors[colorScheme].background,
          }}
        >
          <ModalInterior>{children}</ModalInterior>
        </ModalView>
      </Modal>
    </Container>
  );
};

export default ModalContainer;
