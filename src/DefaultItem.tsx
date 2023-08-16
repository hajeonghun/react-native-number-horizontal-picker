import React from 'react';
import { StyleSheet, View, ViewStyle, Text } from 'react-native';

interface ItemProps {
  style: ViewStyle;
}

function DefaultItem({ style }: ItemProps) {
  return (
    <View style={StyleSheet.compose(styles.block, style)} />
  );
}

export default DefaultItem;

const styles = StyleSheet.create({
  block: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    borderColor: '#979797',
    height: 30,
    borderRightWidth: 1,
  },
});
