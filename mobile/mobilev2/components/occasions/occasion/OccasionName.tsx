import { AntDesign, EvilIcons } from '@expo/vector-icons';
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
        <TouchableOpacity
          style={{ marginVertical: 10 }}
          onPress={() => toggleTitle(!isTitleToggled)}
        >
          <Text
            style={{
              fontSize: 12,
              color: Colors[colorScheme].text + '50',
              marginBottom: -6,
            }}
          >
            Occasion Name
          </Text>
          <Text style={{ fontSize: 30, fontWeight: '700' }}>
            {occasion?.title ?? 'No Title'}{' '}
            <EvilIcons name="pencil" size={30} />
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={{ marginVertical: 10, width: '100%' }}>
          <Text
            style={{
              fontSize: 12,
              color: Colors[colorScheme].text + '50',
              marginBottom: -6,
            }}
          >
            Edit Occasion Name
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <TextInput
              value={occasionName}
              onChange={(text) => handleNameChange(text)}
              style={{
                fontSize: 30,
                fontWeight: '700',
                borderBottomWidth: 1,
                borderBottomColor: Colors[colorScheme].text,
                minWidth: '80%',
                maxWidth:"80%"
              }}
            />
            <TouchableOpacity
              onPress={() => toggleTitle(!isTitleToggled)}
              style={{
                backgroundColor: Colors[colorScheme].accountBg + '50',
                padding: 5,
                borderRadius: 999,
              }}
            >
              <Text>
                <AntDesign name="closecircleo" size={25} />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default OccasionName;
