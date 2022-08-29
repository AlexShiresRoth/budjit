import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
type Props = {
  user: any;
  removeFunc: (user: any) => void;
};

const RemovableUserItem = ({ user, removeFunc }: Props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        paddingLeft: 5,
        paddingRight: 5,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesome
          name="user-o"
          size={14}
          color={'#000'}
          onPress={() => removeFunc(user)}
        />
        <Text style={{ marginLeft: 3 }}>{user.name}</Text>
      </View>
      <TouchableOpacity
        style={{ backgroundColor: '#eee', padding: 8, borderRadius: 500 }}
        onPress={() => removeFunc(user)}
      >
        <FontAwesome
          name="trash-o"
          size={14}
          color={'#000'}
          onPress={() => removeFunc(user)}
        />
      </TouchableOpacity>
    </View>
  );
};

export default RemovableUserItem;
