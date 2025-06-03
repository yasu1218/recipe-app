import { FlatList } from "react-native";
import RecipeCard from "../listItems/RecipeCard";

// RecipesList component that renders a list of recipes using FlatList.
// It takes in props including navigation and recipes, and renders each recipe using the RecipeCard component.
const RecipesList = props => {
  const { navigation, recipes } = props;

  return (
    <FlatList
     data={recipes}
     renderItem={({ item }) => (
      <RecipeCard 
        image={item.image} 
        label={item.label} 
        source={item.source} 
        url={item.url} 
        navigation={navigation}
      />
     )}
    >  
    </FlatList>
  )
}

export default RecipesList;
