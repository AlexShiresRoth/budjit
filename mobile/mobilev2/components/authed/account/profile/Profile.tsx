import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../types';
import { useQuery } from '@apollo/client';
import { LOAD_MY_PROFILE } from '../../../../graphql/queries/profiles.query';
import Colors from '../../../../constants/Colors';
import useColorScheme from '../../../../hooks/useColorScheme';
import DisplayName from './DisplayName';
import { useAppSelector } from '../../../../hooks/reduxHooks';
import { selectProfile } from '../../../../redux/reducers/profiles.reducers';

const ScrollArea = styled.ScrollView`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
  align-items: center;
`;
const Content = styled.View`
  width: 90%;
`;

const ErrorMessage = styled.Text`
  color: #fff;
`;
const BackgroundTop = styled.View`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const AvatarContainer = styled.View`
  height: 160px;
  width: 160px;
  margin-top: 5%;
  border-width: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`;
const Avatar = styled.Image`
  height: 140px;
  width: 140px;
  border-radius: 4px;
`;

const Span = styled.Text`
  font-weight: 500;
  font-size: 14px;
`;

const Number = styled.Text`
  font-weight: 700;
  font-size: 20px;
`;

const Title = styled.Text`
  font-weight: 700;
  font-size: 16px;
`;

const Column = styled.View``;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 1% 0;
  position: relative;
  padding: 0.5% 0;
`;

const Block = styled.TouchableOpacity`
  padding: 6%;
`;

const Text = styled.Text`
  font-size: 14px;
`;

const ButtonContainer = styled.View`
  margin: 10px 0;
`;

const Button = styled.Button``;

type DataProps = Array<{ title: string; number: number; bgColor: string }>;

type ColorScheme = { colorScheme: 'light' | 'dark' };

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const Profile = ({ route, navigation }: Props) => {
  const colorScheme = useColorScheme();

  const { data, loading, error, refetch } = useQuery(LOAD_MY_PROFILE);

  const [profileData, setProfileData] = useState({
    avatar: '',
    name: '',
  });

  const profileState = useAppSelector(selectProfile);

  console.log('profile data', data, loading);

  const { name, avatar } = profileData;

  useEffect(() => {
    if (data && !error) {
      setProfileData({
        avatar: data.loadMyProfile.avatar,
        name: data.loadMyProfile.name,
      });
    }
  }, [error, data]);

  //need to re query the profile if an update is made elsewhere
  useEffect(() => {
    refetch();
  }, [profileState]);

  const DATA: DataProps = [
    {
      title: 'Occasions',
      number: 0,
      bgColor: '#4DCCBD',
    },
    {
      title: 'Groups',
      number: 0,
      bgColor: '#FF8484',
    },
    {
      title: 'Invites',
      number: 0,
      bgColor: '#FEFCAD',
    },
  ];

  if (error) {
    return (
      <Container>
        <ErrorMessage>{error.message}</ErrorMessage>
      </Container>
    );
  }
  if (loading) {
    return (
      <Container>
        <Text>Loading Profile...</Text>
      </Container>
    );
  }
  return (
    <ScrollArea>
      <Container>
        <BackgroundTop
          style={{
            backgroundColor: Colors[colorScheme].tint,
            height: '16%',
          }}
        />
        <BackgroundTop
          style={{
            backgroundColor: Colors[colorScheme].tint + '66',
            height: '18%',
          }}
        />
        <Content>
          {avatar ? (
            <AvatarContainer
              style={{
                elevation: 1,
                borderColor: Colors[colorScheme].tint,
                backgroundColor: Colors[colorScheme].tint,
                shadowColor: '#222',
                shadowOffset: {
                  width: 20,
                  height: 10,
                },
                shadowOpacity: 1,
              }}
            >
              <Avatar source={{ uri: avatar }} />
            </AvatarContainer>
          ) : null}
          <DisplayName name={name} />
          <StatsSection DATA={DATA} colorScheme={colorScheme} />
          <CreationBlock DATA={DATA} colorScheme={colorScheme} />
        </Content>
      </Container>
    </ScrollArea>
  );
};

const StatsSection = ({
  DATA,
  colorScheme,
}: { DATA: DataProps } & ColorScheme) => {
  return (
    <Column style={{ marginTop: '6%' }}>
      <Title style={{ color: Colors[colorScheme].text }}>Stats</Title>
      {DATA.map((obj: DataProps[number], index: number) => {
        return (
          <Row key={index}>
            <Span
              style={{
                color: Colors[colorScheme].text + '80',
                fontSize: 20,
              }}
            >
              {obj.title}
            </Span>
            <Number
              style={{
                color: Colors[colorScheme].text,
                textAlign: 'center',
              }}
            >
              {obj.number}
            </Number>
          </Row>
        );
      })}
    </Column>
  );
};

const CreationBlock = ({
  DATA,
  colorScheme,
}: { DATA: DataProps } & ColorScheme) => {
  return (
    <Column style={{ marginTop: '6%' }}>
      <Title style={{ color: Colors[colorScheme].text }}>Creation</Title>
      <Row style={{ marginTop: '2%' }}>
        {DATA.map((obj: DataProps[number], key: number) => {
          return (
            <Column key={key}>
              <Block
                style={{
                  backgroundColor: obj.bgColor,
                  borderRadius: 5,
                  width: '100%',
                }}
              >
                <Span>Create</Span>
                <Text style={{ fontWeight: '700', fontSize: 20 }}>
                  {obj.title.substring(0, obj.title.length - 1)}
                </Text>
                <ButtonContainer>
                  <Button
                    title="Start"
                    color={Colors[colorScheme].background}
                  />
                </ButtonContainer>
              </Block>
            </Column>
          );
        })}
      </Row>
    </Column>
  );
};

export default Profile;
