import RecipeWebView from "../containers/RecipeWebView";

// WebScreen component that serves as the main entry point for the "Web" screen of the app.
// It renders the RecipeWebView component which is responsible for displaying a web view of the recipe's source.
const WebScreen = ({ navigation, route }) => <RecipeWebView navigation={navigation} route={route} />;

export default WebScreen;
