import React, { PropTypes } from 'react';
import { Text, StyleSheet, View } from 'react-native';

import appStyle from 'chemQuizz/src/appStyle';

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    borderColor: appStyle.colors.textExtraLight,
    borderTopWidth: 1,
    alignItems: 'center',
    marginHorizontal: 50,
  },
  text: {
    position: 'relative',
    top: -10,
    textAlign: 'center',
    color: appStyle.colors.textExtraLight,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
});

const Separator = props => (
  <View style={styles.container}>
    {props.text && <Text style={styles.text}>{props.text}</Text>}
  </View>
);

Separator.propTypes = {
  text: PropTypes.string,
};

export default Separator;
