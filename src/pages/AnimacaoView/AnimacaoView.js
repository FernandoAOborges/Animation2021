import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FlatList, View } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';

import { PostsSelector, retornaPostsAsync } from '../../redux/PostsSlice';
import PostCard from './PostCard';
import Carregando from './Carregando';
import Detalhe from './Detalhe';

const AnimacaoView = ({ navigation }) => {
  const dispatch = useDispatch();
  const { postagems, status } = useSelector(PostsSelector);

  const [modalVisible, setModalVisible] = useState({
    visible: false,
    id: '',
    IMAGE: '',
  });

  // console.log(modalVisible);

  const AbriModal = (valor) => {
    setModalVisible(valor);
  };

  const BuscaPosts = useCallback(() => {
    dispatch(retornaPostsAsync());
  }, [dispatch]);

  useEffect(() => {
    BuscaPosts();
  }, [BuscaPosts]);

  const RenderItem = useCallback(
    ({ item }) => <PostCard navigation={navigation} item={item} AbriModal={AbriModal} />,
    [navigation],
  );
  const Extractor = useCallback((item) => item.id.toString(), []);

  let Content;

  if (status === 'loading') {
    Content = <Carregando />;
  }

  if (status === 'sucesso') {
    Content = (
      <>
        <FlatList
          data={postagems}
          keyExtractor={Extractor}
          renderItem={RenderItem}
          // contentContainerStyle={{
          //   flexGrow: 1,
          // }}
        />
        {modalVisible.visible && <Detalhe {...modalVisible} AbriModal={AbriModal} />}
      </>
    );
  }

  return <View flex={1}>{Content}</View>;
};

AnimacaoView.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default AnimacaoView;
