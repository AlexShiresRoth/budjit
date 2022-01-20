import React from 'react';
import styled from 'styled-components/native';
const Main = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Logo = styled.Text`
  font-weight: 700;
  font-size: 60px;
  color: #f9f8f8;
`;

const Text = styled.Text`
  color: #fff;
  font-weight: 700;
  font-size: 20px;
`;

const Splash = () => {
  return (
    <Main>
      <Logo>Budjit</Logo>
    </Main>
  );
};

export default Splash;
