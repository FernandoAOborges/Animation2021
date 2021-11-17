// In App.js in a new project

import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AnimacaoView from '../pages/AnimacaoView/AnimacaoView';
import Detalhe from '../pages/AnimacaoView/Detalhe';

const Stack = createNativeStackNavigator();

const NavPrincipal = () => (
  <Stack.Navigator>
    <Stack.Screen name="AnimacaoView" component={AnimacaoView} />
    <Stack.Screen name="Detalhe" component={Detalhe} />
  </Stack.Navigator>
);

export default NavPrincipal;
