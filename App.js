import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';

import NavPrincipal from './src/navigation/navPrincipal';

const App = () => (
  <NativeBaseProvider>
    <NavigationContainer>
      <NavPrincipal />
    </NavigationContainer>
  </NativeBaseProvider>
);

export default App;
