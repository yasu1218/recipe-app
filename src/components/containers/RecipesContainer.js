import { useState } from 'react';
import Form from '../forms/Form';
import Loading from '../layout/Loading';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { getRecipes } from '../../services/api';


// Mocked response for testing purposes
// This is a mocked response to simulate the API call for testing purposes.
const recipesResponse = [
  {
    image:
      'https://edamam-product-images.s3.amazonaws.com/web-img/1ce/1ce91d406dbc2bc21e59b346c6db7911.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC8aCXVzLWVhc3QtMSJHMEUCICc4cx%2BfcdZLHzb0vRqHrh4MPcOT3gL63kzrFh6XH1myAiEAnyNpwFrwNpDoUrz99LKX6aTVwdlQUvYfA7D0wZEjiPcqwgUI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDIowaA9WdQhsI1s0eSqWBUk72W4ww%2FZ8ioHzK65RnqafpPUAbDOMKU6Pdhi92egnhgrzAS0vfzTWmU%2BFzf%2F9b5J%2F6aRUWk%2FSk6qx2Zyk0WYHk3NEWy2ifgTbDXO4h17na6f%2B0F%2BMNzAX20Yfyhmqvzuiv7%2FyntYJPKzvCacdf4zhdAS1qppOJuzu5sxyEAGSw6yYQh9QTT27W25VTClkMENQ9%2FRt8f9FfG5gbsn8RyPqx0eNPYK58qw514C72Ror7Jc6zlBuecQUJp0HmQJzWm38YwkSH%2FW%2B08ZMtW9BDJ1e7ETzExQjHPA0X52rRIh97Rp77nmJyF45tUoc4JzoVh4h%2BtuYGgta%2F56ZgcUikR9HvU4BkgX0O74AZnbyJVLdhbyI1T5LBjDuH%2BP%2F%2F8alQhYzTTbSaCSjv3DV5gFwsv4HB%2FX8XuCaYhIOIn33Vq23nSuScYhTN%2BQXhqq%2FmMbbBZyNpzOlMmSjXJ%2FwOlx2gGj3Qqauy9au4L8XrOhHlpWvpEko9K%2BA4ECn%2FpF0EFrpQd7eG%2Bw9yy44KCh4bOzHcUDsp%2FQKIxxVE2GkBBC2eOU3t46ExxSLRRUsOuCGx5FktaVKru20xaeWossudKCnIl%2BlZoDor%2FxkWHsWnsbG8rcPU%2F7N9k4Ioo%2BsaS7MYEfZ4dnEvEfMO1G%2Fb%2FFLiRw%2ByN4ka8aRitWgl4PCIftUU9C6s1b9VcSrFht3O%2Fag4KEquGpJ6LIPGfmX32oh%2B4rl4NF%2B7i5TBnoFC4PJrq%2FNe4685PKYXZrscNvILkKw9xFsEx2c69hadyqI5223qmUYxChjCu47xy%2FrwgrAIGVGG%2Fq49IkBUTfdkgJpI2bEy2a7R7cETqxJhg0vpWf9B%2BkYJYRwwlc1gG%2BS493fe6JLW7yDhxlm6MY5MJipwMEGOrEBWReZdTvGGlklQFMU0PPi6n%2BOqZAdVUxfcaw7W6Bj3KOpAJwnecWuUiSosiIH%2FdCCvP3c9tQTnGg8g9WvSJtdUXqqjB8Mge44rn%2FyAt8GRNuCGjZ7sBfdb%2ByMxgvtUx%2BmuVUgGVWMyXqd4bAIiqwIzo8PZ5m7K47se7eGN3TTnq5f8FQChU0KydIgWo9SRGSJ%2BE3Wd9Af5Hr22yQOSuysVdG9n4GZIGZnMze0heMxKPQm&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250523T065640Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3599&REDACTED&X-Amz-Signature=a3dd859dd45196168fb8c8c5cfd645d1002d6ad628a6ada29851d9fdd4b41978',
    label: 'Beef tacos',
    source: 'BBC Good Food',
    url: 'https://www.bbcgoodfood.com/recipes/next-level-minced-beef-tacos'
  },
  {
    image:
      'https://edamam-product-images.s3.amazonaws.com/web-img/d96/d964289a83afcc99c8022addf088444d.jpeg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC8aCXVzLWVhc3QtMSJHMEUCICc4cx%2BfcdZLHzb0vRqHrh4MPcOT3gL63kzrFh6XH1myAiEAnyNpwFrwNpDoUrz99LKX6aTVwdlQUvYfA7D0wZEjiPcqwgUI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDIowaA9WdQhsI1s0eSqWBUk72W4ww%2FZ8ioHzK65RnqafpPUAbDOMKU6Pdhi92egnhgrzAS0vfzTWmU%2BFzf%2F9b5J%2F6aRUWk%2FSk6qx2Zyk0WYHk3NEWy2ifgTbDXO4h17na6f%2B0F%2BMNzAX20Yfyhmqvzuiv7%2FyntYJPKzvCacdf4zhdAS1qppOJuzu5sxyEAGSw6yYQh9QTT27W25VTClkMENQ9%2FRt8f9FfG5gbsn8RyPqx0eNPYK58qw514C72Ror7Jc6zlBuecQUJp0HmQJzWm38YwkSH%2FW%2B08ZMtW9BDJ1e7ETzExQjHPA0X52rRIh97Rp77nmJyF45tUoc4JzoVh4h%2BtuYGgta%2F56ZgcUikR9HvU4BkgX0O74AZnbyJVLdhbyI1T5LBjDuH%2BP%2F%2F8alQhYzTTbSaCSjv3DV5gFwsv4HB%2FX8XuCaYhIOIn33Vq23nSuScYhTN%2BQXhqq%2FmMbbBZyNpzOlMmSjXJ%2FwOlx2gGj3Qqauy9au4L8XrOhHlpWvpEko9K%2BA4ECn%2FpF0EFrpQd7eG%2Bw9yy44KCh4bOzHcUDsp%2FQKIxxVE2GkBBC2eOU3t46ExxSLRRUsOuCGx5FktaVKru20xaeWossudKCnIl%2BlZoDor%2FxkWHsWnsbG8rcPU%2F7N9k4Ioo%2BsaS7MYEfZ4dnEvEfMO1G%2Fb%2FFLiRw%2ByN4ka8aRitWgl4PCIftUU9C6s1b9VcSrFht3O%2Fag4KEquGpJ6LIPGfmX32oh%2B4rl4NF%2B7i5TBnoFC4PJrq%2FNe4685PKYXZrscNvILkKw9xFsEx2c69hadyqI5223qmUYxChjCu47xy%2FrwgrAIGVGG%2Fq49IkBUTfdkgJpI2bEy2a7R7cETqxJhg0vpWf9B%2BkYJYRwwlc1gG%2BS493fe6JLW7yDhxlm6MY5MJipwMEGOrEBWReZdTvGGlklQFMU0PPi6n%2BOqZAdVUxfcaw7W6Bj3KOpAJwnecWuUiSosiIH%2FdCCvP3c9tQTnGg8g9WvSJtdUXqqjB8Mge44rn%2FyAt8GRNuCGjZ7sBfdb%2ByMxgvtUx%2BmuVUgGVWMyXqd4bAIiqwIzo8PZ5m7K47se7eGN3TTnq5f8FQChU0KydIgWo9SRGSJ%2BE3Wd9Af5Hr22yQOSuysVdG9n4GZIGZnMze0heMxKPQm&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250523T065640Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&REDACTED&X-Amz-Signature=d29900bab847a91e3935650ecddf0bc08e59070c5bb9654c245fa3d5768cea48',
    label: 'Smoked Wagyu Beef Shank',
    source: 'Food52',
    url: 'https://food52.com/recipes/86509-smoked-wagyu-beef-shank'
  },
  {
    image:
      'https://edamam-product-images.s3.amazonaws.com/web-img/33f/33f22ca59f710c9e28518098629ecbc3.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC8aCXVzLWVhc3QtMSJHMEUCICc4cx%2BfcdZLHzb0vRqHrh4MPcOT3gL63kzrFh6XH1myAiEAnyNpwFrwNpDoUrz99LKX6aTVwdlQUvYfA7D0wZEjiPcqwgUI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDIowaA9WdQhsI1s0eSqWBUk72W4ww%2FZ8ioHzK65RnqafpPUAbDOMKU6Pdhi92egnhgrzAS0vfzTWmU%2BFzf%2F9b5J%2F6aRUWk%2FSk6qx2Zyk0WYHk3NEWy2ifgTbDXO4h17na6f%2B0F%2BMNzAX20Yfyhmqvzuiv7%2FyntYJPKzvCacdf4zhdAS1qppOJuzu5sxyEAGSw6yYQh9QTT27W25VTClkMENQ9%2FRt8f9FfG5gbsn8RyPqx0eNPYK58qw514C72Ror7Jc6zlBuecQUJp0HmQJzWm38YwkSH%2FW%2B08ZMtW9BDJ1e7ETzExQjHPA0X52rRIh97Rp77nmJyF45tUoc4JzoVh4h%2BtuYGgta%2F56ZgcUikR9HvU4BkgX0O74AZnbyJVLdhbyI1T5LBjDuH%2BP%2F%2F8alQhYzTTbSaCSjv3DV5gFwsv4HB%2FX8XuCaYhIOIn33Vq23nSuScYhTN%2BQXhqq%2FmMbbBZyNpzOlMmSjXJ%2FwOlx2gGj3Qqauy9au4L8XrOhHlpWvpEko9K%2BA4ECn%2FpF0EFrpQd7eG%2Bw9yy44KCh4bOzHcUDsp%2FQKIxxVE2GkBBC2eOU3t46ExxSLRRUsOuCGx5FktaVKru20xaeWossudKCnIl%2BlZoDor%2FxkWHsWnsbG8rcPU%2F7N9k4Ioo%2BsaS7MYEfZ4dnEvEfMO1G%2Fb%2FFLiRw%2ByN4ka8aRitWgl4PCIftUU9C6s1b9VcSrFht3O%2Fag4KEquGpJ6LIPGfmX32oh%2B4rl4NF%2B7i5TBnoFC4PJrq%2FNe4685PKYXZrscNvILkKw9xFsEx2c69hadyqI5223qmUYxChjCu47xy%2FrwgrAIGVGG%2Fq49IkBUTfdkgJpI2bEy2a7R7cETqxJhg0vpWf9B%2BkYJYRwwlc1gG%2BS493fe6JLW7yDhxlm6MY5MJipwMEGOrEBWReZdTvGGlklQFMU0PPi6n%2BOqZAdVUxfcaw7W6Bj3KOpAJwnecWuUiSosiIH%2FdCCvP3c9tQTnGg8g9WvSJtdUXqqjB8Mge44rn%2FyAt8GRNuCGjZ7sBfdb%2ByMxgvtUx%2BmuVUgGVWMyXqd4bAIiqwIzo8PZ5m7K47se7eGN3TTnq5f8FQChU0KydIgWo9SRGSJ%2BE3Wd9Af5Hr22yQOSuysVdG9n4GZIGZnMze0heMxKPQm&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250523T065640Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&REDACTED&X-Amz-Signature=7252633be00a26e5eb4d0deeb8462b6dfbc5a65721ff598ba06be7f384f7658d',
    label: 'Roast Beef',
    source: 'Saveur',
    url: 'https://www.saveur.com/recipes/roast-beef-recipe'
  },
  {
    image:
      'https://edamam-product-images.s3.amazonaws.com/web-img/fdb/fdbf70c97bdfb86dc33e2dbab97dd847.jpg?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEC8aCXVzLWVhc3QtMSJHMEUCICc4cx%2BfcdZLHzb0vRqHrh4MPcOT3gL63kzrFh6XH1myAiEAnyNpwFrwNpDoUrz99LKX6aTVwdlQUvYfA7D0wZEjiPcqwgUI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODcwMTcxNTA5ODYiDIowaA9WdQhsI1s0eSqWBUk72W4ww%2FZ8ioHzK65RnqafpPUAbDOMKU6Pdhi92egnhgrzAS0vfzTWmU%2BFzf%2F9b5J%2F6aRUWk%2FSk6qx2Zyk0WYHk3NEWy2ifgTbDXO4h17na6f%2B0F%2BMNzAX20Yfyhmqvzuiv7%2FyntYJPKzvCacdf4zhdAS1qppOJuzu5sxyEAGSw6yYQh9QTT27W25VTClkMENQ9%2FRt8f9FfG5gbsn8RyPqx0eNPYK58qw514C72Ror7Jc6zlBuecQUJp0HmQJzWm38YwkSH%2FW%2B08ZMtW9BDJ1e7ETzExQjHPA0X52rRIh97Rp77nmJyF45tUoc4JzoVh4h%2BtuYGgta%2F56ZgcUikR9HvU4BkgX0O74AZnbyJVLdhbyI1T5LBjDuH%2BP%2F%2F8alQhYzTTbSaCSjv3DV5gFwsv4HB%2FX8XuCaYhIOIn33Vq23nSuScYhTN%2BQXhqq%2FmMbbBZyNpzOlMmSjXJ%2FwOlx2gGj3Qqauy9au4L8XrOhHlpWvpEko9K%2BA4ECn%2FpF0EFrpQd7eG%2Bw9yy44KCh4bOzHcUDsp%2FQKIxxVE2GkBBC2eOU3t46ExxSLRRUsOuCGx5FktaVKru20xaeWossudKCnIl%2BlZoDor%2FxkWHsWnsbG8rcPU%2F7N9k4Ioo%2BsaS7MYEfZ4dnEvEfMO1G%2Fb%2FFLiRw%2ByN4ka8aRitWgl4PCIftUU9C6s1b9VcSrFht3O%2Fag4KEquGpJ6LIPGfmX32oh%2B4rl4NF%2B7i5TBnoFC4PJrq%2FNe4685PKYXZrscNvILkKw9xFsEx2c69hadyqI5223qmUYxChjCu47xy%2FrwgrAIGVGG%2Fq49IkBUTfdkgJpI2bEy2a7R7cETqxJhg0vpWf9B%2BkYJYRwwlc1gG%2BS493fe6JLW7yDhxlm6MY5MJipwMEGOrEBWReZdTvGGlklQFMU0PPi6n%2BOqZAdVUxfcaw7W6Bj3KOpAJwnecWuUiSosiIH%2FdCCvP3c9tQTnGg8g9WvSJtdUXqqjB8Mge44rn%2FyAt8GRNuCGjZ7sBfdb%2ByMxgvtUx%2BmuVUgGVWMyXqd4bAIiqwIzo8PZ5m7K47se7eGN3TTnq5f8FQChU0KydIgWo9SRGSJ%2BE3Wd9Af5Hr22yQOSuysVdG9n4GZIGZnMze0heMxKPQm&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250523T065640Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&REDACTED&X-Amz-Signature=f846156c1914b09af5ee50f26c9c5db1244464cffd3dc560c3e76a4fb2f9f12d',
    label: 'Beef Tea',
    source: 'Epicurious',
    url: 'https://www.epicurious.com/recipes/food/views/beef-tea-395253'
  }
]




const RecipesContainer = () => {
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
      { isLoading 
        ? <Loading /> 
        : <Form
            onInputChange={handleInputChange}
            onSubmit={fetchRecipes}
          />
      }
    </>
  )
}

export default RecipesContainer;