import React from 'react';
import styled from 'styled-components/native';

const IconContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin-right: 10px;
  width: 50px;
  border-right-width: 1px;
`;

type Props = {
  icon: React.ReactNode;
  borderRightColor: string;
};
const IconContainerWithRightBorder = ({ icon, borderRightColor }: Props) => (
  <IconContainer style={{ borderRightColor }}>{icon}</IconContainer>
);

export default IconContainerWithRightBorder;
