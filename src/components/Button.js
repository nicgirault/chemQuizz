import React, { PropTypes } from 'react';
import { ActivityIndicator, TouchableOpacity, Text, StyleSheet, View } from 'react-native';

import appStyle from 'chemQuizz/src/appStyle';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: appStyle.dimensions.touchableHeight,
    marginVertical: appStyle.margins.inner,
  },
  button: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    minHeight: appStyle.dimensions.visibleButtonHeight,
    borderRadius: appStyle.dimensions.borderRadius,
    paddingHorizontal: appStyle.margins.innerButton,
    paddingVertical: 3,
  },
  buttonDisabled: {
    opacity: 0.3,
  },
  buttonStandard: {
    backgroundColor: appStyle.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    borderColor: appStyle.colors.primary,
    borderWidth: 1,
  },
  buttonLink: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: appStyle.font.fontSize.large,
  },
  textStandard: {
    color: appStyle.colors.buttonText,
  },
  textOutline: {
    color: appStyle.colors.primary,
  },
  textLink: {
    fontSize: appStyle.font.fontSize.huge,
    color: appStyle.colors.primary,
  },
});

const buttonTypeStyle = (type) => {
  switch (type) {
    case 'outline':
      return styles.buttonOutline;
    case 'link':
      return styles.buttonLink;
    default:
      return styles.buttonStandard;
  }
};
const textTypeStyle = (type) => {
  switch (type) {
    case 'outline':
      return styles.textOutline;
    case 'link':
      return styles.textLink;
    default:
      return styles.textStandard;
  }
};
const loaderColor = (type) => {
  switch (type) {
    case 'standard':
      return appStyle.colors.buttonText;
    default:
      return appStyle.colors.primary;
  }
};

const Button = props => (
  <TouchableOpacity
    onPress={() => !props.isDisabled && !props.isLoading && props.onPress()}
    style={[styles.container, props.layoutStyle]}
    activeOpacity={props.isDisabled ? 1 : 0.7}
  >
    {
      props.isLoading ?
        <View
          style={[
            styles.button,
            buttonTypeStyle(props.type),
            (props.isDisabled && styles.buttonDisabled, props.style),
          ]}
        >
          <ActivityIndicator color={props.loaderColor || loaderColor(props.type)} />
        </View> :
        <View
          style={[
            styles.button,
            buttonTypeStyle(props.type),
            (props.isDisabled && styles.buttonDisabled),
            props.style,
          ]}
        >
          <Text style={[styles.text, textTypeStyle(props.type), props.textStyle]}>{props.children}</Text>
        </View>
     }
  </TouchableOpacity>
);

Button.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
  layoutStyle: View.propTypes.style,
  isDisabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  loaderColor: PropTypes.string,
  style: View.propTypes.style,
  textStyle: Text.propTypes.style,
  type: PropTypes.oneOf(['standard', 'outline', 'link']),
};

Button.defaultProps = {
  type: 'standard',
  isDisabled: false,
  isLoading: false,
};

export default Button;
