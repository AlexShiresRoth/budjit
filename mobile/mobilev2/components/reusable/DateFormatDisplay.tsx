import format from 'date-fns/format';
import React from 'react';
import { Text, View } from 'react-native';

type Props = {
  dateString: string;
  formatting: string;
  dateTextColor?: string;
};

//TODO come up with time ago function
const DateFormatDisplay = ({
  dateString,
  formatting = 'p P',
  dateTextColor,
}: Props) => {
  console.log('date string', new Date(parseFloat(dateString)));
  const date = new Date(parseFloat(dateString));

  const dateFormatted = format(date, formatting);

  return (
    <View>
      <Text style={{ fontSize: 12, fontStyle: 'italic', color: dateTextColor }}>
        {dateFormatted}
      </Text>
    </View>
  );
};

export default DateFormatDisplay;
