import axios from 'axios';
import { APP_ID, APP_KEY, BASE_URL, TYPE, USER_ID } from '../config/apiConfig';  
import qs from 'qs';

export const getRecipes = async ingredient => {
  const url = BASE_URL;

  try {
    const params = {
      type: TYPE,
      app_id: APP_ID,
      app_key: APP_KEY,
      q: ingredient,
      fields: ['uri', 'image', 'label', 'source']
    };

    // Debugging output
    // console.log('url', url);
    // console.log('params', params);
    // console.log('user', USER_ID);

    /*
    const recipeAxios = axios.create({
      paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
    });

    const response = await recipeAxios.get(url, 
      { headers: {
          'Edamam-Account-User': USER_ID
        },
        params,
      });
    */
    
    const fullUrl = `${url}?${qs.stringify(params, { arrayFormat: 'repeat' })}`;

    const headers = {
      'Edamam-Account-User': USER_ID
    };

    const response = await axios.get(fullUrl, { headers });



    return response.data.hits;


  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error; // Re-throw the error for further handling if needed
  }
}
