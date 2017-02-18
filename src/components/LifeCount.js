import React, { PropTypes, Component } from 'react';
import { inject, observer } from 'mobx-react/native';
import { StyleSheet, View } from 'react-native';

import appStyle from 'chemQuizz/src/appStyle';

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  emptyDot: {
    borderColor: appStyle.colors.primary,
    borderWidth: 1,
    width: 10,
    height: 10,
    marginHorizontal: 3,
  },
  coloredDot: {
    borderColor: appStyle.colors.primary,
    backgroundColor: appStyle.colors.primary,
    borderWidth: 1,
    width: 10,
    height: 10,
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
        <View style={this.props.errorCount > 0 ? styles.emptyDot : styles.coloredDot}></View>
        <View style={this.props.errorCount > 1 ? styles.emptyDot : styles.coloredDot}></View>
        <View style={this.props.errorCount > 2 ? styles.emptyDot : styles.coloredDot}></View>
      </View>
    );
  }
};

export default LifeCount;
