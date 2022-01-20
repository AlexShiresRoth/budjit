import React, { useEffect } from 'react';
import { connect, RootStateOrAny } from 'react-redux';
import { AccountTypes } from '../../types/RootState.types';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { RootTabParamList } from '../../types';

type ChildElem = {
  children: React.ReactNode;
};

const AuthRoute = ({ accounts, children }: AccountTypes & ChildElem) => {
  const navigation = useNavigation();

  return (
    <AuthHandler
      accounts={accounts}
      navigation={navigation}
      children={children}
    />
  );
};

const AuthHandler = ({
  accounts,
  navigation,
  children,
}: AccountTypes & BottomTabScreenProps<RootTabParamList, any> & ChildElem) => {
  const { isAuthenticated } = accounts;
  //TODO this works kind of, only on first render really
  useEffect(() => {
    if (!isAuthenticated) {
      navigation.navigate('Signin');
    }
  }, [isAuthenticated]);

  console.log('navigation safsdff', navigation);

  return <>{children}</>;
};

const mapStateToProps = (state: RootStateOrAny) => ({
  accounts: state.accounts,
});

export default connect(mapStateToProps, {})(AuthRoute);
