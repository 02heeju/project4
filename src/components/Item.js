//flatlist의 구조

import React from 'react';
import {
    StyleSheet, 
    View, 
    Text,
    TouchableOpacity,
    TextInput
} from 'react-native';

const Item = ({lyric}) => {
  return (
    <View>
      <TextInput 
        multiline={true}>{lyric.split('\n')}</TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    height: 100,
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 50,
  },
});

export default Item;