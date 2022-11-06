import React from 'react';
import { FlatList, View } from 'react-native';
import Colors from '../../../../constants/Colors';
import useColorScheme from '../../../../hooks/useColorScheme';
import ModalContainer from '../../../modals/ModalContainer';
import ModalHeader from '../../../modals/ModalHeader';
import AllActivityCard from './AllActivityCard';

type Props = {
  isModalVisible: boolean;
  handleResetOnClose: () => void;
  activityList: any[];
};

const AllActivityModal = ({
  isModalVisible,
  handleResetOnClose,
  activityList,
}: Props) => {
  const colorScheme = useColorScheme();

  const renderItem = ({ item }: any) => {
    return <AllActivityCard item={item} key={item._id} />;
  };
  return (
    <ModalContainer
      isModalVisible={isModalVisible}
      handleResetOnClose={handleResetOnClose}
    >
      <ModalHeader
        modalTitle="All Group Activity"
        handleResetOnClose={handleResetOnClose}
      />
      <FlatList
        data={activityList}
        renderItem={renderItem}
        style={{ marginBottom: 50 }}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              backgroundColor: Colors[colorScheme].alertBackground + '80',
            }}
          />
        )}
      />
    </ModalContainer>
  );
};

export default AllActivityModal;
