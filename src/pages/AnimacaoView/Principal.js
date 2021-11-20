import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, Image, StatusBar, View } from 'native-base';
import PropTypes from 'prop-types';

import { Animated, Dimensions, PanResponder, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Comentarios from './Comentarios';
import PostCard from './PostCard';
import { PostsSelector, retornaPostsAsync } from '../../redux/PostsSlice';

const { width, height } = Dimensions.get('window');

const videoHeight = width * 0.5625;

const padding = 30;
const statusBarHeight = StatusBar.currentHeight || 0;
const yOutput = height - videoHeight + (videoHeight * 0.5) / 2 - padding - statusBarHeight;
const xOutput = (width * 0.5) / 2 - padding;
// const y = 0;

const Principal = ({ navigation }) => {
  const animation = useMemo(() => new Animated.Value(0), []);

  const dispatch = useDispatch();
  const { postagems } = useSelector(PostsSelector);

  const [modalVisible, setModalVisible] = useState({
    visible: false,
    id: '',
    IMAGE: '',
  });

  const opacityInterpolate = animation.interpolate({
    inputRange: [0, 300],
    outputRange: [1, 0],
  });

  const translateYInterpolate = animation.interpolate({
    inputRange: [0, 300],
    outputRange: [0, yOutput],
    extrapolate: 'clamp',
  });

  const scaleInterpolate = animation.interpolate({
    inputRange: [0, 300],
    outputRange: [1, 0.5],
    extrapolate: 'clamp',
  });

  const translateXInterpolate = animation.interpolate({
    inputRange: [0, 300],
    outputRange: [0, xOutput],
    extrapolate: 'clamp',
  });

  const scrollStyles = {
    opacity: opacityInterpolate,
    transform: [
      {
        translateY: translateYInterpolate,
      },
    ],
  };

  const videoStyles = {
    transform: [
      {
        translateY: translateYInterpolate,
      },
      {
        translateX: translateXInterpolate,
      },
      {
        scale: scaleInterpolate,
      },
    ],
  };

  const handleOpen = useCallback(() => {
    animation.setOffset(0);
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [animation]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [
        null,
        {
          dy: animation,
          dx: animation,
        },
      ],
      { useNativeDriver: false },
    ),
    onPanResponderRelease: (e, gestureState) => {
      //   console.log(e);
      if (gestureState.dy > 100) {
        Animated.timing(animation, {
          toValue: 300,
          duration: 200,
          useNativeDriver: false,
        }).start();
        animation.setOffset(300);
      }
      if (gestureState.dy < 100 && gestureState.dx < 100) {
        animation.setOffset(0);
        Animated.timing(animation, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const AbriModal = useCallback((valor) => {
    setModalVisible(valor);
  }, []);

  const BuscaPosts = useCallback(() => {
    dispatch(retornaPostsAsync());
  }, [dispatch]);

  useEffect(() => {
    BuscaPosts();
  }, [BuscaPosts]);

  const RenderItem = useCallback(
    ({ item }) => (
      <PostCard navigation={navigation} item={item} AbriModal={AbriModal} handleOpen={handleOpen} />
    ),
    [navigation, AbriModal, handleOpen],
  );
  const Extractor = useCallback((item) => item.id.toString(), []);

  return (
    <View style={styles.container}>
      <FlatList data={postagems} keyExtractor={Extractor} renderItem={RenderItem} />
      {modalVisible.visible && (
        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
          <Animated.View
            style={[{ width, height: videoHeight }, videoStyles]}
            {...panResponder.panHandlers}
          >
            <Image
              source={{ uri: modalVisible.IMAGE }}
              width={width}
              height={height / 2.2}
              resizeMode="cover"
              alt="Logo"
            />
          </Animated.View>
          <Animated.ScrollView style={[styles.scrollView, scrollStyles]}>
            <Comentarios id={modalVisible.id} />
          </Animated.ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Principal.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Principal;
