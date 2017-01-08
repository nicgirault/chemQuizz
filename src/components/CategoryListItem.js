import React, {Component} from 'react';
import ReactNative from 'react-native';
const {
  View,
  TouchableHighlight,
  Text
} = ReactNative;

class CategoryListItem extends Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View>
          <Text>{this.props.item.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

module.exports = CategoryListItem;
