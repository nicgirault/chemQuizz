import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight } from 'react-native';
import { withNavigation } from '@exponent/ex-navigation';
import Router from 'chemQuizz/src/Router.js';
import { Page, Separator } from 'chemQuizz/src/components';
import api from '../../Utils/api';


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  categoryName: {
    color: '#48BBEC',
    fontSize: 18,
    paddingBottom: 5
  },
});

type PropsType = {
  navigator: any
};

@withNavigation
class Categories extends Component {
  static route = {
    navigationBar: {
      title: 'Catégories'
    },
  };
  props: PropsType;

  launchQuizz(category){
    api.getQuizzList(category)
      .then((quizzList) => {
        console.log(quizzList);
        this.props.navigator.push(
          Router.getRoute('quizz', {category, quizzList})
        );
      }
    )
  }

  render() {
    const categories = this.props.route.params.categories;
    const list = categories.map((category, index) => {
      return(
        <View key={index}>
          <View style={styles.rowContainer}>
            <TouchableHighlight
              onPress={() => this.launchQuizz(category)}
              underlayColor='transparent'
            >
              <Text style={styles.categoryName}>{category}</Text>
            </TouchableHighlight>
          </View>
          <Separator />
        </View>
      )
    });
    return (
      <Page>
        <ScrollView style={styles.container}>
          {list}
        </ScrollView>
      </Page>
    );
  }
 }

Categories.propTypes = {
  categories: React.PropTypes.array.isRequired
};

export default Categories;
