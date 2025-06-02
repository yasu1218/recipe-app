import { createTheme, ThemeProvider } from '@rneui/themed';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Header from './src/components/layout/Header';
import RecipesContainer from './src/components/containers/RecipesContainer';


// Create a theme with light and dark colors
const theme = createTheme({
  lightColors: {
    primary: 'blue'
  },
  darkColors: {
    primary: 'blue'
  },
  components: {
    Button: {
      raised: true
    }
  }
})

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <Header />
        <RecipesContainer />
      </SafeAreaProvider>
    </ThemeProvider>
  )
}

export default App
