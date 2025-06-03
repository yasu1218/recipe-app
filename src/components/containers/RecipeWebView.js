import WebView from 'react-native-webview';

const RecipeWebView = ({ navigation, route }) => {
  const { url } = route.params;

  return <WebView source={{ uri: url }}/>
}

export default RecipeWebView;
