import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Center, FlatList, Heading, HStack, Spinner, View } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';

import { PostsSelector, retornaPostsAsync } from '../../redux/PostsSlice';
import PostCard from './PostCard';

const Carregando = () => (
  <Center flex={1}>
    <HStack space={2} alignItems="center">
      <Spinner accessibilityLabel="Loading posts" />
      <Heading color="primary.500" fontSize="md">
        Carregando
      </Heading>
    </HStack>
  </Center>
);

const AnimacaoView = ({ navigation }) => {
  const dispatch = useDispatch();
  const { postagems, status } = useSelector(PostsSelector);

  const BuscaPosts = useCallback(() => {
    dispatch(retornaPostsAsync());
  }, [dispatch]);

  useEffect(() => {
    BuscaPosts();
  }, [BuscaPosts]);

  const RenderItem = useCallback(
    ({ item }) => <PostCard navigation={navigation} item={item} />,
    [navigation],
  );
  const Extractor = useCallback((item) => item.id.toString(), []);

  let Content;

  if (status === 'loading') {
    Content = <Carregando />;
  }

  if (status === 'sucesso') {
    Content = <FlatList data={postagems} keyExtractor={Extractor} renderItem={RenderItem} />;
  }

  return (
    <View flex={1} bg="amber.100">
      {Content}
    </View>
  );
};

AnimacaoView.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default AnimacaoView;
