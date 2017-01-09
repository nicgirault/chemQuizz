import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { withNavigation } from '@exponent/ex-navigation';
import { Page } from 'chemQuizz/src/components';
import { map, sample, omit } from 'lodash';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

type PropsType = {
  navigator: any
};

@withNavigation
class Categories extends Component {
  static route = {
    navigationBar: {
      title: 'Quizz'
    },
  };
  props: PropsType;

  submitAnswerBuilder(correctAnswer) {
    return (answerKey) => {
      const result = (answerKey !== correctAnswer) ? 'Failed' : 'YAY'
      console.log(result);
    }
  }

  render() {
    const quizz = sample(this.props.route.params.quizzList);
    const { correct, ...allAnswers } = quizz;
    const submitAnswerHandler = this.submitAnswerBuilder(correct);

    const list = map(allAnswers, (answerLabel, answerKey) => {
      console.log(answerKey);
      console.log(answerLabel);
      return(
        <View key={answerKey}>
          <View style={styles.rowContainer}>
            <TouchableHighlight
              onPress={() => submitAnswerHandler(answerKey)}
              underlayColor='transparent'
            >
              <Text style={styles.categoryName}>{answerLabel}</Text>
            </TouchableHighlight>
          </View>
        </View>
      )
    });
    return (
      <Page>
        <View style={styles.container}>
          {list}
        </View>
      </Page>
    );
  }
 }

Categories.propTypes = {
  category: React.PropTypes.string.isRequired,
  quizzList: React.PropTypes.object.isRequired
};

export default Categories;
