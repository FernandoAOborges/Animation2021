import React from 'react';
import { Text, View } from 'native-base';
import PropTypes from 'prop-types';

const Detalhe = ({ navigation }) => (
  <View>
    <Text>Detalhe</Text>
  </View>
);

Detalhe.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Detalhe;
