import { AntDesign, EvilIcons, Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  NativeSyntheticEvent,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';
import { OccasionType } from '../../../types/Occasion.types';
import { Button, ViewWithBG } from '../../Themed';
import EditOccasionName from './ocassion-name/EditOccasionName';

type Props = {
  occasion: OccasionType;
};

const OccasionName = ({ occasion }: Props) => {
  const colorScheme = useColorScheme();

  const [isTitleToggled, toggleTitle] = useState<boolean>(false);

  const [occasionName, setOccasionName] = useState<string>('');

  const handleNameChange = (
    text: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => setOccasionName(text.nativeEvent.text);

  useEffect(() => {
    setOccasionName(occasion?.title);
  }, [occasion]);

  return (
    <>
      {!isTitleToggled ? (
        <Button
          style={{ marginVertical: 10 }}
          onPress={() => toggleTitle(!isTitleToggled)}
        >
          <Text
            style={{
              fontSize: 12,
              color: Colors[colorScheme].text + '50',
              marginBottom: -4,
            }}
          >
            Occasion Name
          </Text>
          <Text style={{ fontSize: 20, fontWeight: '700' }}>
            {occasion?.title ?? 'No Title'}
            <EvilIcons name="pencil" size={22} />
          </Text>
        </Button>
      ) : (
        <EditOccasionName
          isTitleToggled={isTitleToggled}
          toggleTitle={toggleTitle}
          occasionName={occasionName}
          handleNameChange={handleNameChange}
        />
      )}
    </>
  );
};

export default OccasionName;
