import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { memo } from 'react';
import { TouchableOpacity, Text, StyleSheet, Image } from 'react-native';

type HeaderBackButtonProps = {
  navigation: NativeStackNavigationProp<ParamListBase>;
  screenName: string;
  displayText: string;
};

function HeaderRightButton(props: HeaderBackButtonProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => props.navigation.navigate(props.screenName)}>
      <Image source={require('../assets/back.png')} style={styles.image} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  text: {
    fontSize: 14,
    fontFamily: 'RobotoMono-Medium',
    color: '#4CAF50',
  },
  image: {
    width: 36,
    height: 36,
    transform: [{ scaleX: -1 }],
  },
});

export default memo(HeaderRightButton);
