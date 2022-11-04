import React from 'react'
import { NativeSyntheticEvent, Text, TextInput, TextInputChangeEventData, View } from 'react-native'

type Props = {
    key: string;
    value: string;
    onChange: (value: NativeSyntheticEvent<TextInputChangeEventData>) => void;
}

const EditOccasion = ({key, value, onChange}: Props) => {
  return (
    <View>
        <Text>edit occasion {key}</Text>
        <TextInput onChange={(e) => onChange(e)} value={value} />
    </View>
  )
}

export default EditOccasion