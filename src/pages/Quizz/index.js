import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { withNavigation } from '@exponent/ex-navigation';
import { Page } from 'chemQuizz/src/components';

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

  submitAnswer(answer){
    console.log(answer);
  }

  render() {
    const quizzList = this.props.route.params.quizzList;
    const list = quizzList.map((quizz, index) => {
      return(
        <View key={index}>
          <View style={styles.rowContainer}>
            <TouchableHighlight
              onPress={() => this.launchQuizz(category)}
              underlayColor='transparent'
            >
              <Text style={styles.categoryName}>{quizz['answer1']}</Text>
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
  category: React.PropTypes.string.isRequired,
  quizzList: React.PropTypes.object.isRequired
};

export default Categories;
