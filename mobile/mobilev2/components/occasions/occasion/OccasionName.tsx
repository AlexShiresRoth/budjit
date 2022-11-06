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
              marginBottom: -4,
            }}
          >
            Occasion Name
          </Text>
          <Text style={{ fontSize: 26, fontWeight: '700' }}>
            {occasion?.title ?? 'No Title'}
            <EvilIcons name="pencil" size={22} />
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={{ marginVertical: 10, width: '100%' }}>
          <Text
            style={{
              fontSize: 12,
              color: Colors[colorScheme].text + '50',
              marginBottom: -4,
            }}
          >
            Edit Occasion Name
          </Text>
          <View
            style={{
              justifyContent: 'space-between',
              width: '90%',
            }}
          >
            <TextInput
              value={occasionName}
              onChange={(text) => handleNameChange(text)}
              style={{
                fontSize: 26,
                fontWeight: '700',
                borderBottomWidth: 1,
                borderBottomColor: Colors[colorScheme].text,
                width: '100%',
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
                justifyContent: 'space-between',
              }}
            >
              <TouchableOpacity
                onPress={() => toggleTitle(!isTitleToggled)}
                style={{
                  padding: 5,
                  borderRadius: 999,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text style={{ marginRight: 5, fontSize: 13 }}>Save</Text>

                <Feather name="save" size={13} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => toggleTitle(!isTitleToggled)}
                style={{
                  padding: 5,
                  borderRadius: 999,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text style={{ marginRight: 5, fontSize: 13 }}>Cancel</Text>

                <AntDesign name="closecircleo" size={13} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default OccasionName;
