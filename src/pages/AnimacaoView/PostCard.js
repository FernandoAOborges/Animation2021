import { AspectRatio, Box, Center, Heading, HStack, Image, Stack, Text } from 'native-base';
import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
// import Detalhe from './Detalhe';

const IMAGE =
  'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg';

const PostCard = ({ item: { id, title, body }, AbriModal, handleOpen }) => (
  <TouchableOpacity
    onPress={() => {
      AbriModal({
        visible: true,
        id,
        IMAGE,
      });
      handleOpen();
    }}
  >
    <Box
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1"
      _dark={{
        borderColor: 'coolGray.600',
        backgroundColor: 'gray.700',
      }}
      _web={{
        shadow: 2,
        borderWidth: 0,
      }}
      _light={{
        backgroundColor: 'gray.50',
      }}
    >
      <Box>
        <AspectRatio w="100%" ratio={16 / 9}>
          <Image
            source={{
              uri: IMAGE,
            }}
            alt="image"
          />
        </AspectRatio>
        <Center
          bg="violet.500"
          _dark={{
            bg: 'violet.400',
          }}
          _text={{
            color: 'warmGray.50',
            fontWeight: '700',
            fontSize: 'xs',
          }}
          position="absolute"
          bottom="0"
          px="3"
          py="1.5"
        >
          {id}
        </Center>
      </Box>
      <Stack p="4" space={3}>
        <Stack space={2}>
          <Heading size="md" ml="-1">
            The Garden City
          </Heading>
          <Text
            fontSize="xs"
            _light={{
              color: 'violet.500',
            }}
            _dark={{
              color: 'violet.400',
            }}
            fontWeight="500"
            ml="-0.5"
            mt="-1"
          >
            {title}
          </Text>
        </Stack>
        <Text fontWeight="400">{body}</Text>
        <HStack alignItems="center" space={4} justifyContent="space-between">
          <HStack alignItems="center">
            <Text
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}
              fontWeight="400"
            >
              6 mins ago
            </Text>
          </HStack>
        </HStack>
      </Stack>
    </Box>
  </TouchableOpacity>
);

PostCard.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  AbriModal: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
};

const equal = (prevProps, nextProps) => {
  if (nextProps.id !== prevProps.id) {
    return false;
  }

  return true;
};

export default memo(PostCard, equal);
