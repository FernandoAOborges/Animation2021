import React from 'react';
import { Text, View } from 'native-base';
import PropTypes from 'prop-types';

const Detalhe = ({ route }) => {
  const { id } = route.params;

  // Buscando o comentários do pelo id

  return (
    <View>
      <Text>Buscando o comentários do pelo id: {id}</Text>
    </View>
  );
};

Detalhe.propTypes = {
  route: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Detalhe;
