import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView } from 'react-native';
import { withNavigation } from '@exponent/ex-navigation';
import { Page, CategoryListItem } from 'chemQuizz/src/components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

type PropsType = {
  navigator: any,
};

@withNavigation
class Categories extends Component {
  static route = {
    navigationBar: {
      title: 'Catégories',
    },
  };
  props: PropsType;

  render() {
    return (
      <Page>
        <View style={styles.container}>
          <ListView datasource="{this.state.dataSource}" renderrow="{this._renderItem.bind(this)}" style="flex = 1" />
        </View>
      </Page>
    );
  }
 }

export default Categories;
