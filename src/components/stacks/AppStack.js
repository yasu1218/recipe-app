import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// Importing screens that will be used in the stack navigator
import IndexScreen from '../screens/IndexScreen';
import ShowScreen from '../screens/ShowScreen';
import WebScreen from '../screens/WebScreen';

// Creating a stack navigator using createNativeStackNavigator
const Stack = createNativeStackNavigator();

// AppStack component that defines the navigation structure of the app. We have three screens: Index, Show, and Web.
// IndexScreen displays a list of recipes.
// ShowScreen displays the details of a selected recipe.
// WebScreen displays a web view of the recipe's source.
const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Index" 
          component={IndexScreen} 
          options={{
            title: 'Recipe App',
            headerStyle: {
              color: '#2c3e50',
            },
            headerTitleStyle: {
              color: '#fff',
            },
          }}
        />
        <Stack.Screen
          name='Show'
          component={ShowScreen}
          options={({ route }) => ({
            title: route.params.label,
            headerBackTitle: 'Back',
          })}
        />
        <Stack.Screen
          name='Web'
          component={WebScreen}
          options ={({ route }) => ({
            title: route.params.label,
            headerBackTitle: 'Back',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppStack;
