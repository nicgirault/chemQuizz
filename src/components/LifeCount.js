import React, { PropTypes, Component } from 'react';
import { inject, observer } from 'mobx-react/native';
import { StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import appStyle from 'chemQuizz/src/appStyle';

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  heart: {
    marginHorizontal: 3,
  },
});

type PropsType = {
  errorCount: integer,
};

@inject((allStores) => {
  const quizzStore = allStores.quizzStore;
  return {
    errorCount: quizzStore.errorCount,
  };
})
@observer
class LifeCount extends Component {

  props: PropsType;

  render() {
    return (
      <View style={styles.container}>
        <Ionicons
          name={this.props.errorCount > 0 ? "md-heart-outline" : "md-heart"}
          size={20}
          color='red'
          style={styles.heart}
        />
        <Ionicons
          name={this.props.errorCount > 1 ? "md-heart-outline" : "md-heart"}
          size={20}
          color='red'
          style={styles.heart}
        />
        <Ionicons
          name={this.props.errorCount > 2 ? "md-heart-outline" : "md-heart"}
          size={20}
          color='red'
          style={styles.heart}
        />
      </View>
    );
  }
};

export default LifeCount;
