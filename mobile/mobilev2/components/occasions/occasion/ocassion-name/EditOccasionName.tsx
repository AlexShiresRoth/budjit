import { AntDesign, Feather } from '@expo/vector-icons';
import React from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import Colors from '../../../../constants/Colors';
import useColorScheme from '../../../../hooks/useColorScheme';
import { Button, Text, TextInput, View } from '../../../Themed';

type Props = {
  occasionName: string;
  handleNameChange: (
    text: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => void;
  toggleTitle: (isToggled: boolean) => void;
  isTitleToggled: boolean;
};

const EditOccasionName = ({
  occasionName,
  handleNameChange,
  toggleTitle,
  isTitleToggled,
}: Props) => {
  const colorScheme = useColorScheme();

  return (
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
            fontSize: 20,
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
          <Button
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
          </Button>
          <Button
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
          </Button>
        </View>
      </View>
    </View>
  );
};

export default EditOccasionName;
