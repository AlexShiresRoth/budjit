import React from 'react';
import styled from 'styled-components/native';
import Colors from '../../../../constants/Colors';
import { Feather } from '@expo/vector-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../../../../types';

const ToggleHeading = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  border-bottom-width: 1px;
`;

const ToggleHeadingColumn = styled.TouchableOpacity`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;

type Props = BottomTabScreenProps<
  RootTabParamList,
  | 'InvitationsScreen'
  | 'OccasionInvitationsScreen'
  | 'SentOccasionInvites'
  | 'ReceivedOccasionInvites'
>;

const ToggleInviteTypes = ({
  colorScheme,
  navigation,
  route,
}: {
  colorScheme: 'light' | 'dark';
  currentInviteType: 'group' | 'occasion';
} & Props) => {
  const handleNavigationToggle = (route: keyof RootTabParamList) => {
    navigation.navigate(route);
  };
  return (
    <ToggleHeading
      style={{
        borderBottomColor: Colors[colorScheme].tint + '90',
      }}
    >
      <ToggleHeadingColumn
        style={{
          backgroundColor: Colors[colorScheme].tint + '90',
          paddingTop: 20,
          paddingBottom: 20,
          borderRightWidth: 0.2,
          borderRightColor: Colors[colorScheme].tint + '90',
          borderBottomWidth: 1,
          borderBottomColor:
            route.params && route.params.name === 'group'
              ? Colors[colorScheme].success
              : Colors[colorScheme].tint,
        }}
        onPress={() => handleNavigationToggle('InvitationsScreen')}
      >
        {route.params && route.params.name === 'group' && (
          <Feather
            name="chevrons-right"
            color={Colors[colorScheme].success}
            size={20}
          />
        )}
        <Text
          style={{
            color: Colors[colorScheme].text,
            textAlign: 'center',
            marginLeft: 10,
          }}
        >
          Groups
        </Text>
      </ToggleHeadingColumn>
      <ToggleHeadingColumn
        style={{
          backgroundColor: Colors[colorScheme].tint + '90',
          paddingBottom: 20,
          paddingTop: 20,
          borderLeftWidth: 0.2,
          borderLeftColor: Colors[colorScheme].tint + '90',
          borderBottomColor:
            route.params && route.params.name === 'occasion'
              ? Colors[colorScheme].success
              : Colors[colorScheme].tint,
          borderBottomWidth: 1,
        }}
        onPress={() => handleNavigationToggle('OccasionInvitationsScreen')}
      >
        <Text
          style={{
            color: Colors[colorScheme].text,
            textAlign: 'center',
            marginRight: 10,
          }}
        >
          Occasions
        </Text>
        {route.params && route.params.name === 'occasion' && (
          <Feather
            name="chevrons-left"
            color={Colors[colorScheme].success}
            size={20}
          />
        )}
      </ToggleHeadingColumn>
    </ToggleHeading>
  );
};

export default ToggleInviteTypes;
