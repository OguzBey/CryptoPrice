import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { memo } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

type HeaderBackButtonProps = {
  navigation: NativeStackNavigationProp<ParamListBase>;
  screenName: string;
};

function HeaderBackButton(props: HeaderBackButtonProps) {
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
    justifyContent: 'flex-start',
  },
  image: {
    width: 36,
    height: 36,
  },
});

export default memo(HeaderBackButton);
