import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Principal from '../pages/AnimacaoView/Principal';

const Stack = createNativeStackNavigator();

const NavPrincipal = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Principal" component={Principal} />
  </Stack.Navigator>
);

export default NavPrincipal;
