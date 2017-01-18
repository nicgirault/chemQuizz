import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { withNavigation } from '@exponent/ex-navigation';
import { Page } from 'chemQuizz/src/components';
import { inject, observer } from 'mobx-react/native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    margin: 10,
  },
  questionContainer: {
    backgroundColor: '#B2EBF0',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 4,
    margin: 10,
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
  },
  quizzIsOverMessage: {
    backgroundColor: '#B2EBF0',
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
    correct: number,
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
      selectedIndex: null,
    };
  }

  props: PropsType;

  navigateToNextQuizz() {
    this.props.getNextQuizz();
    this.setState({ selectedIndex: null });
  }

  submitAnswerBuilder(correctAnswer) {
    return (answerKey) => {
      this.setState({ selectedIndex: answerKey });
      if (answerKey === correctAnswer) {
        setTimeout(() => this.navigateToNextQuizz(), 1000);
      }
    };
  }

  answersGridBuilder() {
    return [[{}, {}], [{}, {}]];
  }

  render() {
    const quizz = this.props.quizz;
    const submitAnswerHandler = this.submitAnswerBuilder(quizz.correct);
    const answersGrid = this.answersGridBuilder();

    return (
      <Page noNavBar noMargin>
        { !this.props.listIsEmpty &&
          <View style={styles.container}>
            <View style={styles.questionContainer}>
              <Text>{quizz.question}</Text>
            </View>
            <View style={styles.answersContainer}>
              {answersGrid.map((answersRow, rowIndex) => (
                <View key={rowIndex} style={styles.answersRowContainer}>
                  {answersRow.map((answer, answerIndex) => {
                    const globalAnswerIndex = (answersRow.length * rowIndex) + answerIndex;
                    const selectColor = globalAnswerIndex === quizz.correct ? '#05A5D1' : '#D1A505';
                    return (
                      <TouchableHighlight
                        key={answerIndex}
                        style={[
                          styles.answerContainer,
                          this.state.selectedIndex === globalAnswerIndex ?
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
          <View style={styles.quizzIsOverMessage}>
            <Text>You finished all the quizz for this category!</Text>
          </View>
        }
      </Page>
    );
  }
 }

Quizz.propTypes = {
  category: React.PropTypes.string.isRequired,
};

export default Quizz;
