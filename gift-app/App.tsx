import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';

import { theme } from './src/fontConfig';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      // PaperProvideからFont
      // <PaperProvider theme={theme}>
        <SafeAreaProvider>
          {/* <Navigation colorScheme={colorScheme} /> */}
          <Navigation />
          <StatusBar />
        </SafeAreaProvider>
      // </PaperProvider>
    );
  }
}
