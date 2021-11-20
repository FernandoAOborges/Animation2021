import React, { memo, useCallback, useEffect } from 'react';
import { View, Text, Stack } from 'native-base';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { ComentariosSelector, retornaComentariosAsync } from '../../redux/ComentariosSlice';
import Carregando from './Carregando';

const Comentarios = ({ id }) => {
  const dispatch = useDispatch();

  const { comentarios, status } = useSelector(ComentariosSelector);

  const FiltraComentarios = comentarios.filter((comentario) => comentario.postId === id);

  const BuscaComentarios = useCallback(() => {
    dispatch(retornaComentariosAsync());
  }, [dispatch]);

  useEffect(() => {
    BuscaComentarios();
  }, [BuscaComentarios]);

  let Content;

  if (status === 'loading') {
    Content = <Carregando />;
  }

  if (FiltraComentarios.length > 0) {
    Content = FiltraComentarios.map((item) => (
      <Stack
        key={item.id}
        space={2}
        w="90%"
        alignSelf="center"
        mb={2}
        shadowColor="#000"
        shadowOpacity={0.3}
        shadowOffset={{ width: 0, height: 10 }}
        shadowRadius={10}
        bg="gray.300"
        padding={2}
        borderRadius={10}
        mt={2}
      >
        <Text position="absolute" color="red.600" right={3} textAlign="center" fontSize={10}>
          {item.email}
        </Text>
        <Text fontSize={10} textAlign="center">
          {item.name}
        </Text>
        <Text>{item.body}</Text>
      </Stack>
    ));
  }

  return <View flex={1}>{Content}</View>;
};

Comentarios.propTypes = {
  id: PropTypes.number.isRequired,
};

const equal = (prevProps, nextProps) => {
  if (nextProps.id !== prevProps.id) {
    return false;
  }

  return true;
};

export default memo(Comentarios, equal);
