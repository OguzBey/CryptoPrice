import React, { memo, useEffect, useState } from 'react';
import { Animated, Easing, GestureResponderEvent, Image, StyleSheet, Text, TouchableHighlight } from 'react-native';

type AnimatedSortOptionProps = {
  sortBy: string;
  ascSortValue: string;
  descSortValue: string;
  text: string;
  onPress: (event: GestureResponderEvent) => void;
  customCss: Record<string, any>;
};

const AnimatedSortOption = (props: AnimatedSortOptionProps) => {
  const { sortBy, ascSortValue, descSortValue, onPress, text, customCss } = props;
  const [rotateValue] = useState(new Animated.Value(0));

  useEffect(() => {
    const timeout = setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(rotateValue, {
            toValue: 1,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
            delay: 500,
          }),
          Animated.timing(rotateValue, {
            toValue: 0,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
            delay: 500,
          }),
          Animated.delay(15000),
        ])
      ).start();
    }, 2000);

    return () => clearTimeout(timeout); // bileşen unmount edildiğinde timeout'u temizle
  }, []);

  const spin = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <TouchableHighlight onPress={onPress} style={[styles.sortByItemContainer, customCss]}>
      <Animated.View style={[{ transform: [{ rotate: spin }] }, { display: 'flex', flexDirection: 'row', alignItems: 'center' }]}>
        <Text style={styles.sortByText}>{text}</Text>
        <Image
          source={
            sortBy == ascSortValue
              ? require('../assets/arrow-up.png')
              : sortBy == descSortValue
              ? require('../assets/arrow-down.png')
              : require('../assets/line.png')
          }
          style={styles.sortByImage}
        />
      </Animated.View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  sortByItemContainer: {
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  sortByText: {
    color: 'white',
    marginRight: 5,
    fontSize: 12,
    fontFamily: 'RobotoMono-Medium',
  },
  sortByImage: {
    height: 16,
    width: 16,
  },
});

export default memo(AnimatedSortOption);
