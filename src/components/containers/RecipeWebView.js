import { Ionicons } from '@expo/vector-icons';
import { Button } from '@rneui/themed';
import { useLayoutEffect } from 'react';
import { Alert } from 'react-native';
import { Share } from 'react-native';
import WebView from 'react-native-webview';

// RecipeWebView component that displays a web view of a recipe.
const RecipeWebView = ({ navigation, route }) => {

  // Extracting the URL from the route parameters
  const { url } = route.params;

  // Function to handle sharing the recipe URL
  const handleShare = async () => {
    try {
      await Share.share({
        content: { uri: url },
        message: `Sharing ${url}`,
      })
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  }

  // Layout effect to set the header options for the navigation
  // It includes a button to share the recipe URL using the Ionicons icon.
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button type='clear' onPress={handleShare}>
          <Ionicons name='share-outline' size={24} />
        </Button>
      )
    })
    return () => {}
  }, [])

  // Render the WebView component with the provided URL
  return <WebView source={{ uri: url }}/>

}

export default RecipeWebView;
