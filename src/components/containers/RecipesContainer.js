import { useState } from 'react';
import Form from '../forms/Form';
import Loading from '../layout/Loading';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { getRecipes } from '../../services/api';
import RecipesList from '../lists/RecipesList';


// Mocked response for testing purposes
// This is a mocked response to simulate the API call for testing purposes.
const recipesResponse = [
  {
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Mexican_tacos_%289055162205%29.jpg/1280px-Mexican_tacos_%289055162205%29.jpg',
    label: 'Beef tacos',
    source: 'BBC Good Food',
    url: 'https://www.bbcgoodfood.com/recipes/next-level-minced-beef-tacos'
  },
  {
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Sliced_Matsusaka_wagyu_beef.jpg/960px-Sliced_Matsusaka_wagyu_beef.jpg',
    label: 'Smoked Wagyu Beef Shank',
    source: 'Food52',
    url: 'https://food52.com/recipes/86509-smoked-wagyu-beef-shank'
  },
  {
    image:
      'https://upload.wikimedia.org/wikipedia/commons/b/b4/Roastbeef.jpg',
    label: 'Roast Beef',
    source: 'Saveur',
    url: 'https://www.saveur.com/recipes/roast-beef-recipe'
  },
  {
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Gourmet_hamburger_with_bacon.jpg/1280px-Gourmet_hamburger_with_bacon.jpg',
    label: 'Beef Burger',
    source: 'Epicurious',
    url: 'https://www.epicurious.com/recipes/food/views/insanity-burger-56389604'
  }
]




const RecipesContainer = ({ navigation }) => {
  // State variables
  const [isLoading, setIsLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [ingredient, setIngredient] = useState('');

  // Function to handle input changes
  const handleInputChange = (ingredient) => {
    setIngredient(ingredient);
  }

  // Debugging output
  // console.log('ingredient', ingredient);

  // Function to fetch recipes
  const fetchRecipes = async () => {
    setIsLoading(true);

    // Mocked response for testing purposes
    // Comment out the below line + remove comment of the 2 lines below to use the actual API call
    setRecipes(recipesResponse);
    
    // Get recipes based on the ingredient
    // Commenting out the below 2 lines to use the mocked response.
    // const recipes = await getRecipes(ingredient);
    // setRecipes(recipes);

    setIsLoading(false);

    // Debugging output
    console.log('recipes', recipes);
  }

  return (
    <>
      <Form 
        onInputChange={handleInputChange} 
        onSubmit={fetchRecipes}
      />
      { isLoading 
        ? <Loading /> 
        : <>
            <RecipesList navigation={navigation} recipes={recipes} /> 
          </>
      }
    </>
  )
}
/*
<Form
            onInputChange={handleInputChange}
            onSubmit={fetchRecipes}
          />
           */

export default RecipesContainer;