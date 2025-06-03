import RecipesContainer from "../containers/RecipesContainer"

// IndexScreen component that serves as the main entry point for the "Index" screen of the app.
// It renders the RecipesContainer component which is responsible for displaying a list of recipes.
const IndexScreen = ({ navigation }) => <RecipesContainer navigation={navigation} />;

export default IndexScreen;