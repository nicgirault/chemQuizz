import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { withNavigation } from '@exponent/ex-navigation';
import Router from 'chemQuizz/src/Router.js';
import { Page, Button } from 'chemQuizz/src/components';
import { inject } from 'mobx-react/native';
import api from '../../Utils/api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 1,
    padding: 10,
    alignItems: 'center',
    marginTop: 5,
    borderRadius: 5,
  },
  categoryName: {
    color: '#FFFFFF',
    fontSize: 18,
    paddingBottom: 5,
    fontWeight: 'bold',
  },
  button: {
    marginHorizontal: 10,
  },
});

type PropsType = {
  navigator: any,
  fetchQuizzList: () => void,
};

@withNavigation
@inject((allStores) => {
  const quizzStore = allStores.quizzStore;
  return {
    fetchQuizzList: quizzList => quizzStore.fetchQuizzList(quizzList),
  };
})
class Categories extends Component {
  static route = {
    navigationBar: {
      title: 'Catégories',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  props: PropsType;

  launchQuizz(category) {
    this.setState({isLoading: true});
    api.getQuizzList(category.name)
      .then((quizzList) => {
        this.props.fetchQuizzList(quizzList);
        this.setState({isLoading: false});
        this.props.navigator.push(
          Router.getRoute('quizz', { category }),
        );
      },
    );
  }

  render() {
    const categories = this.props.route.params.categories;
    const list = categories.map((category, index) =>
      <View key={index}>
        <Button
          style={[styles.button, {backgroundColor: category.color}]}
          onPress={() => this.launchQuizz(category)}
          type='standard'
          isLoading={this.state.isLoading}
          isDisabled={this.state.isLoading}
        >
          {category.name}
        </Button>
      </View>,
    );
    return (
      <Page noNavBar>
        <ScrollView style={styles.container}>
          {list}
        </ScrollView>
      </Page>
    );
  }
 }

Categories.propTypes = {
  categories: React.PropTypes.array.isRequired,
};

export default Categories;
