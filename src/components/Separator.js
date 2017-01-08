import React, { PropTypes } from 'react';

import {
  View,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#E4E4E4',
    marginLeft: 15
  }
});

const Separator = props => (
      <View style={styles.separator} />
);

Separator.propTypes = {
};

export default Separator;
