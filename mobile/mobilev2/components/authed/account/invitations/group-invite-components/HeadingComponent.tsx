import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components/native';
import { Text, TouchableOpacity } from 'react-native';
import Colors from '../../../../../constants/Colors';
import { AntDesign } from '@expo/vector-icons';

const HeadingContent = styled.View`
  width: 90%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CloseBtn = styled.TouchableOpacity`
  padding: 5px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  flex-direction: row;
  border-color: #ffffff33;
  border-width: 2px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

type InviteProps = {
  colorScheme: 'light' | 'dark';
  showSearch: boolean;
  setModalVisibility: Dispatch<
    SetStateAction<{ type: 'group' | 'occasion'; show: boolean }>
  >;
  toggleSearch: (val: boolean) => void;
};

const HeadingComponent = ({
  colorScheme,
  showSearch,
  setModalVisibility,
  toggleSearch,
}: InviteProps) => {
  return (
    <HeadingContent>
      {!showSearch ? (
        <>
          <Text
            style={{
              color: Colors[colorScheme].text,
              fontWeight: '700',
              fontSize: 16,
            }}
          >
            Send Invites
          </Text>
          <CloseBtn
            onPress={() => setModalVisibility({ type: 'group', show: false })}
            style={{ backgroundColor: Colors[colorScheme].tint }}
          >
            <Text
              style={{
                color: Colors[colorScheme].text,
                marginRight: 10,
              }}
            >
              Close{' '}
            </Text>
            <AntDesign
              name="closecircleo"
              size={14}
              color={Colors[colorScheme].text}
            />
          </CloseBtn>
        </>
      ) : (
        <Row>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 5,
            }}
            onPress={() => toggleSearch(false)}
          >
            <AntDesign
              name="back"
              color={Colors[colorScheme].text}
              size={20}
              style={{ marginRight: 10 }}
            />
            <Text
              style={{
                color: Colors[colorScheme].text,
                fontSize: 16,
                fontWeight: '700',
              }}
            >
              Back
            </Text>
          </TouchableOpacity>
        </Row>
      )}
    </HeadingContent>
  );
};

export default HeadingComponent;
