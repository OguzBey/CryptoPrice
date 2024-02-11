import React, { memo, useEffect, useState } from 'react';
import { Animated, Easing } from 'react-native';
import { formatMoney, formatNumberWithGroup, numberFormatter } from '../helpers/utils';

type AnimatedNumberProps = {
  value: string;
  customCss: Record<string, any>;
};

const AnimatedNumber = (props: AnimatedNumberProps) => {
  const [animatedValue] = useState(new Animated.Value(0));
  const [currentValue, setCurrentValue] = useState('');

  useEffect(() => {
    const fixedValue = parseFloat(props.value.replace(/[,$MB-]/g, '')) || 0;

    Animated.timing(animatedValue, {
      toValue: fixedValue,
      useNativeDriver: true,
      duration: 500,
      easing: Easing.cubic,
    }).start(() => {
      animatedValue.removeAllListeners();
      animatedValue.setValue(0);
      setCurrentValue(props.value);
    });

    animatedValue.addListener(({ value }) => {
      if (props.value.includes('$')) {
        setCurrentValue(`${formatMoney(value)}`);
      } else if (props.value.includes('B') || props.value.includes('M')) {
        setCurrentValue(`${formatNumberWithGroup(value)}`);
      } else {
        setCurrentValue(`${numberFormatter.format(value)}`);
      }
    });
  }, [props.value]);

  return <Animated.Text style={props.customCss}>{currentValue}</Animated.Text>;
};

export default memo(AnimatedNumber);
