import { FlatList } from "react-native";
import RecipeCard from "../listItems/RecipeCard";

const RecipesList = props => {
  const { recipes } = props;

  return (
    <FlatList
     data={recipes}
     renderItem={({ item }) => (
      <RecipeCard image={item.image} label={item.label} source={item.source} url={item.url} />
     )}
    >  
    </FlatList>
  )
}

export default RecipesList;
