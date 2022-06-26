import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../../constants/Colors';
import { useAppDispatch } from '../../hooks/reduxHooks';
import useColorScheme from '../../hooks/useColorScheme';
import { setAlert } from '../../redux/reducers/alerts.reducers';
import AddButton from '../buttons/AddButton';
import Input from '../reusable/Input';

const Container = styled.View`
  flex: 1;
  width: 100%;
`;

const Row = styled.View`
  align-items: center;
  flex-direction: row;
  margin: 5px 0;
`;

type Props = {
  data: Array<string>;
  inputLabel: string;
  inputName: string;
  handleAddToList: (data: any) => void;
  handleRemoveFromList: (data: any) => void;
};

const DynamicInputGroup = ({
  data,
  inputLabel,
  inputName,
  handleAddToList,
  handleRemoveFromList,
}: Props) => {
  const colorScheme = useColorScheme();

  const [text, setText] = useState<string>('');

  const renderItem = ({ item }: { item: string }) => {
    return (
      <Row
        style={{
          borderBottomWidth: 1,
          borderBottomColor: Colors[colorScheme].tint + '30',
          justifyContent: 'space-between',
          width: '100%',
          paddingTop: 5,
          paddingBottom: 5,
          alignItems: 'center',
        }}
      >
        <Row>
          <AntDesign
            name="user"
            size={14}
            color={Colors[colorScheme].tint}
            style={{ marginRight: 5 }}
          />
          <Text>{item}</Text>
        </Row>

        <TouchableOpacity
          onPress={() => handleRemoveFromList(item)}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <AntDesign
            name="delete"
            size={14}
            color={Colors[colorScheme].text + '90'}
          />
          <Text
            style={{ color: Colors[colorScheme].text + '90', marginLeft: 2 }}
          >
            Remove
          </Text>
        </TouchableOpacity>
      </Row>
    );
  };

  return (
    <Container>
      <Row>
        <Input
          value={text}
          callback={(e: string) => setText(e)}
          style={{ color: Colors[colorScheme].text }}
          labelStyle={{ color: Colors[colorScheme].text }}
          label={inputLabel}
          isSecure={false}
          descriptor={inputName}
          icon={
            <AntDesign
              name="addusergroup"
              color={Colors[colorScheme].tint}
              size={20}
            />
          }
          color={Colors[colorScheme].tint}
        />
      </Row>
      <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ color: Colors[colorScheme].text + '90', fontSize: 14 }}>
          Invites will appear below
        </Text>
        <AddButton addFunction={handleAddToList} args={text} />
      </Row>
      <Row>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item: string) => item}
          style={{ width: '100%' }}
        />
      </Row>
    </Container>
  );
};

export default DynamicInputGroup;
