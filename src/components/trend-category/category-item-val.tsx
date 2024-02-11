import { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

type CategoryItemInfoProps = {
  title: string;
  value: string;
  valueColor: 'green' | 'red';
};

const CategoryItemValue = ({ title, value, valueColor }: CategoryItemInfoProps): JSX.Element => {
  console.log('CategoryItemValue rendered!!!');
  return (
    <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={[styles.text, styles.textItemInfo, styles.whiteText]}>{title}</Text>
      <Text style={[styles.text, styles.textItemInfo, valueColor == 'green' ? styles.greenText : styles.redtext]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'RobotoMono-Medium',
  },

  textItemInfo: {
    fontSize: 12,
  },
  whiteText: {
    color: 'white',
  },
  greenText: {
    color: '#4CAF50',
  },
  redtext: {
    color: '#F44336',
  },
});

export default memo(CategoryItemValue);
