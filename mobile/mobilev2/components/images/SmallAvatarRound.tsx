import React from 'react';
import { Image, View } from 'react-native';

type Props = {
  imgSrc: string;
  size: number;
};

const SmallAvatarRound = ({ imgSrc, size = 15 }: Props) => {
  return (
    <View>
      <Image
        source={{ uri: imgSrc }}
        style={{ width: size, height: size, borderRadius: 900 }}
      />
    </View>
  );
};

export default SmallAvatarRound;
