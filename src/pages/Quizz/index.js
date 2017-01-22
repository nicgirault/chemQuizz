import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { withNavigation } from '@exponent/ex-navigation';
import { Page } from 'chemQuizz/src/components';
import { inject, observer } from 'mobx-react/native';
import { includes, filter, isEqual } from 'lodash';

import appStyle from 'chemQuizz/src/appStyle';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    margin: 10,
  },
  questionContainer: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 4,
    margin: 10,
  },
  questionText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  answersContainer: {
    flex: 3,
    justifyContent: 'space-around',
  },
  answersRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  answerContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    flex: 1,
  },
  answerLabel: {
    color: '#FAFAFA',
    fontWeight: 'bold',
  },
  quizzIsOverMessage: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});

type PropsType = {
  navigator: any,
  getNextQuizz: () => void,
  listIsEmpty: boolean,
  quizz: {
    answers: Array,
    question: string,
    correct: Array,
    type: string,
  },
};

@withNavigation
@inject((allStores) => {
  const quizzStore = allStores.quizzStore;
  return {
    quizz: quizzStore.selectedQuizz,
    listIsEmpty: quizzStore.listIsEmpty,
    getNextQuizz: () => quizzStore.getNextQuizz(),
  };
})
@observer
class Quizz extends Component {
  static route = {
    navigationBar: {
      title: 'Quizz',
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      selectedIndexes: [],
    };
  }

  props: PropsType;

  navigateToNextQuizz() {
    this.props.getNextQuizz();
    this.setState({
      selectedIndexes: [],
    });
  }

  clearSelectedIndexes(cb) {
    const clearedSelectedIndexes = filter(this.state.selectedIndexes, (index) => {
      return includes(this.props.quizz.correct, index);
    })
    this.setState({ selectedIndexes: clearedSelectedIndexes }, cb);
  }

  submitAnswerBuilder(quizz) {
    return (answerKey) => {
      this.clearSelectedIndexes(() => {
        if (!includes(this.state.selectedIndexes, answerKey)) {
          this.setState({ selectedIndexes: this.state.selectedIndexes.concat([answerKey]) }, () => {
            if (isEqual(this.state.selectedIndexes.sort(), quizz.correct.slice())) {
              setTimeout(() => this.navigateToNextQuizz(), 500);
            }
          })
        }
      });
    };
  }

  answersGridBuilder() {
    return [[{}, {}], [{}, {}]];
  }

  render() {
    const category = this.props.route.params.category;
    const quizz = this.props.quizz;
    const submitAnswerHandler = this.submitAnswerBuilder(quizz);
    const answersGrid = this.answersGridBuilder();

    return (
      <Page noNavBar noMargin>
        { !this.props.listIsEmpty &&
          <View style={styles.container}>
            <View style={[styles.questionContainer, {backgroundColor: category.color}]}>
              <Text style={styles.questionText}>{quizz.question}</Text>
            </View>
            <View style={styles.answersContainer}>
              {answersGrid.map((answersRow, rowIndex) => (
                <View key={rowIndex} style={styles.answersRowContainer}>
                  {answersRow.map((answer, answerIndex) => {
                    const globalAnswerIndex = (answersRow.length * rowIndex) + answerIndex;
                    const selectColor = includes(quizz.correct, globalAnswerIndex) ? appStyle.colors.primary : '#F69F36';
                    return (
                      <TouchableHighlight
                        key={answerIndex}
                        style={[
                          styles.answerContainer,
                          includes(this.state.selectedIndexes, globalAnswerIndex) ?
                          { backgroundColor: selectColor } :
                          { backgroundColor: '#131313' },
                        ]}
                        onPress={() => submitAnswerHandler(globalAnswerIndex)}
                      >
                        <Text style={styles.answerLabel}>{quizz.answers[globalAnswerIndex]}</Text>
                      </TouchableHighlight>
                    );
                  })}
                </View>
              ))}
            </View>
          </View>
        }
        {this.props.listIsEmpty &&
          <View style={[styles.quizzIsOverMessage, {backgroundColor: category.color}]}>
            <Text style={styles.questionText}>Catégorie {category.name} terminée!</Text>
          </View>
        }
      </Page>
    );
  }
 }

Quizz.propTypes = {
  category: React.PropTypes.object.isRequired,
};

export default Quizz;
