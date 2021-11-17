import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Text, View } from 'native-base';

const AnimacaoView = ({ navigation }) => (
  <View>
    <TouchableOpacity onPress={() => navigation.navigate('Detalhe')}>
      <Text>AnimacaoView</Text>
    </TouchableOpacity>
  </View>
);

AnimacaoView.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default AnimacaoView;
