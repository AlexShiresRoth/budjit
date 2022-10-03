import React, { useEffect, useState } from 'react';
import { FlatList, Modal, Text, View } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';

const Row = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

type Props = {
  item: any;
  selectFunction: (data: any) => void;
  selectedContacts: Array<any>;
};
const ContactItem = ({ item, selectFunction, selectedContacts }: Props) => {
  const [isSelected, select] = useState<boolean>(false);

  const colorScheme = useColorScheme();

  const checkIfContactIsSelected = (contact: any): void => {
    //check if user is already selected
    if (selectedContacts.find((c) => c.lookupKey === contact.lookupKey)) {
      const removeSelected = selectedContacts.filter(
        (c) => c.lookupKey !== contact.lookupKey,
      );
      selectFunction(removeSelected);
      select(false);
    }
    //remove from list if already selected
    else {
      selectFunction([...selectedContacts, contact]);
      select(true);
    }
  };

  //check if contacts are already selected on load
  useEffect(() => {
    return selectedContacts.find((c) => c.lookupKey === item.lookupKey)
      ? select(true)
      : select(false);
  }, []);

  return (
    <Row
      style={{
        borderBottomWidth: 1,
        borderColor: Colors[colorScheme].text + '20',
        padding: 10,
        backgroundColor: isSelected
          ? Colors[colorScheme].tint + '60'
          : 'transparent',
      }}
      onPress={() => checkIfContactIsSelected(item)}
    >
      <View>
        <Text style={{ fontWeight: '700', color: Colors[colorScheme].text }}>
          {item.name}
        </Text>
        <Text>{item?.phoneNumbers[0]?.number}</Text>
      </View>
    </Row>
  );
};

export default ContactItem;
